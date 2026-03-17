import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-4">
      <h1 className="h2 mb-2">{title}</h1>
      {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
    </header>
  );
}
