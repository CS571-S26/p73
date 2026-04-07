import { Button } from 'react-bootstrap';

export type AnalysisStatus = 'idle' | 'loading' | 'success';

type AnalyzeTextButtonProps = {
  status: AnalysisStatus;
  onAnalyze: () => void;
};

export default function AnalyzeTextButton({ status, onAnalyze }: AnalyzeTextButtonProps) {
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  return (
    <Button
      type="button"
      variant="primary"
      size="lg"
      className={`btn-cbd-analyze ${isLoading ? 'btn-cbd-analyze--loading' : ''} ${isSuccess ? 'btn-cbd-analyze--success' : ''}`}
      disabled={isLoading || isSuccess}
      aria-busy={isLoading}
      onClick={onAnalyze}
    >
      {isLoading ? (
        <span className="btn-cbd-analyze__inner">
          <span className="btn-cbd-analyze__label">Analyzing Text</span>
          <span className="btn-cbd-analyze__dots" aria-hidden="true">
            <span className="btn-cbd-analyze__dot" />
            <span className="btn-cbd-analyze__dot" />
            <span className="btn-cbd-analyze__dot" />
          </span>
        </span>
      ) : isSuccess ? (
        <span className="btn-cbd-analyze__inner btn-cbd-analyze__inner--success">
          <span className="btn-cbd-analyze__success-icon" aria-hidden="true">
            <svg className="btn-cbd-analyze__check-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="btn-cbd-analyze__check-circle" cx="12" cy="12" r="10" />
              <path className="btn-cbd-analyze__check-path" d="M8 12l2.5 2.5L16 9" />
            </svg>
          </span>
          <span className="btn-cbd-analyze__label">Analysis Complete</span>
        </span>
      ) : (
        <span className="btn-cbd-analyze__label">Analyze Text</span>
      )}
    </Button>
  );
}
