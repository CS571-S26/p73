import { useEffect, useRef, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import AnalyzeTextButton, { type AnalysisStatus } from '../components/AnalyzeTextButton';
import SectionWrapper from '../components/SectionWrapper';
import Hero from '../components/Hero';
import NextStepCta from '../components/NextStepCta';

const ANALYSIS_DELAY_MS = 3000;

export default function TextAnalysisPage() {
  const [text, setText] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [emptySubmitHint, setEmptySubmitHint] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTextChange = (value: string) => {
    setText(value);
    if (analysisStatus === 'success') {
      setAnalysisStatus('idle');
    }
    if (emptySubmitHint) {
      setEmptySubmitHint(false);
    }
  };

  /**
   * Placeholder flow — swap this for a real async API call later
   * (e.g. await fetch(...) or an OpenAI client) and map errors to UI state.
   */
  const handleAnalyze = () => {
    if (analysisStatus === 'loading') {
      return;
    }
    if (analysisStatus === 'success') {
      return;
    }
    if (!text.trim()) {
      setEmptySubmitHint(true);
      return;
    }

    setEmptySubmitHint(false);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    setAnalysisStatus('loading');
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setAnalysisStatus('success');
    }, ANALYSIS_DELAY_MS);
  };

  return (
    <>
      <SectionWrapper className="bg-winter-subtle">
        <Hero
          title="Cognitive Bias Detector"
          subtitle="Paste text below to analyze its framing and see how bias and neutral rewrites can help you read with clarity."
        />
      </SectionWrapper>

      <SectionWrapper>
        <div className="visually-hidden" aria-live="polite" aria-atomic="true">
          {analysisStatus === 'loading' ? 'Analyzing text. Please wait.' : null}
          {analysisStatus === 'success' ? 'Analysis complete.' : null}
        </div>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="analysis-text">Text to analyze</Form.Label>
            <Form.Control
              id="analysis-text"
              as="textarea"
              rows={6}
              placeholder="Paste or type the text you want to analyze here…"
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              aria-invalid={emptySubmitHint}
              aria-describedby={emptySubmitHint ? 'analysis-text-hint' : undefined}
            />
          </Form.Group>
          {emptySubmitHint ? (
            <p id="analysis-text-hint" className="small text-muted mb-3" role="status">
              Add text to run analysis. The button stays available once you have entered something to
              analyze.
            </p>
          ) : null}
          <AnalyzeTextButton status={analysisStatus} onAnalyze={handleAnalyze} />
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
