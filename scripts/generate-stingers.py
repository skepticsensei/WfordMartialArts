#!/usr/bin/env python3
"""
Synthesizes the dojo's video stingers:
    public/audio/stinger-open.wav    3.5s, under the opening card
    public/audio/stinger-close.wav   5.0s, under the ending card

Both are built from the same three voices, so the head and the tail of a video
sound like the same room:

    hyoshigi  the wooden clappers that call a class to order - a hard, bright
              crack, gone in under a tenth of a second
    taiko     the drum underneath it, a pitch that drops as it decays
    rin       the bowl bell, struck once and left to ring, which is the part
              that carries the logo

The open announces: wood, drum and bell together, tight. The close resolves:
no wood at all, a softer drum, and a second, lower bell that answers the first
and fades out under the end screen.

Everything is stdlib - no numpy, no ffmpeg - and seeded, so re-running gives
byte-identical files.

Usage:
    python3 scripts/generate-stingers.py

Output is 48 kHz 24-bit stereo WAV, peak-normalized to -3 dBFS, which leaves
an editor room to sit it under a voice.
"""
import math
import os
import random
import struct
import wave

SR = 48000
PEAK_DBFS = -3.0

ROOT = os.getcwd()
OUT_DIR = os.path.join(ROOT, "public", "audio")


# ---- building blocks -------------------------------------------------------

def silence(seconds):
    return [0.0] * int(SR * seconds)


def add(buf, signal, at):
    """Mixes `signal` into `buf` starting at `at` seconds, growing buf if needed."""
    start = int(SR * at)
    need = start + len(signal) - len(buf)
    if need > 0:
        buf.extend([0.0] * need)
    for i, v in enumerate(signal):
        buf[start + i] += v
    return buf


def noise(n, seed):
    rng = random.Random(seed)
    return [rng.uniform(-1.0, 1.0) for _ in range(n)]


def biquad(x, b0, b1, b2, a1, a2):
    """Direct form I, coefficients already normalized by a0."""
    out = [0.0] * len(x)
    x1 = x2 = y1 = y2 = 0.0
    for i, xn in enumerate(x):
        yn = b0 * xn + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
        out[i] = yn
        x2, x1 = x1, xn
        y2, y1 = y1, yn
    return out


def bandpass(x, f0, q):
    """RBJ constant-peak-gain bandpass."""
    w0 = 2.0 * math.pi * f0 / SR
    alpha = math.sin(w0) / (2.0 * q)
    b0, b1, b2 = alpha, 0.0, -alpha
    a0, a1, a2 = 1.0 + alpha, -2.0 * math.cos(w0), 1.0 - alpha
    return biquad(x, b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0)


def lowpass(x, f0, q=0.707):
    w0 = 2.0 * math.pi * f0 / SR
    alpha = math.sin(w0) / (2.0 * q)
    cos0 = math.cos(w0)
    b1 = 1.0 - cos0
    b0 = b2 = b1 / 2.0
    a0, a1, a2 = 1.0 + alpha, -2.0 * cos0, 1.0 - alpha
    return biquad(x, b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0)


def highpass(x, f0, q=0.707):
    w0 = 2.0 * math.pi * f0 / SR
    alpha = math.sin(w0) / (2.0 * q)
    cos0 = math.cos(w0)
    b0 = (1.0 + cos0) / 2.0
    b1 = -(1.0 + cos0)
    b2 = b0
    a0, a1, a2 = 1.0 + alpha, -2.0 * cos0, 1.0 - alpha
    return biquad(x, b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0)


def decay(n, tau, attack=0.004):
    """Exponential decay with a short attack, so nothing starts on a click."""
    atk = max(1, int(SR * attack))
    env = [0.0] * n
    for i in range(n):
        a = min(1.0, i / atk)
        env[i] = a * math.exp(-i / (SR * tau))
    return env


def fade_out(x, seconds=0.12):
    """Takes the tail to true zero, so a loop point or a cut cannot tick."""
    n = min(len(x), int(SR * seconds))
    for i in range(n):
        x[len(x) - n + i] *= 1.0 - (i / n)
    return x


def finish(x, fade=0.2):
    """Clears the rumble under the drum, then fades the tail to zero."""
    return fade_out(highpass(x, 30.0), fade)


# ---- voices ----------------------------------------------------------------

def rin(f0, dur, level=1.0, seed=1):
    """
    A struck bowl bell. The partials of a rin are inharmonic, which is why a
    bell reads as a bell and not as a note: they are spaced by ratio, not by
    integer, and the high ones die first. Each partial is two sines a hair
    apart, which gives the slow shimmer a real bowl has.
    """
    partials = [
        # ratio, level, decay seconds
        (1.000, 1.00, dur),
        (2.757, 0.52, dur * 0.52),
        (5.404, 0.30, dur * 0.30),
        (8.933, 0.16, dur * 0.18),
        (13.35, 0.09, dur * 0.11),
    ]
    n = int(SR * (dur + 0.2))
    out = [0.0] * n
    for k, (ratio, amp, tau) in enumerate(partials):
        env = decay(n, tau, attack=0.003)
        f = f0 * ratio
        detune = 1.0 + 0.0013 * (1 + k * 0.4)
        w1 = 2.0 * math.pi * f / SR
        w2 = 2.0 * math.pi * f * detune / SR
        phase = 0.35 * k
        for i in range(n):
            out[i] += amp * env[i] * 0.5 * (
                math.sin(w1 * i + phase) + math.sin(w2 * i + phase)
            )

    # The mallet itself: a breath of filtered noise at the moment of contact.
    strike_n = int(SR * 0.05)
    strike = bandpass(noise(strike_n, seed), f0 * 3.2, 1.1)
    strike_env = decay(strike_n, 0.012, attack=0.0008)
    for i in range(strike_n):
        out[i] += 0.22 * strike[i] * strike_env[i]

    return [v * level for v in out]


def taiko(f_start, f_end, dur, level=1.0, seed=2, punch=1.0):
    """
    A drum head: a sine whose pitch falls fast into the body of the note, with
    a slap of lowpassed noise on top for the stick.
    """
    n = int(SR * dur)
    out = [0.0] * n
    env = decay(n, dur * 0.30, attack=0.002)
    phase = 0.0
    for i in range(n):
        t = i / SR
        f = f_end + (f_start - f_end) * math.exp(-t / 0.055)
        phase += 2.0 * math.pi * f / SR
        out[i] = env[i] * (math.sin(phase) + 0.18 * math.sin(2.0 * phase))

    slap_n = int(SR * 0.09)
    slap = lowpass(noise(slap_n, seed), 900.0)
    slap_env = decay(slap_n, 0.022, attack=0.0006)
    for i in range(slap_n):
        out[i] += punch * 0.5 * slap[i] * slap_env[i]

    return [v * level for v in out]


def hyoshigi(level=1.0, seed=3):
    """
    Wooden clappers. Almost no body, all transient: a burst of noise rung
    through a few high resonances and gone.
    """
    n = int(SR * 0.22)
    src = noise(n, seed)
    out = [0.0] * n
    for f, q, amp, tau in ((1850.0, 9.0, 1.00, 0.030),
                           (3260.0, 12.0, 0.62, 0.020),
                           (5400.0, 14.0, 0.34, 0.013)):
        band = bandpass(src, f, q)
        env = decay(n, tau, attack=0.0004)
        for i in range(n):
            out[i] += amp * band[i] * env[i]
    return [v * level * 1.6 for v in out]


# ---- room ------------------------------------------------------------------

def reverb(x, combs, allpasses, feedback, damp, wet, tail=1.4):
    """
    A Schroeder reverb: parallel comb filters for density, allpasses to smear
    what they leave behind. Cheap, and the right size for a dojo - a wood
    floor and a high ceiling, not a cathedral.
    """
    n = len(x) + int(SR * tail)
    src = x + [0.0] * (n - len(x))
    acc = [0.0] * n

    for delay in combs:
        buf = [0.0] * delay
        idx = 0
        store = 0.0
        for i in range(n):
            out = buf[idx]
            store = out * (1.0 - damp) + store * damp
            buf[idx] = src[i] + store * feedback
            idx = (idx + 1) % delay
            acc[i] += out
    acc = [v / len(combs) for v in acc]

    for delay, g in allpasses:
        buf = [0.0] * delay
        idx = 0
        for i in range(n):
            bufout = buf[idx]
            out = -acc[i] + bufout
            buf[idx] = acc[i] + bufout * g
            idx = (idx + 1) % delay
            acc[i] = out

    return [src[i] + wet * acc[i] for i in range(n)]


# Two slightly different rooms, one per side, so the tail opens up in stereo
# while the dry hit stays dead center and mono-safe.
LEFT_COMBS = (1687, 1759, 1621, 1543)
RIGHT_COMBS = (1709, 1781, 1601, 1567)
LEFT_ALLPASS = ((601, 0.7), (479, 0.7))
RIGHT_ALLPASS = ((613, 0.7), (467, 0.7))


def stereo(mono, wet=0.34, feedback=0.80, damp=0.32, tail=1.5):
    left = reverb(mono, LEFT_COMBS, LEFT_ALLPASS, feedback, damp, wet, tail)
    right = reverb(mono, RIGHT_COMBS, RIGHT_ALLPASS, feedback, damp, wet, tail)
    return left, right


# ---- output ----------------------------------------------------------------

def normalize(channels, dbfs=PEAK_DBFS):
    peak = max(max(abs(v) for v in ch) for ch in channels)
    if peak == 0:
        return channels
    target = 10.0 ** (dbfs / 20.0)
    gain = target / peak
    return [[v * gain for v in ch] for ch in channels]


def write_wav(path, left, right):
    """48 kHz 24-bit stereo, which is what a video timeline wants."""
    n = max(len(left), len(right))
    left = left + [0.0] * (n - len(left))
    right = right + [0.0] * (n - len(right))
    frames = bytearray()
    limit = 2 ** 23 - 1
    for i in range(n):
        for v in (left[i], right[i]):
            s = int(max(-1.0, min(1.0, v)) * limit)
            frames += struct.pack("<i", s)[:3]
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(3)
        w.setframerate(SR)
        w.writeframes(bytes(frames))


def envelope(left, right, width=68, rows=9):
    """An ASCII picture of the shape, so a change is visible without a listen."""
    n = len(left)
    step = max(1, n // width)
    peaks = []
    for c in range(width):
        chunk_l = left[c * step:(c + 1) * step]
        chunk_r = right[c * step:(c + 1) * step]
        if not chunk_l:
            peaks.append(0.0)
            continue
        peaks.append(max(max(abs(v) for v in chunk_l), max(abs(v) for v in chunk_r)))
    lines = []
    for r in range(rows, 0, -1):
        threshold = r / rows
        lines.append("".join("#" if p >= threshold else " " for p in peaks))
    lines.append("-" * width)
    return "\n".join(lines)


def report(name, left, right):
    n = len(left)
    peak = max(max(abs(v) for v in left), max(abs(v) for v in right))
    rms = math.sqrt(sum(v * v for v in left) / n)
    print(f"\n{name}  {n / SR:.2f}s  peak {20 * math.log10(peak):.1f} dBFS  "
          f"rms {20 * math.log10(rms):.1f} dBFS")
    print(envelope(left, right))


# ---- the two stingers ------------------------------------------------------

def opening():
    """Wood, drum and bell inside 60 ms, then two seconds of ring."""
    buf = silence(0.01)
    add(buf, hyoshigi(level=1.55), 0.000)
    add(buf, taiko(96.0, 58.0, 1.25, level=0.95), 0.012)
    add(buf, rin(660.0, 2.20, level=0.62), 0.055)
    left, right = stereo(buf, wet=0.30, feedback=0.79, damp=0.34, tail=1.05)
    return finish(left, 0.25), finish(right, 0.25)


def closing():
    """
    No wood: nothing is being called to order at the end of a video. The drum
    is softer and lower, and a second bell a fifth below answers the first, so
    the phrase lands instead of hanging.
    """
    buf = silence(0.01)
    add(buf, taiko(78.0, 52.0, 1.50, level=0.62, seed=5, punch=0.45), 0.000)
    add(buf, rin(660.0, 2.40, level=0.54, seed=6), 0.030)
    add(buf, rin(440.0, 2.40, level=0.36, seed=7), 0.95)
    left, right = stereo(buf, wet=0.38, feedback=0.82, damp=0.30, tail=1.45)
    return finish(left, 0.45), finish(right, 0.45)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for name, make in (("stinger-open", opening), ("stinger-close", closing)):
        left, right = make()
        left, right = normalize([left, right])
        path = os.path.join(OUT_DIR, f"{name}.wav")
        write_wav(path, left, right)
        report(path, left, right)


if __name__ == "__main__":
    main()
