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
