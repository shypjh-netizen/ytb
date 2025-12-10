import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ScriptEditorProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function ScriptEditor({ value, onChange, disabled }: ScriptEditorProps) {
    const [lines, setLines] = useState(1);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Update line count
        const lineCount = value.split('\n').length;
        setLines(Math.max(lineCount, 15)); // Minimum 15 lines visually
    }, [value]);

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        // Sync scroll with line numbers if we had a separate container, 
        // but here we might just let them sit side-by-side.
    };

    return (
        <div className="relative flex h-full min-h-[500px] w-full rounded-xl overflow-hidden border border-border bg-surface font-mono text-sm shadow-inner group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            {/* Gutter */}
            <div className="flex-none w-12 py-4 text-right bg-[#181818] text-gray-600 border-r border-[#252525] select-none">
                {Array.from({ length: lines }).map((_, i) => (
                    <div key={i} className="px-3 leading-6">
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Editor Area */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onScroll={handleScroll}
                disabled={disabled}
                className="flex-1 w-full h-full p-4 bg-transparent outline-none resize-none leading-6 text-gray-200 placeholder:text-gray-700 disabled:opacity-50"
                placeholder="여기에 대본을 입력하세요... (Ctrl+V)"
                spellCheck={false}
            />

            {/* Status Bar / Overlay */}
            <div className="absolute bottom-4 right-4 pointer-events-none">
                <motion.div
                    className="bg-black/80 backdrop-blur text-white text-xs px-2 py-1 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: value.length > 0 ? 1 : 0 }}
                >
                    {value.length}자
                </motion.div>
            </div>
        </div>
    );
}
