import { ReactNode } from 'react';

interface HeroProps {
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export default function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <div className="text-center py-5 py-md-6">
      <h1 className="display-5 fw-semibold mb-3">{title}</h1>
      {subtitle && <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '36rem' }}>{subtitle}</p>}
      {children}
    </div>
  );
}
