import { artist, ep, getTrack, photos, socials, streaming, tracks, type Track } from "@/content/site";

/**
 * SEO helpers. Everything here is derived from src/content/site.ts, so
 * search engines only ever see facts the site itself shows.
 */

export const SEO = {
  title: `${artist.name} — Ghanaian ${artist.genre} Artist`,
  description:
    "Ghanaian Afrogospel singer, songwriter and producer blending African gospel, Afrobeats and Methodist hymns. Hear The Dialogue 1 EP and He Dey.",
  keywords: [
    artist.name,
    "Craig Osae music",
    "Afrogospel",
    "Ghana gospel",
    "Ghanaian gospel artist",
    "urban gospel Ghana",
    "The Dialogue 1",
    "He Dey Craig Osae",
    "gospel Afrobeats",
  ],
};

/** Absolute URL on the production domain. */
export const abs = (path: string) => new URL(path, artist.siteUrl).toString();

const recording = (t: Track) => ({
  "@type": "MusicRecording",
  name: t.title,
  byArtist: [
    { "@type": "MusicGroup", name: t.artist ?? artist.name },
    ...(t.with ? [{ "@type": "MusicGroup", name: t.with }] : []),
    ...(t.featuring ? [{ "@type": "MusicGroup", name: t.featuring }] : []),
  ],
  ...(t.released ? { datePublished: t.released } : {}),
  ...(t.links?.some((l) => l.url) ? { sameAs: t.links.filter((l) => l.url).map((l) => l.url) } : {}),
});

/** One JSON-LD graph: the artist, the site, the EP and the singles. */
export function structuredData() {
  const artistId = abs("/#artist");
  const sameAs = [...socials, ...streaming].map((l) => l.url).filter(Boolean);
  const epTracks = ep.tracklist.map(getTrack).filter(Boolean) as Track[];
  const singles = tracks.filter((t) => !t.project && t.released);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        url: abs("/"),
        name: artist.name,
        inLanguage: "en",
        about: { "@id": artistId },
      },
      {
        // Schema.org models solo musicians as MusicGroup — it's what
        // Google's music knowledge panels read.
        "@type": "MusicGroup",
        "@id": artistId,
        name: artist.name,
        url: abs("/"),
        description: artist.summary,
        genre: [artist.genre, "Gospel", "Afrobeats"],
        foundingLocation: { "@type": "Country", name: artist.country },
        ...(photos.portrait.src ? { image: abs(photos.portrait.src) } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        album: [
          {
            "@type": "MusicAlbum",
            name: ep.title,
            albumReleaseType: "https://schema.org/EPRelease",
            albumProductionType: "https://schema.org/StudioAlbum",
            byArtist: { "@id": artistId },
            ...(ep.artwork.src ? { image: abs(ep.artwork.src) } : {}),
            ...(ep.release.date ? { datePublished: ep.release.date } : {}),
            numTracks: epTracks.length,
            track: {
              "@type": "ItemList",
              numberOfItems: epTracks.length,
              itemListElement: epTracks.map((t, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: recording(t),
              })),
            },
          },
        ],
        track: singles.map(recording),
      },
    ],
  };
}

/** Every image worth indexing, for the image sitemap. */
export const sitemapImages = () =>
  [photos.portrait, photos.about, ep.artwork, ep.artworkBack, ...photos.gallery]
    .map((m) => m.src)
    .filter((s): s is string => Boolean(s))
    .map(abs);
