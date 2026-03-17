import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className = '' }: SectionWrapperProps) {
  return (
    <section className={`py-4 py-md-5 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
