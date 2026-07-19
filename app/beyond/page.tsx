import type { Metadata } from "next";
import Link from "next/link";
import RipplePond from "@/components/beyond/RipplePond";
import { sections } from "@/lib/tokens";
import { beyondIntro, beyondConcept } from "@/lib/content";

export const metadata: Metadata = {
  title: "Beyond",
};

export default function BeyondPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#060809] text-ink">
      <RipplePond />

      <header
        id="beyond-header"
        className="fixed inset-x-0 top-0 z-20 mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-8 sm:px-10"
      >
        <Link href="/" className="font-display text-[30px] font-medium">
          Home
        </Link>
        <nav
          aria-label="Main"
          className="flex items-center gap-7 text-[13px] tracking-[0.06em] sm:gap-9"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {sections.map((section) => {
            const active = section.id === "beyond";
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={active ? "page" : undefined}
                className="nav-link border-b-2 pb-1 text-ink/70 hover:text-ink"
                style={{
                  ["--nav-color" as string]: section.color,
                  borderBottomColor: active ? section.color : "transparent",
                  color: active ? "var(--ink)" : undefined,
                }}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Same horizontal alignment system as SiteNav/main on Work & About
          (mx-auto max-w-[760px] px-6 sm:px-10) so the heading lines up with
          those pages' H1 instead of sitting at a fixed pixel offset. */}
      <div
        id="beyond-title"
        className="fixed inset-x-0 top-[96px] z-20 mx-auto max-w-[760px] px-6 sm:px-10 max-[760px]:top-[84px]"
      >
        <div className="max-w-[380px] max-[760px]:max-w-[280px]">
          <h1 className="font-display text-[36px] md:text-[52px]">Beyond</h1>
          <p
            className="mt-2 text-[13.5px] leading-[1.6] text-ink/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {beyondIntro}
          </p>
        </div>
      </div>

      <div
        id="beyond-caption"
        className="fixed right-[44px] bottom-8 z-20 max-w-[600px] text-right max-[760px]:right-[24px] max-[760px]:bottom-[72px] max-[760px]:max-w-[260px]"
      >
        <p className="font-display text-[16.5px] leading-[1.5] whitespace-nowrap text-ink/75 italic max-[760px]:text-[14px] max-[760px]:whitespace-normal">
          {beyondConcept.line}
        </p>
        <p
          className="mt-2 whitespace-nowrap text-[10.5px] tracking-[0.14em] text-ink/35 uppercase max-[760px]:whitespace-normal"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {beyondConcept.credit}
        </p>
      </div>
    </div>
  );
}
