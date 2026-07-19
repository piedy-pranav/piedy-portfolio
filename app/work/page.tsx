import type { Metadata } from "next";
import SiteNav from "@/components/interior/SiteNav";
import Footer from "@/components/interior/Footer";
import FadeUp from "@/components/shared/FadeUp";
import CaseStudyCard from "@/components/interior/CaseStudyCard";
import { caseStudies, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-int text-ink-int dark:bg-bg-int-dark dark:text-ink">
      <SiteNav />
      <main className="mx-auto w-full max-w-[760px] flex-1 px-6 pb-24 sm:px-10">
        <FadeUp>
          <h1 className="font-display text-[36px] leading-[1.15] tracking-[-0.01em] md:text-[52px]">
            Work
          </h1>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink-int/65 dark:text-ink/60">
            All my work spanning Product Analytics, Growth Strategy and AI Consulting.
          </p>
        </FadeUp>

        <div className="mt-24 flex flex-col gap-8">
          {caseStudies.map((study) => (
            <FadeUp key={study.title}>
              <CaseStudyCard study={study} />
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-24">
          <p className="text-center text-[15px] leading-[1.7] text-ink-int/65 dark:text-ink/60">
            {skills.join(" · ")}
          </p>
        </FadeUp>
      </main>
      <Footer />
    </div>
  );
}
