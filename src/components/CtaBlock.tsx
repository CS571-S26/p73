import { ReactNode } from 'react';
import { Row, Col } from 'react-bootstrap';
import ButtonLinkCard from './ButtonLinkCard';

interface CtaLink {
  to: string;
  title: string;
  description?: string;
}

interface CtaBlockProps {
  title?: string;
  links: CtaLink[];
  children?: ReactNode;
  /** When true, cards show the page name in large text */
  largeTitles?: boolean;
}

export default function CtaBlock({ title = 'Explore', links, children, largeTitles }: CtaBlockProps) {
  return (
    <div className="mt-4">
      {title && <h2 className="h5 fw-semibold mb-3">{title}</h2>}
      <Row xs={1} md={links.length} className="g-3">
        {links.map((link) => (
          <Col key={link.to}>
            <ButtonLinkCard {...link} large={largeTitles} />
          </Col>
        ))}
      </Row>
      {children}
    </div>
  );
}
