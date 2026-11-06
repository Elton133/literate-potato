# Artist website starter

Static site: no build step, no dependencies.

## Run it
Open `index.html`, or for best results use a local server:
`npx serve .`  or the VS Code "Live Server" extension.

## Edit your content
Everything (name, story, tracks, shows, socials, booking email) is in `js/data.js`.

## Add your files
- `assets/images/hero.jpg` (wide photo) and `portrait.jpg` (4:5 portrait)
- `assets/audio/*.mp3` (match filenames in data.js)
- `assets/press/press-kit.pdf`

## Bookings
By default the form opens an email draft. For real form submissions, create a free
Formspree (or Getform) endpoint and paste its URL in `bookingEndpoint`.

## Newsletter
Replace the handler at the bottom of `js/main.js` with your provider (Mailchimp, Buttondown, etc.).

## Colors and fonts
Change the variables at the top of `css/styles.css`.

## Deploy
Drag the folder onto Netlify, Vercel, or Cloudflare Pages, or use GitHub Pages.

## Ideas to add next
Merch/store link, EPK page, blog or news, press quotes, a map of tour dates, Bandsintown widget.
