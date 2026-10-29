# Annabelle Portfolio

The personal portfolio homepage uses React and Vite. `src/sections/` contains homepage sections, and `src/components/` contains reusable interactive components. Original portfolio examples remain in their respective directories.

## Local development

Use Node.js 20.19 or newer in the 20.x series, or Node.js 22.12 or newer:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. To access the site from a phone on the same network, run `npm run dev -- --host 0.0.0.0` and open the computer's LAN address on the phone.

## Build and deployment

```bash
npm run build
npm run preview
```

Upload the **complete contents** of `dist/` to the site root. The build also includes linked legacy portfolio pages, images, the resume, and certificates. The development `index.html` cannot be used directly for deployment; build first.

The original English content is retained and Google Translate has been removed. Chinese and English content management with Chinese as the default is planned for a later phase; the content itself does not yet have a language switch.
