import Link from "next/link";
import { SITE } from "@/lib/wmac-constants";

interface DisciplineCardProps {
  name: string;
  slug: string;
  japanese: string;
  subtitle: string;
  shortDescription: string;
  icon: string;
}

export default function DisciplineCard({
  name,
  slug,
  japanese,
  subtitle,
  shortDescription,
  icon,
}: DisciplineCardProps) {
  return (
    <Link
      href={`${SITE.basePath}/${slug}`}
      className="group block bg-white border border-gray hover:border-red/30 p-6 md:p-8 transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs tracking-widest uppercase text-red mb-1">
            {japanese}
          </div>
          <h3 className="font-serif text-xl font-bold text-ink group-hover:text-red transition-colors">
            {name}
          </h3>
          <div className="text-sm text-ink/50 italic">{subtitle}</div>
        </div>
        <span className="font-serif text-3xl text-red/20 group-hover:text-red/40 transition-colors">
          {icon}
        </span>
      </div>
      <p className="text-sm text-ink/70 leading-relaxed">{shortDescription}</p>
      <div className="mt-4 text-xs text-red font-medium tracking-wide uppercase group-hover:translate-x-1 transition-transform">
        Learn more &rarr;
      </div>
    </Link>
  );
}
