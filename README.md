# Roger Jaden — Developer Portfolio

A component-based React + Vite portfolio inspired by the supplied dark editorial portfolio style: charcoal/plum surfaces, electric yellow accents, IBM Plex Mono labels, oversized display typography, grain texture, animated marquee, rotating tagline, scroll reveal, count-up stats, and interactive project notes.

## Run locally

Requirements: Node.js 20+

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    Blog.jsx
    Contact.jsx
    CountUp.jsx
    Footer.jsx
    Hero.jsx
    Marquee.jsx
    Navbar.jsx
    Projects.jsx
    Section.jsx
    SideQuests.jsx
    Skills.jsx
    Timeline.jsx
  data/
    portfolio.js
  App.jsx
  hooks.js
  main.jsx
  styles.css
```

## Customize before publishing

- Edit `src/data/portfolio.js` to update your email, roles, project links, content, and resume path.
- Replace `public/resume.pdf` with your resume PDF (create the `public` folder if needed).
- The contact form uses `mailto:` and opens the visitor's email application; it does not send messages from a backend.
- Project statistics are limited to project-specific facts available for this version. Update them if you have newer verified numbers.

The portfolio is a recreation inspired by the supplied reference file, not the original author's private source code.

## Cursor-reactive liquid background

`src/components/CursorFluidBackground.jsx` draws animated purple liquid-metal ribbons on a canvas. The shapes drift continuously and bend with pointer movement. It is decorative and does not block page interaction. Reduced-motion preferences are respected.


## GitHub statistics on Render

The portfolio is a Render Static Site, so it cannot run a private GitHub token or a server-side API route itself. The `github-api/` folder contains a small Express API that should be deployed as a separate Render **Web Service**. The API caches statistics for 15 minutes and keeps `GITHUB_TOKEN` server-side.

### Deploy the API

1. Push this updated project to your Git repository. Do not commit any `.env` file or token.
2. In Render, create **New + → Web Service** and select this repository.
3. Set **Root Directory** to `github-api`, **Build Command** to `npm install`, and **Start Command** to `npm start`. Choose a Node runtime.
4. Add these Web Service environment variables:
   - `GITHUB_USERNAME` = `Rogerjaden`
   - `GITHUB_TOKEN` = a newly created GitHub token with read-only access to public repository data
   - `FRONTEND_ORIGIN` = the exact URL of your Render Static Site, e.g. `https://your-site.onrender.com`
5. Deploy and verify `https://YOUR-API-SERVICE.onrender.com/health` returns `{"status":"ok"}`.
6. In the Render **Static Site** settings, add `VITE_GITHUB_API_URL` = `https://YOUR-API-SERVICE.onrender.com/api/github-stats`, then trigger a new deploy. Replace the example host with your actual Web Service URL.

### Local development

Run the API from the `github-api` directory with `npm install` and `npm start`; set the API environment variables in your local shell. In the portfolio root, set `VITE_GITHUB_API_URL=http://localhost:3001/api/github-stats` in your local `.env.local`. Never put `GITHUB_TOKEN` in the portfolio root or in any variable beginning with `VITE_`.

The commit figure counts commits attributed to the GitHub username across owned repositories and may not equal the contribution graph's lifetime total. The API caches the response for 15 minutes.
