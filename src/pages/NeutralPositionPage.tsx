import SectionWrapper from '../components/SectionWrapper';
import PageHeader from '../components/PageHeader';
import PlaceholderResultCard from '../components/PlaceholderResultCard';
import CtaBlock from '../components/CtaBlock';

const CTAS = [
  { to: '/', title: 'Text Analysis', description: 'Analyze new text' },
  { to: '/bias-score', title: 'Bias Score', description: 'View score' },
];

export default function NeutralPositionPage() {
  return (
    <SectionWrapper>
      <PageHeader
        title="Neutral Position"
        subtitle="A more neutral framing of the same content, so you can compare the original text with a less biased version."
      />

      <PlaceholderResultCard title="Neutral rewrite" className="mb-4">
        <div
          className="p-4 rounded border"
          style={{
            minHeight: '8rem',
            background: 'var(--cbd-bg-subtle)',
            borderColor: 'var(--cbd-border)',
            color: 'var(--cbd-text-muted)',
          }}
        >
          Your neutral rewrite will appear here.
        </div>
      </PlaceholderResultCard>

      <CtaBlock title="Next steps" links={CTAS} largeTitles />
    </SectionWrapper>
  );
}
