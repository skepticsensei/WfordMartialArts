"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/wmac-constants";

/**
 * YouTube channel banner for the dojo.
 *
 * Canvas:    2560 x 1440 - the size YouTube asks you to upload.
 * Safe area: 1546 x 423, centered - the only region guaranteed visible on
 *            phones and inside the TV crop, so everything that has to be
 *            read lives in there. The rest is decorative bleed that desktop
 *            and TV viewers get for free.
 *
 * The banner is painted straight to a canvas so the download is pixel-exact
 * regardless of screen size; the on-page view is just that canvas scaled down.
 */

const W = 2560;
const H = 1440;
const SAFE_W = 1546;
const SAFE_H = 423;
const SAFE_X = (W - SAFE_W) / 2;
const SAFE_Y = (H - SAFE_H) / 2;

const INK = "#171717";
const RED = "#B21E2B";
const RICE = "247, 243, 235";

const LOGO_SRC = "/logos/Weatherford_Martial_Arts.png";
/** Ink bounds of the seal inside the 1800px source, which carries ~17% padding. */
const LOGO_INK = { x: 316, y: 317, w: 1178, h: 1185 };
const SEAL = 344; // rendered size of the seal's ink
const GAP = 66; // seal -> divider -> text

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Radial gradient stretched into an ellipse. */
function ellipseGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  stops: Array<[number, string]>,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, ry / rx);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
  for (const [offset, color] of stops) g.addColorStop(offset, color);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, rx, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function draw(
  ctx: CanvasRenderingContext2D,
  logo: HTMLImageElement,
  serif: string,
  sans: string,
) {
  ctx.clearRect(0, 0, W, H);

  // Base
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  // Diagonal weave, same texture as the site hero
  ctx.save();
  ctx.strokeStyle = `rgba(${RICE}, 0.035)`;
  ctx.lineWidth = 2;
  for (let x = -H; x < W + H; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, H);
    ctx.lineTo(x + H, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Warm red glow behind the seal
  ellipseGlow(ctx, W * 0.42, H / 2, 1150, 660, [
    [0, "rgba(178, 30, 43, 0.30)"],
    [0.55, "rgba(178, 30, 43, 0.10)"],
    [1, "rgba(178, 30, 43, 0)"],
  ]);

  // Decorative kanji out in the bleed: bu / do, "the martial way"
  ctx.save();
  ctx.fillStyle = `rgba(${RICE}, 0.045)`;
  ctx.font = `700 470px ${serif}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText("\u6B66", 70, H / 2);
  ctx.textAlign = "right";
  ctx.fillText("\u9053", W - 70, H / 2);
  ctx.restore();

  // Vignette so the bleed falls away from the center
  ellipseGlow(ctx, W / 2, H / 2, 1560, 940, [
    [0, "rgba(0, 0, 0, 0)"],
    [0.42, "rgba(0, 0, 0, 0)"],
    [1, "rgba(0, 0, 0, 0.6)"],
  ]);

  // ---- Safe area content ----
  const titleSize = 86;
  const lines = [
    { text: "Weatherford", font: `700 ${titleSize}px ${serif}`, spacing: "0px", dy: 0 },
    { text: "Martial Arts Center", font: `700 ${titleSize}px ${serif}`, spacing: "0px", dy: 94 },
    { text: SITE.tagline, font: `italic 400 34px ${serif}`, spacing: "0px", dy: 160 },
    {
      text: "AIKIDO · JUDO · AIKIJUJUTSU · WEATHERFORD, TEXAS",
      font: `400 24px ${sans}`,
      spacing: "3.36px",
      dy: 212,
    },
    {
      text: "WFORDMARTIALARTS.COM",
      font: `500 24px ${sans}`,
      spacing: "5.28px",
      dy: 256,
    },
  ];

  // Measure the text block so the whole lockup can be centered in the safe area
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  let textW = 0;
  for (const line of lines) {
    ctx.letterSpacing = line.spacing;
    ctx.font = line.font;
    textW = Math.max(textW, ctx.measureText(line.text).width);
  }
  ctx.letterSpacing = "0px";

  const contentW = SEAL + GAP + 1 + GAP + textW;
  const startX = Math.round(SAFE_X + (SAFE_W - contentW) / 2);
  const dividerX = Math.round(startX + SEAL + GAP);
  const textX = dividerX + 1 + GAP;

  ctx.drawImage(
    logo,
    LOGO_INK.x,
    LOGO_INK.y,
    LOGO_INK.w,
    LOGO_INK.h,
    startX,
    Math.round(SAFE_Y + (SAFE_H - SEAL) / 2),
    SEAL,
    SEAL,
  );

  // Hairline divider
  ctx.fillStyle = `rgba(${RICE}, 0.18)`;
  ctx.fillRect(dividerX, SAFE_Y + (SAFE_H - 300) / 2, 1, 300);

  // Text block: cap top of line one to the baseline of the last line
  const capTop = titleSize * 0.71;
  const blockH = capTop + lines[lines.length - 1].dy;
  const baseY = Math.round(SAFE_Y + (SAFE_H - blockH) / 2 + capTop);

  for (const line of lines) {
    ctx.letterSpacing = line.spacing;
    ctx.font = line.font;
    const y = baseY + line.dy;

    if (line.text === "Martial Arts Center") {
      ctx.fillStyle = RED;
      ctx.fillText("Martial Arts", textX, y);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(" Center", textX + ctx.measureText("Martial Arts").width, y);
      continue;
    }

    ctx.fillStyle =
      line.dy === 0
        ? "#FFFFFF"
        : line.dy === 160
          ? `rgba(${RICE}, 0.62)`
          : line.dy === 212
            ? `rgba(${RICE}, 0.48)`
            : "#C9414D";
    ctx.fillText(line.text, textX, y);
  }
  ctx.letterSpacing = "0px";
}

const AVATARS = [
  {
    src: "/banners/youtube-avatar.png",
    label: "Rice ground",
    note: "Recommended. Holds contrast at 48px and stands off the ink banner behind it.",
  },
  {
    src: "/banners/youtube-avatar-dark.png",
    label: "Ink ground",
    note: "Matches the banner ground; softer edge on YouTube's dark theme.",
  },
];

export default function BannerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [guides, setGuides] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Resolve the real family names behind the site's font variables so the
      // canvas text matches the rest of the site.
      const probe = document.createElement("span");
      probe.style.cssText =
        "position:absolute;visibility:hidden;font-family:var(--font-noto-serif-jp),serif";
      document.body.appendChild(probe);
      const serif = getComputedStyle(probe).fontFamily || "serif";
      probe.style.fontFamily = "var(--font-inter), system-ui, sans-serif";
      const sans = getComputedStyle(probe).fontFamily || "sans-serif";
      probe.remove();

      const [logo] = await Promise.all([loadImage(LOGO_SRC), document.fonts.ready]);
      if (cancelled) return;

      draw(ctx, logo, serif, sans);
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wmac-youtube-banner-2560x1440.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, []);

  return (
    <div className="min-h-screen bg-ink text-rice px-6 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">
              YouTube Channel Banner
            </h1>
            <p className="text-sm text-rice/50 mt-1">
              2560 &times; 1440 upload size. Everything readable sits inside the
              centered 1546 &times; 423 safe area, so it survives the phone and TV crops.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-rice/60 select-none">
              <input
                type="checkbox"
                checked={guides}
                onChange={(e) => setGuides(e.target.checked)}
              />
              Show safe areas
            </label>
            <button
              type="button"
              onClick={download}
              disabled={!ready}
              className="bg-red hover:bg-red-dark disabled:opacity-40 text-white px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors"
            >
              Download PNG
            </button>
            <a
              href="/banners/youtube-banner.png"
              download
              className="border border-rice/30 hover:border-rice/60 text-rice px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors"
            >
              Saved copy
            </a>
          </div>
        </div>

        <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="w-full h-full block"
          />
          {guides && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Tablet-visible width */}
              <div
                className="absolute border border-dashed border-teal/60"
                style={{
                  left: `${((W - 1855) / 2 / W) * 100}%`,
                  top: `${(SAFE_Y / H) * 100}%`,
                  width: `${(1855 / W) * 100}%`,
                  height: `${(SAFE_H / H) * 100}%`,
                }}
              />
              {/* Mobile / TV safe area */}
              <div
                className="absolute border border-dashed border-white/80"
                style={{
                  left: `${(SAFE_X / W) * 100}%`,
                  top: `${(SAFE_Y / H) * 100}%`,
                  width: `${(SAFE_W / W) * 100}%`,
                  height: `${(SAFE_H / H) * 100}%`,
                }}
              />
            </div>
          )}
        </div>

        <p className="text-xs text-rice/40 mt-4 leading-relaxed">
          White box: 1546 &times; 423 safe area shown on phones and TV. Teal box:
          1855 &times; 423 tablet view. Desktop shows the full 2560 &times; 423 strip;
          the top and bottom of the canvas only appear on TV. &ldquo;Saved copy&rdquo; serves
          the checked-in file at <code>/banners/youtube-banner.png</code>, regenerated with
          <code>node scripts/generate-youtube-art.mjs</code>.
        </p>

        <hr className="border-rice/10 my-12" />

        <h2 className="font-serif text-2xl font-bold text-white">Channel Profile Picture</h2>
        <p className="text-sm text-rice/50 mt-1 mb-6">
          800 &times; 800. YouTube crops it to a circle and shows it as small as 48px,
          so the seal sits entirely inside the circle and carries the mark alone.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 max-w-2xl">
          {AVATARS.map((avatar) => (
            <div key={avatar.src}>
              <div className="flex items-end gap-5">
                {[176, 72, 40].map((size) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={size}
                    src={avatar.src}
                    alt={`${avatar.label} profile picture at ${size}px`}
                    width={size}
                    height={size}
                    className="rounded-full"
                    style={{ width: size, height: size }}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-sm text-white">{avatar.label}</span>
                <a
                  href={avatar.src}
                  download
                  className="text-sm text-red hover:text-white transition-colors tracking-wide uppercase"
                >
                  Download
                </a>
              </div>
              <p className="text-xs text-rice/40 mt-1">{avatar.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
