import SectionWrapper from '../components/SectionWrapper';
import PageHeader from '../components/PageHeader';
import PlaceholderResultCard from '../components/PlaceholderResultCard';
import SemicircleGauge from '../components/SemicircleGauge';
import CtaBlock from '../components/CtaBlock';
import { useBiasAnalysis } from '../context/BiasAnalysisContext';

const CTAS = [
  { to: '/', title: 'Text Analysis', description: 'Analyze new text' },
  { to: '/neutral-position', title: 'Neutral Position', description: 'View neutral rewrite' },
];

export default function BiasScorePage() {
  const { biasScore } = useBiasAnalysis();
  const hasScore = biasScore !== null;

  return (
    <SectionWrapper>
      <PageHeader
        title="Bias Score"
        subtitle="A single score indicating how biased the framing of the analyzed text may be. Lower values suggest more neutral framing; higher values suggest stronger bias."
      />

      <PlaceholderResultCard title="Score" className="mb-4">
        {hasScore ? (
          <div
            className="d-flex flex-column align-items-center py-3"
            role="img"
            aria-label={`Cognitive bias severity score: ${Math.round(biasScore)} out of 100`}
          >
            <SemicircleGauge
              value={biasScore}
              size={220}
              strokeWidth={16}
              animateEntrance
            />
          </div>
        ) : (
          <p className="text-muted mb-0 py-4 text-center" role="status">
            No analysis yet. Run <strong className="text-light">Analyze Text</strong> on the Text
            Analysis page to generate a bias score.
          </p>
        )}
      </PlaceholderResultCard>

      <CtaBlock title="Next steps" links={CTAS} largeTitles />
    </SectionWrapper>
  );
}
