import type { CaseStudy } from "@/lib/content";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="rounded-[10px] border border-ink-int/14 p-8 transition-colors duration-300 hover:border-beam-work dark:border-ink/14">
      <p className="text-[11px] tracking-[0.16em] text-ink-int/50 uppercase dark:text-ink/45">
        {study.eyebrow}
      </p>
      <h3 className="mt-3 font-display text-[24px] leading-[1.3]">
        {study.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-ink-int/65 dark:text-ink/60">
        {study.summary}
      </p>
      {study.links && study.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {study.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-beam-work"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
