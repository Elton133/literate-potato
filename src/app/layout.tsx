import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { PlayerDock } from "@/components/audio/PlayerDock";
import { Header } from "@/components/Header";
import { motionScript } from "@/components/RevealObserver";
import { artist } from "@/content/site";
import { SEO } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Bacalisties — signature script, used only as Craig's "hand".
 * LICENCE: the supplied file is marked personal-use only. A commercial
 * webfont licence is required before this site goes live.
 */
const bacalisties = localFont({
  src: "../fonts/bacalisties/Bacalisties.ttf",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(artist.siteUrl),
  title: { default: SEO.title, template: `%s — ${artist.name}` },
  description: SEO.description,
  applicationName: artist.name,
  keywords: SEO.keywords,
  authors: [{ name: artist.name }],
  creator: artist.name,
  category: "music",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    title: SEO.title,
    description: SEO.description,
    siteName: artist.name,
    url: "/",
    locale: "en_GH",
    // images come from app/opengraph-image.tsx automatically
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bacalisties.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AudioProvider>
          <Header />
          <main id="main">{children}</main>
          <PlayerDock />
        </AudioProvider>
      </body>
    </html>
  );
}
