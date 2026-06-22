# Office Cloud

Secure, high-performance office management workspace built exclusively for software development companies.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **PWA Ready:** Integrates next-pwa for offline and installable support.
- **Authentication:** Custom Stateless OTP via Nodemailer with Edge-Compatible JWTs (jose).
- **Styling:** Premium Vanilla CSS with Glassmorphism.

## Getting Started

1. Set up your environment variables in `.env.local` (including your SMTP credentials).
2. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment
Optimized for zero-config deployment on Vercel. Ensure you add the environment variables in your Vercel Project Settings.
