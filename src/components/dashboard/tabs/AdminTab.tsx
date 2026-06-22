'use client';

import { useState } from 'react';
import { updateLandingContent } from '@/actions/admin.actions';
import { SubmitButton } from '@/components/ui/SubmitButton';
import EditableHero from '@/components/admin/EditableHero';
import EditableFeaturesGrid from '@/components/admin/EditableFeaturesGrid';
import EditableWorkflow from '@/components/admin/EditableWorkflow';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function AdminTab({ data }: { data: any }) {
  const { role, landingContent } = data;
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  if (role !== 'manager' && role !== 'ceo') {
    return null;
  }

  if (!landingContent) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ marginBottom: '1rem', animation: 'pulse 2s infinite' }}>Loading CMS Editor...</div>
      </div>
    );
  }

  async function handleUpdate(formData: FormData) {
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
    // We should ideally show a toast here in an SPA
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPendingFormData(new FormData(e.currentTarget));
    setConfirmModalIsOpen(true);
  };

  const confirmPublish = async () => {
    if (pendingFormData) {
      await handleUpdate(pendingFormData);
    }
    setConfirmModalIsOpen(false);
  };

  return (
    <div style={{ padding: '1rem 0', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>App Admin Panel</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage core application settings and public site content.</p>
      </div>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 50, marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Visual CMS Editor</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Click directly on any text below to seamlessly edit your Landing Page copy.</p>
          </div>
          <SubmitButton type="submit" className="btn" style={{ padding: '0.75rem 2rem' }} pendingText="Publishing...">
            Publish Live
          </SubmitButton>
        </div>

        <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          <EditableHero initialContent={landingContent as any} />
          <EditableFeaturesGrid initialFeatures={landingContent.features as any[]} />
          <EditableWorkflow initialWorkflow={landingContent.workflow as any[]} />
        </div>
      </form>

      <ConfirmModal 
        isOpen={confirmModalIsOpen}
        title="Publish Live Changes"
        message="Are you sure you want to publish these changes? This will immediately update the public-facing landing page for all visitors."
        confirmText="Yes, Publish"
        cancelText="Cancel"
        onConfirm={confirmPublish}
        onCancel={() => setConfirmModalIsOpen(false)}
      />
    </div>
  );
}
