"use client";

import { motion, useReducedMotion } from "framer-motion";
import PrismStage from "@/components/landing/PrismStage";
import MobileLanding from "@/components/landing/MobileLanding";
import { landing, social } from "@/lib/content";
import { GithubIcon, LinkedInIcon } from "@/components/shared/SocialIcons";

export default function Home() {
  const reducedMotion = useReducedMotion();

  const fadeTransition = reducedMotion
    ? { delay: 0.15, duration: 0.4, ease: "easeOut" as const }
    : { delay: 1.9, duration: 0.4, ease: "easeOut" as const };

  return (
    <>
      {/* Desktop / tablet landing: the prism stage (DESIGN.md §4.1–4.4) */}
      <div className="relative hidden h-screen w-full overflow-hidden bg-bg text-ink min-[761px]:block">
        <motion.header
          className="absolute top-0 left-0 z-10 flex w-full items-start justify-between px-12 pt-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fadeTransition}
        >
          <span className="font-display text-[30px] font-medium">
            Pranav Piedy
          </span>
          <span className="text-[11px] tracking-[0.16em] text-ink/45">
            ANALYTICS · STRATEGY · LOS ANGELES
          </span>
        </motion.header>

        <div className="absolute inset-0">
          <PrismStage />
        </div>

        <motion.div
          className="absolute bottom-11 left-12 z-10 max-w-[470px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fadeTransition}
        >
          <p className="font-display text-[27px] leading-[1.3]">
            {landing.lede}
          </p>
          <p className="mt-2 text-[15px] leading-[1.7] text-ink/60">
            {landing.body}
          </p>
        </motion.div>

        <motion.div
          className="absolute right-12 bottom-11 z-10 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fadeTransition}
        >
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink/45 transition-colors hover:text-ink"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink/45 transition-colors hover:text-ink"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      {/* Mobile landing (DESIGN.md §4.5) */}
      <div className="max-[760px]:block hidden">
        <MobileLanding />
      </div>
    </>
  );
}
