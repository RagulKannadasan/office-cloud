import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getLandingContent, updateLandingContent } from '@/actions/admin.actions';
import EditableHero from '@/components/admin/EditableHero';
import EditableFeaturesGrid from '@/components/admin/EditableFeaturesGrid';
import EditableWorkflow from '@/components/admin/EditableWorkflow';

export default async function AdminPanelPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  
  if (!token) redirect('/login');
  
  const user: any = await verifyToken(token);
  if (!user || !user.id) redirect('/login');

  const role = user.role || 'employee';

  if (role !== 'manager' && role !== 'ceo') {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--danger-color)' }}>Restricted Access</h2>
        <p style={{ color: 'var(--text-secondary)' }}>App Admin Panel requires CEO or Manager privileges.</p>
        <Link href="/dashboard" className="btn" style={{ marginTop: '2rem' }}>Back to Dashboard</Link>
      </div>
    );
  }

  const content = await getLandingContent();

  async function handleUpdate(formData: FormData) {
    'use server'
    const heroTitleLine1 = formData.get('heroTitleLine1') as string;
    const heroTitleGradient = formData.get('heroTitleGradient') as string;
    const heroSubtitle = formData.get('heroSubtitle') as string;
    const features = formData.get('features') as string;
    const workflow = formData.get('workflow') as string;

    await updateLandingContent({
      heroTitleLine1,
      heroTitleGradient,
      heroSubtitle,
      features,
      workflow
    });
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px' }}>
      <nav style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>App Admin Panel</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage core application settings and public site content.</p>
        </div>
        <Link href="/dashboard" className="btn btn-outline">Back to Dashboard</Link>
      </nav>

      <form action={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 50, marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Visual CMS Editor</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Click directly on any text below to seamlessly edit your Landing Page copy.</p>
          </div>
          <button type="submit" className="btn" style={{ padding: '0.75rem 2rem' }}>
            Publish Live
          </button>
        </div>

        <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          <EditableHero initialContent={content as any} />
          <EditableFeaturesGrid initialFeatures={content.features as any[]} />
          <EditableWorkflow initialWorkflow={content.workflow as any[]} />
        </div>
      </form>
    </div>
  );
}
