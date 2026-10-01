# priyank.is-a.dev

Personal site of Priyank Patel, AI Engineer and Forward Deployed Engineer.

The site is set like a CV or a book. It has a sticky section index on the left, one reading column, and hairline rules instead of cards. The first screen is a single oversized statement and Fig. 1, an interactive SVG schematic of how Right Hand narrows 100+ open situations to the 5 that need action today. Hover or tap a number to trace a pick back to its situation and its emails. The figure draws itself once when it is on screen at load, and it always ends in its complete final state.

Type does the rest. Headings and body are in Newsreader, metadata is in IBM Plex Mono. The light theme is ink on warm paper. The dark theme is the same page in reverse. It follows the system setting and has a manual toggle.

## Pages

- `/` is the home page: the hero, then Now, Open source, Selected projects, Background, and Contact. Each item shows a name, one line, and one figure. Detail sits behind expanders.
- `/right-hand/` is the full Right Hand case study.

## Structure

- `src/content.js` holds all copy. Edit text here.
- `src/components/Sections.jsx` renders the home page sections.
- `src/components/CasePage.jsx` renders the case study.
- `src/components/TriageFigure.jsx` draws Fig. 1.
- `src/components/Rail.jsx` is the sticky section index (a top bar on narrower screens).
- `src/components/Layout.jsx` has the row, section, and figure primitives.
- `src/context/ThemeContext.jsx` handles the light and dark theme.
- `src/styles.css` is the whole stylesheet. The palette is a set of custom properties at the top.
- `index.html` and `right-hand/index.html` are the two Vite entry pages.

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
