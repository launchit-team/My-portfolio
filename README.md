# Samy — Portfolio

Two focused portfolio experiences under one personal brand:

- `/video-editing` — short-form editing for content creators
- `/web-development` — websites, applications, interfaces, and digital products
- `/` — home, portfolio directions, and experience

Built with React 19, Vite 7, plain CSS, and EmailJS.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

Vite produces the deployable site in `dist/`. `netlify.toml` builds and publishes that directory on Netlify. `public/_redirects` sends the old `/webdevelopment` URL to `/web-development` and serves the app for direct visits to its routes. `vercel.json` provides the equivalent SPA rewrite on Vercel.

## Structure

The three routes use `src/components/Studio.jsx` and `Studio.css`. Home and Video Editing use charcoal and warm neutral accents; Web Development uses ivory and black. Shared navigation includes an About dialog. Contact forms and FAQs live in a native dialog to keep the pages concise.

The video-editing route includes private sample categories and an interactive raw/final workflow illustration with a keyboard-accessible timeline scrubber. The phone and workflow are interface illustrations, not client video or performance evidence. No generated portraits, fake views, or invented client footage are used.

The web-development route contains a project-based laptop hero, a three-card gallery expandable to all six existing projects, category filters, six services, the supplied experience statistics, software-engineering background, web-specific FAQ, and contact form. Project names and descriptions come from the supplied live deployments. Local WebP previews live in `public/projects/`.

The supplied Passage deployment currently renders a blank page. Its preview uses the hero image referenced by that project’s deployed JavaScript rather than a fabricated screenshot.

## Contact integration

`src/components/Contact/Contact.jsx` preserves the existing EmailJS service, template, and public key. The shared form adapts its labels and qualifying fields to each service while retaining required-field validation, duplicate-submission prevention, pending state, accessible feedback, direct email, and draft preservation on failure.

## Verification

- Production build and ESLint pass.
- `/`, `/video-editing`, and `/web-development` load directly.
- All three routes were checked at 320, 390, and 1440 pixels with no horizontal overflow.
- Navigation, portfolio switching, mobile menu behavior, project previews, and all six live-site destinations were checked in Chrome.
- The video repository contains no public video files; the video route uses an honest private-sample flow until approved work is supplied.
