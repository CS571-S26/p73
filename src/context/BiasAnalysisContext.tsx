import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AnalysisStatus } from '../analysisStatus';

/**
 * Shared analysis UI + score so route changes do not reset the Text Analysis flow.
 * Extend later with highlights, explanations, neutral rewrite, RAG metadata, etc.
 */
export type BiasAnalysisContextValue = {
  analysisText: string;
  setAnalysisText: (value: string) => void;
  analysisStatus: AnalysisStatus;
  setAnalysisStatus: (status: AnalysisStatus) => void;
  analysisError: string | null;
  setAnalysisError: (message: string | null) => void;
  biasScore: number | null;
  setBiasScore: (score: number) => void;
};

const BiasAnalysisContext = createContext<BiasAnalysisContextValue | null>(null);

export function BiasAnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisText, setAnalysisText] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [biasScore, setBiasScore] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      analysisText,
      setAnalysisText,
      analysisStatus,
      setAnalysisStatus,
      analysisError,
      setAnalysisError,
      biasScore,
      setBiasScore,
    }),
    [analysisText, analysisStatus, analysisError, biasScore],
  );

  return <BiasAnalysisContext.Provider value={value}>{children}</BiasAnalysisContext.Provider>;
}

export function useBiasAnalysis() {
  const ctx = useContext(BiasAnalysisContext);
  if (!ctx) {
    throw new Error('useBiasAnalysis must be used within BiasAnalysisProvider');
  }
  return ctx;
}
