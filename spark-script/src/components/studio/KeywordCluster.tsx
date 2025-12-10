import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';

interface Node {
    id: string;
    label: string;
    size: 'lg' | 'md' | 'sm';
    x: number;
    y: number;
    color?: string;
    score?: number;
}

export function KeywordCluster({ isAnalyzing }: { isAnalyzing: boolean }) {
    const [nodes, setNodes] = useState<Node[]>([]);

    // Simulate data generation
    useEffect(() => {
        if (!isAnalyzing) {
            setNodes([
                { id: 'core', label: '수익화', size: 'lg', x: 50, y: 50, color: 'bg-primary' },
                { id: '1', label: '유튜브', size: 'md', x: 20, y: 30, score: 85 },
                { id: '2', label: '알고리즘', size: 'md', x: 80, y: 30, score: 92 },
                { id: '3', label: '부업', size: 'sm', x: 30, y: 70, score: 78 },
                { id: '4', label: '자동화', size: 'sm', x: 70, y: 70, score: 88 },
                { id: '5', label: 'AI', size: 'sm', x: 50, y: 20 },
            ]);
        }
    }, [isAnalyzing]);

    if (isAnalyzing) {
        return (
            <div className="flex items-center justify-center h-64 bg-surfaceHighlight/50 rounded-xl animate-pulse">
                <span className="text-textSecondary">분석 중...</span>
            </div>
        );
    }

    return (
        <div className="relative w-full h-64 bg-surfaceHighlight/30 rounded-xl overflow-hidden border border-border/50">
            {nodes.map((node, i) => (
                <motion.div
                    key={node.id}
                    className={cn(
                        "absolute flex items-center justify-center rounded-full shadow-lg cursor-pointer border border-white/10 backdrop-blur-sm transition-colors hover:z-10",
                        node.size === 'lg' ? "w-24 h-24 text-lg font-bold" :
                            node.size === 'md' ? "w-16 h-16 text-sm font-medium" : "w-12 h-12 text-xs",
                        node.color || "bg-surface hover:bg-surfaceHighlight"
                    )}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        x: "-50%",
                        y: "-50%"
                    }}
                    transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 100,
                        delay: i * 0.1
                    }}
                    whileHover={{ scale: 1.1 }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Simple elastic drag
                >
                    <Tooltip content={node.score ? `연관도: ${node.score}` : "Core Topic"}>
                        <span className="text-white text-center px-1">{node.label}</span>
                    </Tooltip>
                </motion.div>
            ))}

            {/* Connecting lines - simplified for MVP (just visual decoration) */}
            <svg className="absolute inset-0 pointer-events-none opacity-20">
                <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="gray" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="gray" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="gray" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="gray" strokeWidth="1" />
            </svg>
        </div>
    );
}
