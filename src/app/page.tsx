import { RevealObserver } from "@/components/RevealObserver";
import { About } from "@/components/sections/About";
import { Accounts } from "@/components/sections/Accounts";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Media } from "@/components/sections/Media";
import { Record } from "@/components/sections/Record";
import { Stage } from "@/components/sections/Stage";
import { Vision } from "@/components/sections/Vision";
import { artist, ep, socials, streaming } from "@/content/site";

/** Structured data — only confirmed profile URLs are emitted as sameAs. */
function JsonLd() {
  const sameAs = [...socials, ...streaming].map((l) => l.url).filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    description: artist.summary,
    genre: [artist.genre, "Gospel", "Afrobeats"],
    foundingLocation: { "@type": "Country", name: artist.country },
    url: artist.siteUrl,
    ...(sameAs.length ? { sameAs } : {}),
    album: { "@type": "MusicAlbum", name: ep.title, albumReleaseType: "https://schema.org/EPRelease" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Record />
      <About />
      <Vision />
      <Media />
      <Stage />
      <Accounts />
      <Contact />
      {/* Last: its effect runs only after every section above has hydrated */}
      <RevealObserver />
    </>
  );
}
