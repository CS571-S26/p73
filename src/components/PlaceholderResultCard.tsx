import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface PlaceholderResultCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function PlaceholderResultCard({
  title,
  children,
  className = '',
}: PlaceholderResultCardProps) {
  return (
    <Card className={`card-cbd ${className}`}>
      {title && (
        <Card.Header className="bg-transparent border-bottom fw-semibold">
          {title}
        </Card.Header>
      )}
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
