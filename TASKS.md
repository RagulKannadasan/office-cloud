# Office Cloud - Master Feature Roadmap & Tasks

This document tracks all planned features and technical improvements for the Office Cloud SaaS, organized by priority and module.

## 🟢 Phase 1: Core HR & Operations (v1.0 MVP)

- [ ] **Leave & Absence Management**
  - [ ] Build Employee UI to request PTO/Sick Leave.
  - [ ] Build Manager/TL calendar view to approve or deny requests.
  - [ ] Implement Server Actions to update `LeaveRequest` status in Supabase.

- [ ] **Advanced Reporting Engine**
  - [ ] Implement Server Actions to aggregate `AttendanceLog` data.
  - [ ] Create visual charts (using Recharts) for the CEO and Managers.
  - [ ] Add CSV/Excel export capabilities for monthly payroll processing.

- [ ] **Employee Directory**
  - [ ] Build a searchable page for all employees to view colleagues, roles, and squad assignments.

## 🟡 Phase 2: UX Polish & Platform Enhancements

- [ ] **Form State & Feedback**
  - [ ] Implement `useFormStatus` on all action buttons (Clock In/Out, Add User).
  - [ ] Add global toast notifications (success/error popups) for database mutations.

- [ ] **Progressive Web App (PWA)**
  - [ ] Finalize `next-pwa` configuration.
  - [ ] Ensure mobile installability and configure offline fallback pages.

- [ ] **Push Notifications**
  - [ ] Integrate browser notifications for real-time alerts (e.g., Leave approvals, new squad assignments).

## 🔵 Phase 3: Project & Workflow Management (v2.0)

- [ ] **Squad Kanban Boards**
  - [ ] Design Prisma schema extensions (`Project`, `Task`, `Column`).
  - [ ] Build a drag-and-drop task board interface for daily engineering workflows.

- [ ] **Task-Based Time Tracking**
  - [ ] Update attendance tracking to allow logging hours against specific Jira/Kanban tickets to measure squad velocity.

- [ ] **Company Announcements**
  - [ ] Build a broadcast system for the CEO/Managers to post global updates to employee dashboards.

## 🟣 Phase 4: Performance & Scaling

- [ ] **Database Optimization**
  - [ ] Review PostgreSQL queries and implement indexing on frequently accessed columns (e.g., `userId`, `date`).
  - [ ] Implement Next.js caching or Redis for heavy executive analytics queries.
