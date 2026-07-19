import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import { landing } from "@/lib/content";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pranavpiedy.com"),
  title: {
    default: "Pranav Piedy",
    template: "%s — Pranav Piedy",
  },
  description: landing.lede,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Pranav Piedy",
    description: landing.lede,
    images: [{ url: "/website-photo.jpg", width: 724, height: 965 }],
  },
  twitter: {
    card: "summary",
    title: "Pranav Piedy",
    description: landing.lede,
    images: ["/website-photo.jpg"],
  },
};

// Runs before paint to avoid a flash of the wrong theme on interior pages.
// Defaults to dark mode (matching the site's overall concept) unless the
// visitor has explicitly chosen light mode before.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark" : true;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        {children}
      </body>
    </html>
  );
}
