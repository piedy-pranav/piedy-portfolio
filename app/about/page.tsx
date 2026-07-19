import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/interior/SiteNav";
import Footer from "@/components/interior/Footer";
import FadeUp from "@/components/shared/FadeUp";
import ContactForm from "@/components/interior/ContactForm";
import { GithubIcon, LinkedInIcon, MailIcon } from "@/components/shared/SocialIcons";
import { aboutInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-int text-ink-int dark:bg-bg-int-dark dark:text-ink">
      <SiteNav />
      <main className="mx-auto w-full max-w-[760px] flex-1 px-6 pb-24 sm:px-10">
        <FadeUp>
          <h1 className="font-display text-[36px] leading-[1.15] tracking-[-0.01em] md:text-[52px]">
            About
          </h1>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink-int/65 dark:text-ink/60">
            {aboutInfo.intro}
          </p>
        </FadeUp>

        <FadeUp className="mt-16 flex flex-col gap-8 sm:flex-row sm:gap-12">
          <div className="relative aspect-[3/4] w-full max-w-[320px] shrink-0 overflow-hidden rounded-[10px] border border-ink-int/14 dark:border-ink/14">
            <Image
              src={aboutInfo.photo}
              alt="Pranav Piedy"
              fill
              sizes="320px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[15px] leading-[1.7] text-ink-int/65 dark:text-ink/60">
              {aboutInfo.bio}
            </p>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${aboutInfo.email}`}
                aria-label="Email"
                className="flex items-center gap-2 text-[13px] tracking-[0.06em] text-ink-int/65 transition-colors hover:text-beam-contact dark:text-ink/60"
              >
                <MailIcon className="h-4 w-4" />
                Email
              </a>
              <a
                href={aboutInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 text-[13px] tracking-[0.06em] text-ink-int/65 transition-colors hover:text-beam-contact dark:text-ink/60"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={aboutInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-2 text-[13px] tracking-[0.06em] text-ink-int/65 transition-colors hover:text-beam-contact dark:text-ink/60"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </FadeUp>

        <FadeUp className="relative mt-24">
          <h2 className="font-display text-[28px] md:text-[32px]">
            Send a message
          </h2>
          <div className="mt-8">
            <ContactForm />
          </div>
        </FadeUp>
      </main>
      <Footer />
    </div>
  );
}
