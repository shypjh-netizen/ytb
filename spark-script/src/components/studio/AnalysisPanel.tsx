import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { KeywordCluster } from './KeywordCluster';
import { RecommendationCards } from './RecommendationCards';
import { ScoreCards } from './ScoreCards';
import { WeeklyArchive } from './WeeklyArchive';
import { Loader2, Sparkles, BrainCircuit } from 'lucide-react';

interface AnalysisPanelProps {
    onAnalyze: () => void;
    isAnalyzing: boolean;
    hasResult: boolean;
}

export function AnalysisPanel({ onAnalyze, isAnalyzing, hasResult }: AnalysisPanelProps) {
    const [showDetailedResult, setShowDetailedResult] = useState(false);

    useEffect(() => {
        if (hasResult) {
            // 1초 뒤에 상세 결과 노출 (Stagger)
            const timer = setTimeout(() => setShowDetailedResult(true), 100);
            return () => clearTimeout(timer);
        } else {
            setShowDetailedResult(false);
        }
    }, [hasResult]);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-primary" />
                    Analysis Lab
                </h2>
                {hasResult && (
                    <span className="text-xs text-textSecondary animate-fade-in">
                        분석 완료: 0.8초 소요
                    </span>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">

                {/* State: IDLE (Not analyzing, No result) */}
                {!hasResult && !isAnalyzing && (
                    <>
                        <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4 opacity-50">
                            <Sparkles className="w-16 h-16 text-textSecondary/20" />
                            <p className="text-textSecondary">
                                좌측 에디터에 대본을 입력하고<br />
                                <strong className="text-primary">분석 시작</strong>을 눌러주세요.
                            </p>
                        </div>
                        <div className="opacity-80">
                            <WeeklyArchive />
                        </div>
                    </>
                )}

                {/* State: ANALYZING */}
                {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="text-textSecondary animate-pulse">
                            대본 구조를 해부하는 중...
                        </p>
                    </div>
                )}

                {/* State: RESULT */}
                {hasResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Quick Preview Section */}
                        <div className="bg-surfaceHighlight/30 p-4 rounded-lg mb-6 border-l-2 border-primary">
                            <h3 className="text-sm font-semibold text-white mb-1">⚡ Quick Insight</h3>
                            <p className="text-sm text-textSecondary">
                                "초반 3초 후킹은 훌륭하지만, 중반부(1:30) 이탈 위험이 감지됩니다."
                            </p>
                        </div>

                        {/* Keyword Cluster */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-textSecondary mb-3 uppercase tracking-wider">Topic Cluster</h3>
                            <KeywordCluster isAnalyzing={false} />
                        </div>

                        {/* Score Cards */}
                        <AnimatePresence>
                            {showDetailedResult && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h3 className="text-sm font-bold text-textSecondary mb-3 uppercase tracking-wider">Performance Score</h3>
                                    <ScoreCards />

                                    <h3 className="text-sm font-bold text-textSecondary mb-3 uppercase tracking-wider">Next Viral Topics</h3>
                                    <RecommendationCards />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Footer Action */}
            <div className="pt-4 mt-auto border-t border-border">
                <Button
                    size="lg"
                    className="w-full text-lg font-bold shadow-xl shadow-primary/10"
                    onClick={onAnalyze}
                    isLoading={isAnalyzing}
                >
                    {hasResult ? "다시 분석하기" : "떡상 구조 분석 시작"}
                </Button>
            </div>
        </div>
    );
}
