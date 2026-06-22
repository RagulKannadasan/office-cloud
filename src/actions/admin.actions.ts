'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const defaultFeatures = [
  { title: "Role-Based Access", desc: "Strictly enforced security boundaries. CEOs see analytics, Managers handle assignments, and Team Leaders monitor squads.", icon: "🛡️" },
  { title: "Real-Time Attendance", desc: "Instant clock-in/out syncing. Track active hours, breaks, and daily completion logs directly from the dashboard.", icon: "⏱️" },
  { title: "Executive Analytics", desc: "High-level KPI dashboards designed for the C-Suite. Visualize workforce trends and project burn rates at a glance.", icon: "📈" },
  { title: "Squad Management", desc: "Granular control for Team Leaders. Assign tasks, view direct reports, and optimize the velocity of your engineering squads.", icon: "👥" }
];

const defaultWorkflow = [
  { num: "01", title: "Secure Login", desc: "Authenticate via magic link. The system automatically registers you and verifies your credentials against the central DB." },
  { num: "02", title: "Auto-Assignment", desc: "Based on predefined company logic, you are instantly routed to your specific Executive, Manager, or Employee dashboard." },
  { num: "03", title: "Real-Time Tracking", desc: "Begin clocking hours, reviewing attendance sheets, or viewing organization-wide analytics without any setup delay." }
];

export async function getLandingContent() {
  const content = await prisma.landingContent.findFirst()
  
  if (!content) {
    // Seed default content if it doesn't exist
    const defaultContent = await prisma.landingContent.create({
      data: {
        features: defaultFeatures,
        workflow: defaultWorkflow
      }
    })
    return defaultContent
  }
  
  // Ensure arrays are returned even if they were null in DB
  if (!content.features || (Array.isArray(content.features) && content.features.length === 0)) {
    content.features = defaultFeatures;
  }
  if (!content.workflow || (Array.isArray(content.workflow) && content.workflow.length === 0)) {
    content.workflow = defaultWorkflow;
  }

  return content
}

export async function updateLandingContent(data: {
  heroTitleLine1: string;
  heroTitleGradient: string;
  heroSubtitle: string;
  features?: string;
  workflow?: string;
}) {
  const parsedData: any = {
    heroTitleLine1: data.heroTitleLine1,
    heroTitleGradient: data.heroTitleGradient,
    heroSubtitle: data.heroSubtitle,
  };

  if (data.features) parsedData.features = JSON.parse(data.features);
  if (data.workflow) parsedData.workflow = JSON.parse(data.workflow);

  const existing = await prisma.landingContent.findFirst()
  
  if (existing) {
    await prisma.landingContent.update({
      where: { id: existing.id },
      data: parsedData
    })
  } else {
    await prisma.landingContent.create({
      data: parsedData
    })
  }
  
  // Revalidate the landing page so it reflects the changes immediately
  revalidatePath('/')
}
