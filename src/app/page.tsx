import { RevealObserver } from "@/components/RevealObserver";
import { About } from "@/components/sections/About";
import { Accounts } from "@/components/sections/Accounts";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Media } from "@/components/sections/Media";
import { Record } from "@/components/sections/Record";
import { Stage } from "@/components/sections/Stage";
import { Vision } from "@/components/sections/Vision";
import { structuredData } from "@/lib/seo";

/** Structured data — built only from facts shown on the page. */
function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }}
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
