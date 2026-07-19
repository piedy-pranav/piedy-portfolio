"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { sections } from "@/lib/tokens";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-8 sm:px-10">
      <Link href="/" className="font-display text-[30px] font-medium">
        Home
      </Link>
      <nav aria-label="Main" className="flex items-center gap-7 sm:gap-9">
        {sections.map((section) => {
          const active = pathname === section.href;
          const style: CSSProperties = {
            ["--nav-color" as string]: section.color,
            borderBottomColor: active ? section.color : "transparent",
          };
          return (
            <Link
              key={section.id}
              href={section.href}
              aria-current={active ? "page" : undefined}
              className="nav-link border-b-2 pb-1 text-[13px] tracking-[0.06em]"
              style={style}
            >
              {section.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
