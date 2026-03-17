# Cognitive Bias Detector

A frontend-only skeleton for a “Cognitive Bias Detector” site: text analysis, bias score, and neutral position placeholders. Built with React, TypeScript, React Router, and React Bootstrap.

## What’s included

- **Text Analysis** (home): hero, textarea, “Analyze Text” button, feature cards, and CTAs to other pages.
- **Bias Score**: placeholder score card and demo progress bar.
- **Neutral Position**: placeholder area for a future neutral rewrite.

No backend, API calls, auth, or persistence — UI only, ready to extend.

## Tech stack

- React 18 + TypeScript
- React Router (HashRouter for GitHub Pages)
- React Bootstrap + Bootstrap 5
- Vite

## Scripts

```bash
npm install
npm run dev     # start dev server (e.g. http://localhost:5173)
npm run build   # production build to dist/
npm run preview # preview production build locally
```

## Deploying to GitHub Pages

1. **Use HashRouter**  
   The app already uses `HashRouter` in `src/main.tsx`, so routes work on GitHub Pages (e.g. `https://user.github.io/repo/#/bias-score`) without server config.

2. **Set `base` if needed**  
   If the site is served from a subpath (e.g. `https://user.github.io/Web-Project/`), set that in `vite.config.ts`:
   ```ts
   base: '/Web-Project/',
   ```
   Then rebuild.

3. **Build and deploy**  
   - Run `npm run build`.
   - Push the contents of the `dist/` folder to the `gh-pages` branch, or use a GitHub Action to build and deploy from `main`.

   **Option A — Manual**  
   - Copy the contents of `dist/` into a branch named `gh-pages` and push, or use `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```

   **Option B — GitHub Actions**  
   - Add a workflow that runs `npm ci && npm run build` and uploads `dist` with `actions/upload-pages-artifact` / `actions/deploy-pages`. The repo’s “Pages” source should be “GitHub Actions”.

4. **Enable Pages**  
   In the repo: **Settings → Pages → Source**: choose “GitHub Actions” (or “Deploy from a branch” and select the `gh-pages` branch and `/` root).

After deployment, open `https://<user>.github.io/<repo>/` (and use the hash routes, e.g. `/#/bias-score`).

## Project structure

```
src/
  components/       # Reusable UI
    AppNavbar.tsx
    Footer.tsx
    Hero.tsx
    PageHeader.tsx
    SectionWrapper.tsx
    FeatureCard.tsx
    PlaceholderResultCard.tsx
    ButtonLinkCard.tsx
    CtaBlock.tsx
  pages/
    TextAnalysisPage.tsx
    BiasScorePage.tsx
    NeutralPositionPage.tsx
  App.tsx
  main.tsx
  index.css
```

You can grow this into 12+ components by splitting sections, adding result panels, forms, or shared layout pieces.

## License

MIT (or your choice).
