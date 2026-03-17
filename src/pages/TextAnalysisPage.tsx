import { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import SectionWrapper from '../components/SectionWrapper';
import Hero from '../components/Hero';
import NextStepCta from '../components/NextStepCta';

export default function TextAnalysisPage() {
  const [text, setText] = useState('');

  return (
    <>
      <SectionWrapper className="bg-winter-subtle">
        <Hero
          title="Cognitive Bias Detector"
          subtitle="Paste text below to analyze its framing and see how bias and neutral rewrites can help you read with clarity."
        />
      </SectionWrapper>

      <SectionWrapper>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="analysis-text">Text to analyze</Form.Label>
            <Form.Control
              id="analysis-text"
              as="textarea"
              rows={6}
              placeholder="Paste or type the text you want to analyze here…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Button type="button" variant="primary" className="btn-cbd-primary" size="lg">
            Analyze Text
          </Button>
        </Form>

        <div className="mt-5 pt-2">
          <h2 className="h5 fw-semibold mb-3" style={{ color: 'var(--cbd-text)' }}>
            After analyzing
          </h2>
          <Row xs={1} md={2} className="g-4">
            <Col>
              <NextStepCta
                to="/bias-score"
                title="Bias Score"
                description="See how biased the framing is on a clear scale."
                variant="ice"
              />
            </Col>
            <Col>
              <NextStepCta
                to="/neutral-position"
                title="Neutral Position"
                description="Read a more neutral version of the same content."
                variant="slate"
              />
            </Col>
          </Row>
        </div>
      </SectionWrapper>
    </>
  );
}
