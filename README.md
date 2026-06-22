# Office Cloud 🚀

Office Cloud is a high-performance, production-ready office management SaaS designed for high-velocity software development teams. Built from the ground up with a premium glassmorphism aesthetic, it provides strict role-based access control, real-time attendance tracking, squad management, and executive analytics.

## 🌟 Key Features

- **Strict Role-Based Access Control (RBAC):**
  - **CEO:** Global view of company analytics, burn rates, and organizational velocity.
  - **Manager:** Full team management, employee assignments, and squad creation.
  - **Team Leader (TL):** Granular squad management, daily performance tracking.
  - **Employee:** Direct access to clock-in/out attendance systems and personal logs.

- **Real-Time Attendance Engine:** Accurate, server-synced time tracking that strictly prevents hydration mismatches and timezone drift.
- **Frictionless Authentication:** Magic-link style OTP login that automatically provisions users and enforces roles against the central database upon their first sign-in.
- **Premium Glassmorphism UI:** A sleek, dark-mode-first aesthetic with modern animations and fluid layouts built entirely with CSS (no heavy UI libraries).

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM:** [Prisma v7](https://www.prisma.io/) (utilizing the new `@prisma/adapter-pg` driver for edge-ready performance)
- **Styling:** Vanilla CSS3
- **Language:** TypeScript

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd office-cloud
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and configure your Supabase database and default roles:

```env
# Supabase PostgreSQL connection strings
DATABASE_URL="postgresql://postgres:[PASSWORD]@[YOUR-SUPABASE-URL]:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[YOUR-SUPABASE-URL]:5432/postgres"

# Initial Role Provisioning (These emails will automatically be assigned these roles on first login)
CEO_EMAIL="ceo@company.com"
MANAGER_EMAIL="manager@company.com"
```

### 4. Database Setup
Push the Prisma schema to your Supabase instance and generate the client:
```bash
npx prisma db push
npx prisma generate
```

### 5. Run the Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is proprietary and confidential.
