import { footerInfo } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1100px] px-6 py-10 text-center text-[12px] text-ink-int/45 sm:px-10 dark:text-ink/45">
      {footerInfo.name} · {footerInfo.email} ·{" "}
      <a href={footerInfo.linkedin}>LinkedIn</a>
    </footer>
  );
}
