'use client';

import { useFormStatus } from 'react-dom';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pendingText?: string;
}

export function SubmitButton({ children, pendingText, className = "btn", ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button 
      disabled={pending} 
      className={className} 
      {...props}
      style={{
        ...props.style,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        opacity: pending ? 0.7 : 1,
        cursor: pending ? 'not-allowed' : 'pointer',
      }}
    >
      {pending && <span className="spinner"></span>}
      {pending && pendingText ? pendingText : children}
    </button>
  );
}
