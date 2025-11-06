# Himanshu Gupta · Personal Site

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Online-brightgreen?style=for-the-badge&logo=vercel)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.16-38B2AC?style=flat&logo=tailwind-css)

A modern personal site built with Next.js 16 showcasing my work as a Senior Full-Stack Engineer in AI, AR, and scalable web systems. It reimagines the Twitter timeline with shader-enhanced visuals while maintaining perfect 100/100 Lighthouse scores on desktop and mobile.

## ✨ Highlights

- **Twitter-Inspired Layout** – Adapts the familiar Twitter interface into a cohesive portfolio with a timeline, dock, and tabbed sections for posts, projects, experience, and contact.
- **Aurora Shader Banner** – Features a custom Three.js shader that renders a realtime aurora backdrop, dynamically scaling across all breakpoints.
- **URL Synced Tabs** – Maintains tab state through query parameters and supports swipe gestures, enabling deep links such as `?tab=experience`.
- **Considered Motion** – Uses Framer Motion and React Spring for micro-interactions (timeline rail, dock, dialogs), fully respecting `prefers-reduced-motion`.
- **Contact Workflow** – Implements server actions with Zod validation, Turso persistence via Drizzle ORM, Resend email integration, and a signed-JWT rate limiter.
- **Lighthouse 100/100** – Achieves perfect scores in Performance, Accessibility, Best Practices, and SEO on both desktop and mobile builds.

## 🧭 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Getting Started](#-getting-started)
3. [Environment](#-environment-variables)
4. [Project Structure](#-project-structure)
5. [Performance Notes](#-performance-notes)
6. [Contributing](#-contributing)
7. [License & Contact](#-license--contact)

## 🛠 Tech Stack

**Frontend**

- Next.js 16 App Router, React 19, TypeScript 5.9
- Tailwind CSS 4 with CSS-driven theming
- Framer Motion, React Spring, Embla Carousel
- Three.js for custom shader effects
- Radix UI / shadcn primitives, Lucide icons, Sonner toasts

**Backend & Infrastructure**

- Drizzle ORM + Turso (SQLite) for persistence
- Next.js server actions with Zod validation & signed-JWT rate limiting
- Resend for contact form email delivery
- Vercel for hosting, Analytics, and Speed Insights

## 🚀 Getting Started

```bash
git clone https://github.com/devhims/devhims-site.git
cd devhims-site
pnpm install          # or npm/yarn/bun
pnpm db:generate
pnpm db:migrate:dev
pnpm dev
```

Visit http://localhost:3000 and explore the tabs or share a deep link such as `http://localhost:3000/?tab=experience`.

## 🔐 Environment Variables

Create a `.env.local` file with the following keys:

```env
DATABASE_URL= # Turso connection string
RESEND_API_KEY=
RATE_LIMIT_SECRET= # 32+ char secret for signed rate-limit token
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

Run `pnpm db:generate && pnpm db:migrate:dev` after updating the database URL to keep the schema in sync.

## 🗂 Project Structure

```
src/
├── app/                 # App Router entrypoints, server actions, RSC
│   ├── globals.css      # Tailwind v4 theme + global styles
│   ├── layout.tsx       # Root layout with font wiring
│   └── page.tsx         # Landing experience
├── components/
│   ├── aurora-effect.tsx    # Three.js shader canvas
│   ├── dock.tsx, nav-links.tsx, timeline.tsx, ...
│   ├── ui/                 # shadcn/Radix based primitives
│   └── skeletons/          # Loading states
├── constants/              # Static data, noise textures, routes
├── db/                     # Drizzle schema & migrations
├── hooks/                  # Client hooks (swipeable tabs, etc.)
└── lib/                    # Utilities and helpers
```

Other notable files:

- `postcss.config.mjs` – Tailwind v4 plugin entry
- `drizzle.config.ts` – Database migrations

## ⚡ Performance Notes

- Image assets are optimized through Next/Image and a minimal font payload (Geist Sans + Mono via next/font).
- Animations respect `prefers-reduced-motion`, and GPU-heavy work (aurora) is isolated to a dedicated canvas.
- Lighthouse reports 100 in Performance, Accessibility, Best Practices, and SEO for both desktop and mobile profiles (tested on production builds hosted on Vercel).

## 🤝 Contributing

Open to fixes and enhancements:

1. Fork the repo and create a branch (`git checkout -b feature/your-idea`)
2. Run tests and linting (`pnpm lint`)
3. Open a PR describing the change and screenshots if it touches UI

## 📄 License & Contact

- Licensed under the [MIT License](LICENSE).
- Say hello: [devhims.com](https://devhims.com) · [@devhims](https://x.com/devhims) · contact@devhims.com

Built with ❤️ by Himanshu Gupta.
