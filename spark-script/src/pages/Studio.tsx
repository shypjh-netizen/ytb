import { useState, useEffect } from 'react';
import { ScriptEditor } from '@/components/studio/ScriptEditor';
import { AnalysisPanel } from '@/components/studio/AnalysisPanel';
import { motion } from 'framer-motion';

export default function StudioPage() {
    const [script, setScript] = useState(() => localStorage.getItem('spark_script_draft') || '');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hasResult, setHasResult] = useState(false);

    // Persistence
    useEffect(() => {
        localStorage.setItem('spark_script_draft', script);
    }, [script]);

    const handleAnalyze = () => {
        if (!script.trim()) return;

        setIsAnalyzing(true);
        setHasResult(false);

        // Mock Analysis Delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setHasResult(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background text-textMain font-sans flex flex-col">
            {/* Top Bar */}
            <header className="h-16 border-b border-border flex items-center px-6 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
                        S
                    </div>
                    <span className="font-bold text-lg tracking-tight">SparkScript</span>
                    <span className="text-xs text-textSecondary px-2 py-0.5 rounded bg-surfaceHighlight border border-border ml-2">Beta</span>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    {/* Placeholder for User Profile */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 border border-gray-500"></div>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-64px)] overflow-hidden">

                {/* Left Column: Editor (60% on large screens) */}
                <motion.section
                    className="lg:col-span-7 h-full flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-lg font-semibold text-textSecondary">Script Editor</h2>
                        <div className="text-xs text-textSecondary">자동 저장됨</div>
                    </div>
                    <div className="flex-1 overflow-hidden rounded-xl shadow-2xl shadow-black/20">
                        <ScriptEditor
                            value={script}
                            onChange={setScript}
                            disabled={isAnalyzing}
                        />
                    </div>
                </motion.section>

                {/* Right Column: Analysis (40% on large screens) */}
                <motion.section
                    className="lg:col-span-5 h-full bg-surface/30 rounded-xl border border-border/50 p-6 shadow-xl backdrop-blur-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AnalysisPanel
                        onAnalyze={handleAnalyze}
                        isAnalyzing={isAnalyzing}
                        hasResult={hasResult}
                    />
                </motion.section>

            </main>
        </div>
    );
}
