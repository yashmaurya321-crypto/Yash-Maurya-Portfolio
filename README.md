# Yash Maurya — Portfolio

A premium, dependency-free personal portfolio. Pure HTML + CSS + vanilla JS — no build step, no frameworks.

## Run it

Just open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Structure

```
index.html        — all content & structure
css/style.css     — design tokens, layout, animations
js/main.js        — interactions (reveals, parallax, tilt, carousel…)
assets/           — resume PDF (placeholder) & future images
groundwork.html   — unrelated earlier demo page, kept as-is
```

## Make it yours (checklist)

1. **Resume** — replace `assets/Yash-Maurya-Resume.pdf` with your real resume (keep the filename, or update the two `Download Resume` links in `index.html`).
2. **Profile photo** — in the About section, swap the `.portrait-placeholder` div for the commented-out `<img>` tag and add `assets/profile.jpg`.
3. **Links** — update the GitHub / LinkedIn / Live Demo URLs (search for `github.com` and `linkedin.com` in `index.html`).
4. **Experience dates** — the timeline periods (2022 → Present) are estimates; adjust to your actual dates.
5. **Testimonials & certifications** — placeholder names/certs are marked with HTML comments; replace with real ones.
6. **Stats** — tweak the `data-count` numbers in the About stats cards.

## Notes

- Dark theme, electric-blue/violet gradient system, Sora + Instrument Sans + JetBrains Mono.
- All animations respect `prefers-reduced-motion`.
- The contact section has no form — just a `mailto:` button and social links, so there's nothing to store or spam.
