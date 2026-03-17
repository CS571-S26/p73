import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ButtonLinkCardProps {
  to: string;
  title: string;
  description?: string;
  /** When true, shows the page name in large text (for Next steps sections) */
  large?: boolean;
}

export default function ButtonLinkCard({ to, title, description, large }: ButtonLinkCardProps) {
  return (
    <Card
      as={Link}
      to={to}
      className={`card-cbd text-decoration-none h-100 transition-shadow ${large ? 'card-cbd-large' : ''}`}
      style={{ transition: 'box-shadow 0.2s ease' }}
    >
      <Card.Body className={large ? 'py-4' : ''}>
        <Card.Title
          as="h3"
          className={large ? 'next-step-page-name mb-2' : 'h6 fw-semibold mb-1'}
        >
          {title}
        </Card.Title>
        {description && (
          <Card.Text className={large ? 'text-muted mb-2' : 'text-muted small mb-2'}>
            {description}
          </Card.Text>
        )}
        <span className={`text-primary fw-medium ${large ? 'next-step-arrow-link' : 'small'}`}>
          Go to page →
        </span>
      </Card.Body>
    </Card>
  );
}
