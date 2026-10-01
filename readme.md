# priyank.is-a.dev

Personal site of Priyank Patel, AI Engineer and Forward Deployed Engineer.

One static page. The hero is a live graph of things I've built (squares) and what they're built with (circles): hover a node to trace its connections, click a square to jump to its section. Below it, plain text sections for Work, Open source, Projects and Contact. ⌘K (or `/`) opens a command menu. Light and dark themes follow the system, with a manual toggle.

## Structure

- `index.html` is the whole site: markup, styles (palette as custom properties at the top of the `<style>` block) and the graph script.
- `public/` holds the CNAME, icons and social image; Vite copies it into `dist/`.

## Develop

```bash
npm install
npm run dev
```

`npm run build` writes the site to `dist/`. Pushing to `main` deploys it to GitHub Pages through `.github/workflows/deploy-pages.yml`.
