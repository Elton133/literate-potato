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
  name: string;
  /** Display year exactly as known. null when unconfirmed. */
  year: string | null;
};

/* ── Artist ─────────────────────────────────────────────────────────────── */

export const artist = {
  name: "Craig Osae",
  handle: "@craigosae",
  country: "Ghana",
  roles: ["Singer", "Songwriter", "Producer"],
  genre: "Afrogospel",
  /** Shown in the hero. */
  statement:
    "Afrogospel from Ghana — contemporary African gospel, Afrobeats and the Methodist hymns that raised him, built on beats he makes himself.",
  /** Used for SEO description. */
  summary:
    "Craig Osae is a Ghanaian Afrogospel artist, singer, songwriter and music producer blending contemporary African gospel, Afrobeats and traditional Methodist hymn influences.",
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
  /** Media section plates, in reading order. Layout cycles every four. */
  gallery: [
    { src: "/images/craig-osae-chair-03.jpg", width: 2706, height: 3600, alt: "Craig Osae seated on a wooden chair, hand to his chin", focus: "50% 38%" },
    { src: "/images/craig-osae-smile.jpg", width: 2505, height: 3600, alt: "Craig Osae smiling, holding his sunglasses", focus: "50% 30%" },
    { src: "/images/craig-osae-full-length-02.jpg", width: 2793, height: 3600, alt: "Full-length portrait of Craig Osae standing", focus: "50% 45%" },
    { src: "/images/craig-osae-chair-04.jpg", width: 2823, height: 3600, alt: "Craig Osae on a wooden chair, adjusting his sunglasses", focus: "50% 36%" },
    { src: "/images/craig-osae-chair-01.jpg", width: 2855, height: 3600, alt: "Craig Osae leaning back in a wooden chair", focus: "45% 42%" },
    { src: "/images/craig-osae-seated.jpg", width: 2492, height: 3600, alt: "Craig Osae seated, looking into the camera", focus: "50% 25%" },
    { src: "/images/craig-osae-full-length-cap.jpg", width: 2617, height: 3600, alt: "Full-length portrait of Craig Osae holding a flat cap", focus: "50% 45%" },
    { src: "/images/craig-osae-chair-02.jpg", width: 2714, height: 3600, alt: "Craig Osae seated, hand resting on his chin", focus: "50% 40%" },
  ] as Media[],
  /* Unused so far: /images/craig-osae-full-length-01.jpg */
};

/* ── Music ──────────────────────────────────────────────────────────────── */

export const tracks: Track[] = [
  /* The Dialogue 1 — order and credits from the official back cover */
  { id: "on-my-knees", title: "On My Knees", audio: null, project: "the-dialogue-1", year: null },
  { id: "no-one", title: "No One", audio: null, project: "the-dialogue-1", year: null },
  { id: "interlude", title: "Interlude", artist: "Angel Ahiati", audio: null, project: "the-dialogue-1", year: null },
  { id: "ill-be-there", title: "I’ll Be There", audio: null, project: "the-dialogue-1", year: null },

  /* Singles */
  {
    id: "he-dey",
    title: "He Dey",
    with: "The CEO",
    // 45-second excerpt (1:40–2:25) cut from the master in /media-source.
    // The full song is never served by this site.
    audio: "/audio/he-dey-preview.m4a",
    preview: true,
    project: null,
    year: "2024",
    released: "2024-10-28",
    // From the official DistroKid → YouTube release (file metadata).
    links: [{ label: "YouTube", url: "https://www.youtube.com/watch?v=J0bJul4czKg" }],
  },

  /* Other songs */
  { id: "oluwa", title: "Oluwa", audio: null, project: null, year: null },
  { id: "good-days", title: "Good Days", audio: null, project: null, year: null },
  {
    id: "my-hiding-place",
    title: "My Hiding Place",
    featuring: "Kyei Mensah",
    audio: null,
    project: null,
    year: null,
  },
];

/** The track the header PLAY control starts. */
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
    date: null as string | null,
    label: null as string | null,
  },
  /** Smart link / per-platform links for the EP. */
  links: [
    { label: "Spotify", url: null },
    { label: "Apple Music", url: null },
    { label: "Audiomack", url: null },
    { label: "YouTube Music", url: null },
    { label: "Boomplay", url: null },
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
};

export const vision = {
  /** Exact words — keep verbatim. */
  quote:
    "Changing the Ghanaian urban gospel scene to give room for different sounds and art in general, and to make young people know there's hope for the future.",
};

/* ── Stage & studio ─────────────────────────────────────────────────────── */

export const performances: Performance[] = [
  { name: "OCTAGON Concert", year: "2025" },
  { name: "Carnival of Stars", year: null },
  { name: "Koinonia Concert", year: null },
  { name: "Supernatural Night", year: null },
  { name: "Tehillah Kabash", year: "’26" },
];

export const collaborations: { name: string; note: string | null }[] = [
  { name: "Saint Kofi", note: null },
  { name: "Aloud City Urban", note: null },
  { name: "Kyei Mensah", note: "My Hiding Place" },
];

/* ── Official accounts ──────────────────────────────────────────────────── */
/*  Handle is @craigosae everywhere. URLs stay null until confirmed.        */

export const socials: LinkItem[] = [
  { label: "Instagram", url: null },
  { label: "TikTok", url: null },
  { label: "YouTube", url: null },
];

export const streaming: LinkItem[] = [
  { label: "Spotify", url: null },
  { label: "Apple Music", url: null },
  { label: "Audiomack", url: null },
  { label: "Boomplay", url: null },
];

/* ── Contact ────────────────────────────────────────────────────────────── */

export const contact = {
  /** Bookings inbox. While null the form hands off to Instagram DMs. */
  email: null as string | null,
  enquiryTypes: ["Booking / performance", "Collaboration", "Press / media", "Other"],
};

/* ── Helpers ────────────────────────────────────────────────────────────── */

export const getTrack = (id: string) => tracks.find((t) => t.id === id) ?? null;

export const trackLabel = (t: Track) =>
  t.featuring ? `${t.title} (feat. ${t.featuring})` : t.with ? `${t.title} (with ${t.with})` : t.title;

/** First verified "full song" link for a track, if any. */
export const fullSongLink = (t: Track) => t.links?.find((l) => l.url) ?? null;

/** Songs that aren't on the given project. */
export const otherTracks = (projectId: string) => tracks.filter((t) => t.project !== projectId);
