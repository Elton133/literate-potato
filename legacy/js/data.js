// EDIT THIS FILE: all your content lives here. No other code changes needed to get started.
window.SITE = {
  name: "Your Artist Name",
  tagline: "Genre / one line that says who you are",
  email: "bookings@yourdomain.com",
  // Optional: paste a Formspree/Getform URL here to receive bookings by form. Leave "" to use email.
  bookingEndpoint: "",
  heroImage: "assets/images/hero.jpg",
  portrait: "assets/images/portrait.jpg",
  story: [
    "Write the first paragraph of your story here: where you come from and how music started.",
    "Second paragraph: your sound, your influences, what you want people to feel.",
    "Third paragraph: where you are now and what is coming next."
  ],
  tracks: [
    // file: put audio in assets/audio.
    { title: "Track One", year: "2026", file: "assets/audio/track-one.mp3" },
    { title: "Track Two", year: "2025", file: "assets/audio/track-two.mp3" }
  ],
  streaming: [
    { label: "Spotify", url: "#" },
    { label: "Apple Music", url: "#" },
    { label: "YouTube", url: "#" },
    { label: "Audiomack", url: "#" }
  ],
  videoEmbed: "", // paste a YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID
  shows: [
    // Leave empty [] to show the "no dates yet" message. Past dates hide automatically.
    { date: "2026-12-12", venue: "Venue Name", city: "City, Country", ticketUrl: "#", status: "tickets" }
    // status: "tickets" | "free" | "sold-out"
  ],
  socials: [
    { label: "Instagram", url: "#" },
    { label: "TikTok", url: "#" },
    { label: "X", url: "#" },
    { label: "Facebook", url: "#" },
    { label: "YouTube", url: "#" }
  ],
  pressKit: "assets/press/press-kit.pdf",
  gallery: [] // e.g. ["assets/images/g1.jpg", "assets/images/g2.jpg"]
};
