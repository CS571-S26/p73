import { Link } from 'react-router-dom';

interface NextStepCtaProps {
  to: string;
  title: string;
  description: string;
  variant: 'ice' | 'slate';
}

export default function NextStepCta({
  to,
  title,
  description,
  variant,
}: NextStepCtaProps) {
  return (
    <Link
      to={to}
      className={`next-step-cta next-step-cta-${variant} d-block text-decoration-none`}
    >
      <span className="next-step-title">{title}</span>
      <p className="next-step-desc">{description}</p>
      <span className="next-step-arrow">View →</span>
    </Link>
  );
}
