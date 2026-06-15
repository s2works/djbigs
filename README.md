# DJ BIG S — Landing Page

A simple, modern, mobile-optimized landing page for **DJ BIG S**, a rising
force in the global house music scene.

## Features

- Responsive, mobile-first layout
- Hero, bio, embedded **Spotify** and **SoundCloud** players, stages/support, and contact sections
- Lightweight: plain HTML, CSS, and a small JS file — no build step required
- Dark, neon-accented design with subtle motion (respects `prefers-reduced-motion`)

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup and media embeds |
| `styles.css` | Styling, layout, and responsive rules |
| `script.js` | Footer year + scroll-reveal animations |

## Run locally

It's a static site — just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Host the folder on any static host (Vercel, Netlify, GitHub Pages, etc.).
