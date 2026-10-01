# priyank.is-a.dev

Personal site of Priyank Patel, AI Engineer and Forward Deployed Engineer.

The site is a single page set like a CV or a book: one reading column, a narrow margin for dates and labels, hairline rules instead of cards. Type does the work. Headings and body are in Newsreader, metadata is in IBM Plex Mono. The light theme is ink on warm paper. The dark theme is the same page in reverse. It follows the system setting and has a manual toggle.

Sections: intro, current work (the Right Hand case study), open source (Kubeflow), selected projects, background (freelance work, education, tools), and contact.

## Structure

- `src/content.js` holds all copy. Edit text here.
- `src/components/Sections.jsx` renders each section from that content.
- `src/components/Layout.jsx` has the margin-and-column row primitives.
- `src/context/ThemeContext.jsx` handles the light and dark theme.
- `src/styles.css` is the whole stylesheet. The palette is a set of custom properties at the top.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build goes to `dist/`. Pushing to `main` deploys it to GitHub Pages through `.github/workflows/deploy-pages.yml`.
