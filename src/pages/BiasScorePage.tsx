import SectionWrapper from '../components/SectionWrapper';
import PageHeader from '../components/PageHeader';
import PlaceholderResultCard from '../components/PlaceholderResultCard';
import SemicircleGauge from '../components/SemicircleGauge';
import CtaBlock from '../components/CtaBlock';

const CTAS = [
  { to: '/', title: 'Text Analysis', description: 'Analyze new text' },
  { to: '/neutral-position', title: 'Neutral Position', description: 'View neutral rewrite' },
];

export default function BiasScorePage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Bias Score"
        subtitle="A single score indicating how biased the framing of the analyzed text may be. Lower values suggest more neutral framing; higher values suggest stronger bias."
      />

      <PlaceholderResultCard title="Score" className="mb-4">
        <div className="d-flex flex-column align-items-center py-3">
          <SemicircleGauge value={45} size={220} strokeWidth={16} />
        </div>
      </PlaceholderResultCard>

      <CtaBlock title="Next steps" links={CTAS} largeTitles />
    </SectionWrapper>
  );
}
