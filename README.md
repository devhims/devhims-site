# Himanshu Gupta | Personal Portfolio

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Online-brightgreen?style=for-the-badge&logo=vercel)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.16-38B2AC?style=flat&logo=tailwind-css)

A modern, responsive personal portfolio website built with Next.js 16, showcasing my journey as a Senior Full-Stack Engineer specializing in AI-powered web solutions, augmented reality, and scalable system architecture.

## 🌟 Features

### 📱 Interactive Portfolio Sections

- **Posts**: Personal updates and development insights in a Twitter-like interface
- **Projects**: Showcase of open-source contributions and personal projects
- **Experience**: Professional journey with detailed role descriptions and skills
- **Contact**: Functional contact form with email integration and database storage

### 🎨 Modern UI/UX

- Twitter-inspired design with dark theme
- Responsive layout optimized for all devices
- Smooth animations with Framer Motion and React Spring
- Aurora effect banner with Three.js
- Swipeable tabs for mobile navigation

### 🚀 Performance & Analytics

- Built with Next.js 15 and React 19
- Vercel Analytics and Speed Insights integration
- Optimized fonts with Geist Sans and Geist Mono
- Rate limiting for contact form submissions

### 📧 Contact System

- Server-side form validation with Zod
- Email notifications via Resend
- Database storage with Drizzle ORM and Turso
- Rate limiting with Upstash Redis

## 🛠 Tech Stack

### Frontend

- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Tailwind CSS 4.1.16** - Utility-first CSS framework (v4 with CSS-based config)
- **Framer Motion 12.23.24** - Animation library
- **Three.js 0.181.0** - 3D graphics and aurora effects

### Backend & Infrastructure

- **Drizzle ORM** - Type-safe SQL query builder
- **Turso** - Edge database (SQLite-compatible)
- **Resend** - Email service for contact forms
- **Upstash Redis** - Rate limiting and caching
- **Vercel** - Deployment and hosting

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications
- **Embla Carousel** - Touch-friendly carousels

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended), or npm/yarn/bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/devhims/devhims-site.git
   cd devhims-site
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=your_turso_database_url

   # Email Service
   RESEND_API_KEY=your_resend_api_key

   # Rate Limiting
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

   # Analytics (optional)
   NEXT_PUBLIC_VERCEL_ANALYTICS=true
   ```

4. **Set up the database**

   ```bash
   # Generate and run migrations
   pnpm db:generate
   pnpm db:migrate:dev
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📁 Project Structure

```
devhims-site/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── actions/         # Server actions
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── robots.ts        # SEO
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── skeletons/       # Loading skeletons
│   │   └── icons/           # Custom icons
│   ├── constants/           # App constants & data
│   ├── db/                  # Database schema & config
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utilities & types
├── public/                  # Static assets
├── drizzle.config.ts        # Database configuration
├── next.config.ts          # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS config
```

## 🗄 Database Schema

The application uses a simple SQLite database with Turso for contact messages:

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL DEFAULT 'Anonymous',
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  system_info TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Manual Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

While this is a personal portfolio, contributions for bug fixes and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Vercel** for hosting and analytics
- **Turso** for the edge database (SQLite-compatible)
- **Resend** for email services
- **Upstash** for Redis based rate limiting
- **Drizzle ORM** for database operations

## 📞 Contact

- **Website**: [https://devhims.com](https://devhims.com)
- **GitHub**: [devhims](https://github.com/devhims)
- **LinkedIn**: [creativehims](https://linkedin.com/in/creativehims)
- **Twitter**: [@devhims](https://x.com/devhims)
- **Email**: contact@devhims.com

---

**Built with ❤️ by Himanshu Gupta**
