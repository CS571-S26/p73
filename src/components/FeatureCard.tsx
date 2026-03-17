import { Card } from 'react-bootstrap';

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Card className="card-cbd h-100">
      <Card.Body>
        <Card.Title as="h3" className="h5 fw-semibold mb-2">
          {title}
        </Card.Title>
        <Card.Text className="text-muted small mb-0">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
