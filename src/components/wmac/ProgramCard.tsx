import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/wmac-constants";

interface ProgramCardProps {
  name: string;
  slug: string;
  logo: string;
  shortDescription: string;
  accent: "red" | "teal" | "purple";
  leader?: string;
  externalUrl?: string;
}

export default function ProgramCard({
  name,
  slug,
  logo,
  shortDescription,
  accent,
  leader,
  externalUrl,
}: ProgramCardProps) {
  const accentStyles = {
    red: {
      border: "border-red/30 hover:border-red",
      tag: "bg-red-light text-red",
      link: "text-red",
    },
    teal: {
      border: "border-teal/30 hover:border-teal",
      tag: "bg-teal/10 text-teal",
      link: "text-teal",
    },
    purple: {
      border: "border-purple/30 hover:border-purple",
      tag: "bg-purple-light text-purple",
      link: "text-purple",
    },
  }[accent];
  const borderColor = accentStyles.border;
  const tagColor = accentStyles.tag;
  const linkColor = accentStyles.link;
  const className = `group block bg-white border ${borderColor} p-6 md:p-8 transition-all hover:shadow-lg`;

  const content = (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={logo}
          alt={name}
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
        <div>
          <span className={`inline-block text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 mb-1 ${tagColor}`}>
            Hosted at WMAC
          </span>
          <h3 className="font-serif text-lg font-bold text-ink">
            {name}
          </h3>
          {leader && (
            <div className="text-sm text-ink/50">with {leader}</div>
          )}
        </div>
      </div>
      <p className="text-sm text-ink/70 leading-relaxed">{shortDescription}</p>
      <div className={`mt-4 text-xs ${linkColor} font-medium tracking-wide uppercase group-hover:translate-x-1 transition-transform`}>
        Learn more &rarr;
      </div>
    </>
  );

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={`${SITE.basePath}/${slug}`} className={className}>
      {content}
    </Link>
  );
}
