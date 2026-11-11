/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CRAIG OSAE — SITE CONTENT
 *  Every fact, link and media file on the site lives here.
 *
 *  Rule of the house: `null` means "not verified yet".
 *  Components render a clearly-labelled pending state for anything null —
 *  nothing is invented. Replace a null with the real value and the site
 *  picks it up automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Types ──────────────────────────────────────────────────────────────── */

export type Media = {
  /** Path under /public (e.g. "/images/portrait.jpg") or an allowed remote URL. */
  src: string | null;
  alt: string;
  /** Intrinsic size — required for next/image when src is set. */
  width?: number;
  height?: number;
  /** CSS object-position, used to art-direct crops. e.g. "62% 30%". */
  focus?: string;
  credit?: string | null;
};

export type Track = {
  id: string;
  title: string;
  featuring?: string | null;
  /** Performing artist when it isn't Craig (e.g. "Angel Ahiati"). */
  artist?: string | null;
  /** Co-billed artist, shown as "with …" (e.g. "The CEO"). */
  with?: string | null;
  /**
   * true when `audio` is a short excerpt rather than the full song.
   * The site then sends listeners to `links` for the whole track.
   */
  preview?: boolean;
  /** Where to hear the full song. Only verified URLs. */
  links?: LinkItem[];
  /** ISO date, when known. */
  released?: string | null;
  /** Direct audio file URL (mp3/m4a/ogg) or "/audio/file.mp3". */
  audio: string | null;
  /** Which project the song belongs to, once confirmed. */
  project: string | null;
  year: string | null;
};

export type LinkItem = {
  label: string;
  /** null until the official destination is confirmed. */
  url: string | null;
};

export type Performance = {
  id: string;
  name: string;
  /** Display year exactly as known. null when unconfirmed. */
  year: string | null;
  /** Photos from the night — add files to /public/images/live/<id>/. */
  photos: Media[];
};

/* ── Artist ─────────────────────────────────────────────────────────────── */

export const artist = {
  name: "Craig Osae",
  handle: "@craigosae",
  country: "Ghana",
  roles: ["Singer", "Songwriter", "Producer"],
  genre: "Urban Gospel",
  /** Shown in the hero. */
  statement:
    "Urban gospel from Ghana — contemporary African gospel, Afrobeats and the Methodist hymns that raised him, built on beats he makes himself.",
  /** Used for SEO description. */
  summary:
    "Craig Osae is a Ghanaian urban gospel artist, singer, songwriter and music producer blending contemporary African gospel, Afrobeats and traditional Methodist hymn influences.",
  /** Production domain. NEXT_PUBLIC_SITE_URL can override it (e.g. for a staging URL). */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://craigosae.com",
};

/* ── Photography ────────────────────────────────────────────────────────── */
/*  Drop files into /public/images and fill in src + width + height.
 *  The supplied black-and-white portrait goes in `portrait`.            */

export const photos = {
  /** Primary artist photograph — the black-and-white portrait. */
  portrait: {
    src: "/images/craig-osae-portrait-bw.jpg",
    width: 2412,
    height: 3600,
    alt: "Black-and-white portrait of Craig Osae in a flat cap and sunglasses, head turned down",
    focus: "38% 22%",
    credit: null,
  } satisfies Media,
  /** Artist identity & biography. */
  about: {
    src: "/images/craig-osae-about-cap.jpg",
    width: 2442,
    height: 3600,
    alt: "Craig Osae seated in a flat cap and sunglasses, hands clasped",
    focus: "55% 30%",
    credit: null,
  } satisfies Media,
  /**
   * Media section plates, in reading order. Layout cycles every four:
   * wide · small · tall · panoramic. Studio and live shots alternate so
   * the section isn't one outfit, one backdrop.
   */
  gallery: [
    { src: "/images/live/carnival-of-stars/02.jpg", width: 1280, height: 853, alt: "Craig Osae performing in a red sweatshirt at Carnival of Stars", focus: "70% 40%" },
    { src: "/images/craig-osae-stool-denim.jpg", width: 2400, height: 3600, alt: "Craig Osae seated on a stool in a black knit and jeans", focus: "50% 25%" },
    { src: "/images/live/octagon-2025/02.jpg", width: 1170, height: 1465, alt: "Craig Osae singing on stage at OCTAGON Concert 2025", focus: "50% 40%" },
    { src: "/images/live/supernatural-night/01.jpg", width: 1280, height: 989, alt: "Craig Osae singing at Supernatural Night", focus: "40% 35%" },
    { src: "/images/craig-osae-chair-03.jpg", width: 2706, height: 3600, alt: "Craig Osae seated on a wooden chair, hand to his chin", focus: "50% 38%" },
    { src: "/images/craig-osae-smile.jpg", width: 2505, height: 3600, alt: "Craig Osae smiling, holding his sunglasses", focus: "50% 30%" },
    { src: "/images/craig-osae-stool-bw.jpg", width: 2817, height: 3600, alt: "Black-and-white photograph of Craig Osae on a stool", focus: "50% 45%" },
    { src: "/images/craig-osae-chair-denim.jpg", width: 2647, height: 3600, alt: "Craig Osae seated on a wooden chair in a black knit and jeans", focus: "50% 38%" },
  ] as Media[],
  /*
   * Also available, not currently shown: craig-osae-full-length-01/02,
   * -full-length-cap, -chair-01/02/04, -seated.
   */
};

/* ── Music ──────────────────────────────────────────────────────────────── */

/*
 * Every track plays a 30-second preview cut from the master in
 * /media-source/audio (never served). Previews are ~360 KB and only
 * download when someone presses play. Full songs → streaming links.
 */
export const tracks: Track[] = [
  /* The Dialogue 1 — order and credits from the official back cover */
  { id: "on-my-knees", title: "On My Knees", audio: "/audio/on-my-knees-preview.m4a", preview: true, project: "the-dialogue-1", year: null },
  { id: "no-one", title: "No One", audio: "/audio/no-one-preview.m4a", preview: true, project: "the-dialogue-1", year: null },
  { id: "interlude", title: "Interlude", artist: "Angel Ahiati", audio: "/audio/interlude-preview.m4a", preview: true, project: "the-dialogue-1", year: null },
  { id: "ill-be-there", title: "I’ll Be There", audio: "/audio/ill-be-there-preview.m4a", preview: true, project: "the-dialogue-1", year: null },

  /* Singles */
  {
    id: "he-dey",
    title: "He Dey",
    with: "The CEO",
    audio: "/audio/he-dey-preview.m4a", preview: true,
    project: null,
    year: "2024",
    released: "2024-10-28",
    // YouTube: official DistroKid release (file metadata). Apple Music: verified listing.
    // ℗ 2024 The Control Room Music.
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=J0bJul4czKg" },
      { label: "Apple Music", url: "https://music.apple.com/gh/album/he-dey-single/1774939856" },
    ],
  },

  /*
   * Other songs — verified against Craig's Apple Music artist page and
   * Audiomack profile (Nov 2026). Newest first.
   */
  {
    id: "my-hiding-place",
    title: "My Hiding Place",
    featuring: "Kyei Mensah",
    audio: "/audio/my-hiding-place-preview.m4a", preview: true,
    project: null,
    year: "2026",
    released: "2026-03-20",
    links: [{ label: "Apple Music", url: "https://music.apple.com/gb/song/my-hiding-place/1885841572" }],
  },
  { id: "hene-jesu", title: "Hene Jesu", featuring: "Saint Kofi", audio: "/audio/hene-jesu-preview.m4a", preview: true, project: null, year: "2026" },
  { id: "impossible", title: "Impossible", featuring: "Aloud City Urban", audio: "/audio/impossible-preview.m4a", preview: true, project: null, year: "2026" },
  { id: "no-delay", title: "No Delay", audio: "/audio/no-delay-preview.m4a", preview: true, project: null, year: "2026" },
  { id: "good-days", title: "Good Days", audio: "/audio/good-days-preview.m4a", preview: true, project: null, year: "2025" },
  {
    id: "oluwa",
    title: "Oluwa",
    featuring: "Eddan",
    audio: "/audio/oluwa-preview.m4a", preview: true,
    project: null,
    year: "2024",
    released: "2024-07-01",
    links: [
      { label: "Spotify", url: "https://open.spotify.com/album/5lNtv7ose1p9CQGLtWG4EZ" },
      { label: "Apple Music", url: "https://music.apple.com/gh/album/oluwa-feat-eddan-single/1752826063" },
    ],
  },
];

/** The track the header PLAY control starts — must have audio to play. */
export const featuredTrackId = "he-dey";

export const ep = {
  title: "The Dialogue 1",
  kind: "EP",
  status: "Current release",
  /**
   * Draft editorial copy derived from the title and the artist's stated
   * intent — confirm wording with Craig before launch.
   */
  description: [
    "A record framed as a conversation. Between the hymns he grew up singing and the sound of the city now. Between a generation looking for something real and the God who answers.",
    "Written, sung and produced by Craig Osae.",
  ],
  /** Front and back of the cover — the site shuffles between them. */
  artwork: {
    src: "/images/the-dialogue-1-cover.jpg",
    width: 1254,
    height: 1254,
    alt: "The Dialogue 01 EP cover — Craig Osae, wearing headphones, looking up into a cloudy sky",
  } satisfies Media,
  artworkBack: {
    src: "/images/the-dialogue-1-tracklist.jpg",
    width: 1254,
    height: 1254,
    alt: "The Dialogue 01 track list: On My Knees, No One, Interlude by Angel Ahiati, I’ll Be There",
  } satisfies Media,
  /** Ordered track ids, from the official back cover. */
  tracklist: ["on-my-knees", "no-one", "interlude", "ill-be-there"] as string[],
  release: {
    /** From the Audiomack album page. */
    date: "2026-11-04" as string | null,
    label: null as string | null,
  },
  /** Per-platform links for the EP. null = not found / not confirmed yet. */
  links: [
    { label: "Audiomack", url: "https://audiomack.com/craigosae/album/the-dialogue-1" },
    // Apple's EP page URL wasn't findable; the artist page leads with the EP.
    { label: "Apple Music", url: "https://music.apple.com/gh/artist/craig-osae/1747588599" },
    // Spotify artist page — the EP is his latest release there.
    { label: "Spotify", url: "https://open.spotify.com/artist/7s12YPNxfPIyLrA6SxvhGV" },
    { label: "YouTube", url: "https://www.youtube.com/@craigosae" },
    { label: "Boomplay", url: "https://www.boomplay.com/artists/EQJUbLDw8KRwR08Zrh-YlROD" },
  ] as LinkItem[],
};

/* ── Story ──────────────────────────────────────────────────────────────── */

export const story = {
  pullQuote: "It starts with an encounter with Jesus Christ.",
  intent:
    "His music is rooted in that personal encounter — and written to share the Gospel, to inspire hope and to lead people into a deeper relationship with God.",
  sound: ["Contemporary African gospel", "Afrobeats", "Methodist hymns"],
  production:
    "He produces his own beats — shaping a sound that answers to his own creative identity rather than a template.",
  influences: ["CalledOut Music", "Don Moen"],
  influenceNote: "Meaningful Christian messages, carried by contemporary African sounds.",
  /** From the official bio — update the figure as it grows. */
  streams: "20,000+",
  independent:
    "streams and a growing audience — built independently, as an artist and producer still developing his craft.",
  mission:
    "More than songs: messages that strengthen faith, communicate God’s love and point people towards Jesus Christ.",
};

export const vision = {
  /** From the official bio: where the sound goes next. */
  reach: "Beyond Ghana — reaching hearts across Africa and the world.",
  /** Exact words — keep verbatim. */
  quote:
    "Changing the Ghanaian urban gospel scene to give room for different sounds and art in general, and to make young people know there's hope for the future.",
};

/* ── Stage & studio ─────────────────────────────────────────────────────── */

/** Photo helper for the live sets: /images/live/<event>/<nn>.jpg */
const live = (event: string, n: string, width: number, height: number, alt: string): Media => ({
  src: `/images/live/${event}/${n}.jpg`,
  width,
  height,
  alt,
});

export const performances: Performance[] = [
  {
    id: "octagon-2025",
    name: "OCTAGON Concert",
    year: "2025",
    photos: [
      live("octagon-2025", "01", 1170, 1336, "Craig Osae singing under white stage lights at OCTAGON Concert 2025"),
      live("octagon-2025", "02", 1170, 1465, "Craig Osae mid-song at OCTAGON Concert 2025"),
    ],
  },
  {
    id: "carnival-of-stars",
    name: "Carnival of Stars",
    year: null,
    photos: [
      live("carnival-of-stars", "01", 1280, 853, "Craig Osae performing with the band at Carnival of Stars"),
      live("carnival-of-stars", "02", 1280, 853, "Craig Osae on stage at Carnival of Stars"),
      live("carnival-of-stars", "03", 1280, 853, "Craig Osae singing at Carnival of Stars"),
    ],
  },
  { id: "koinonia-concert", name: "Koinonia Concert", year: null, photos: [] },
  {
    id: "supernatural-night",
    name: "Supernatural Night",
    year: null,
    photos: [
      live("supernatural-night", "01", 1280, 989, "Craig Osae singing at Supernatural Night"),
      live("supernatural-night", "02", 1280, 989, "Craig Osae performing at Supernatural Night"),
      live("supernatural-night", "03", 1280, 989, "Craig Osae with the microphone at Supernatural Night"),
    ],
  },
  {
    id: "tehillah-kabash",
    name: "Tehillah Kabash",
    year: "’26",
    photos: [live("tehillah-kabash", "01", 720, 1280, "The stage at Tehillah Kabash ’26")],
  },
];

export const collaborations: { name: string; note: string | null }[] = [
  { name: "Saint Kofi", note: "Hene Jesu" },
  { name: "Aloud City Urban", note: "Impossible" },
  { name: "Kyei Mensah", note: "My Hiding Place" },
  { name: "Eddan", note: "Oluwa" },
];

/* ── Official accounts ──────────────────────────────────────────────────── */
/*  Handle is @craigosae everywhere. URLs stay null until confirmed.        */

/*  Source: Craig's own Linktree (linktr.ee/craigosae) and his Audiomack
 *  profile, which links back to the same Instagram and YouTube. Nov 2026. */
export const socials: LinkItem[] = [
  { label: "Instagram", url: "https://www.instagram.com/craigosae" },
  { label: "TikTok", url: "https://www.tiktok.com/@craigosae" },
  // = youtube.com/channel/UCKzoLOROGttIt4eEesBKOhA (same channel, confirmed by Craig)
  { label: "YouTube", url: "https://www.youtube.com/@craigosae" },
  { label: "X", url: "https://x.com/craigosae" },
  { label: "WhatsApp channel", url: "https://whatsapp.com/channel/0029VbC1F4DC1FuEdgXuoP1n" },
];

export const streaming: LinkItem[] = [
  { label: "Spotify", url: "https://open.spotify.com/artist/7s12YPNxfPIyLrA6SxvhGV" },
  { label: "Apple Music", url: "https://music.apple.com/gh/artist/craig-osae/1747588599" },
  { label: "Audiomack", url: "https://audiomack.com/craigosae" },
  { label: "Boomplay", url: "https://www.boomplay.com/artists/EQJUbLDw8KRwR08Zrh-YlROD" },
];

/* ── Contact ────────────────────────────────────────────────────────────── */

export const contact = {
  /** Bookings inbox — the form opens an email to this address. */
  email: null as string | null,
  /**
   * Bookings number for WhatsApp, international format, digits only
   * (e.g. "233241234567"). The form opens a WhatsApp chat with it.
   * While both are null the form hands off to Instagram DMs.
   */
  whatsapp: null as string | null,
  enquiryTypes: ["Booking / performance", "Collaboration", "Press / media", "Other"],
};

/* ── Helpers ────────────────────────────────────────────────────────────── */

export const getTrack = (id: string) => tracks.find((t) => t.id === id) ?? null;

export const trackLabel = (t: Track) =>
  t.featuring ? `${t.title} (feat. ${t.featuring})` : t.with ? `${t.title} (with ${t.with})` : t.title;

/**
 * Where to hear the full song: the track's own verified link, else the
 * artist's first streaming profile (Spotify), so a preview always leads on.
 */
export const fullSongLink = (t: Track): LinkItem | null =>
  t.links?.find((l) => l.url) ?? streaming.find((l) => l.url) ?? null;

/** Songs that aren't on the given project. */
export const otherTracks = (projectId: string) => tracks.filter((t) => t.project !== projectId);
