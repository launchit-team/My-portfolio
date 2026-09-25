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

`src/components/Contact/Contact.jsx` uses the existing EmailJS service, template, and public key until all three `VITE_EMAILJS_*` variables are set. The shared form adapts its labels and qualifying fields to each service while retaining required-field validation, duplicate-submission prevention, pending state, accessible feedback, direct email, and draft preservation on failure.

### Move the contact form to a new EmailJS account

The current template is in the EmailJS account signed in as `launchit.dev.team@gmail.com`. The intended new account sign-in is `liveclipzs@gmail.com`; form submissions should go to `hello@sami-creative.com`.

1. Sign up at [EmailJS](https://dashboard.emailjs.com/sign-up) with `liveclipzs@gmail.com` and complete email verification.
2. In the new account, connect an email service. Create a contact template with **To Email** set to `hello@sami-creative.com`, **Reply-To** set to `{{email}}`, and body fields such as `{{name}}`, `{{email}}`, `{{message}}`, `{{date}}`, and `{{time}}`. Test it in EmailJS.
3. Copy the new Service ID, Template ID, and Account Public Key. In Netlify, set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` for the production build. Set all three together; a partial configuration disables form submission rather than mixing accounts.
4. Trigger a new Netlify deploy, submit a test message on the live website, and check `hello@sami-creative.com` for delivery. After that succeeds, remove the old account's fallback IDs from `src/components/Contact/Contact.jsx`.

These three IDs are public browser configuration, not a password or EmailJS private key. Do not put the new account password or private key in the site or Netlify's `VITE_` variables.

## Verification

- Production build and ESLint pass.
- `/`, `/video-editing`, and `/web-development` load directly.
- All three routes were checked at 320, 390, and 1440 pixels with no horizontal overflow.
- Navigation, portfolio switching, mobile menu behavior, project previews, and all six live-site destinations were checked in Chrome.
- The video repository contains no public video files; the video route uses an honest private-sample flow until approved work is supplied.
