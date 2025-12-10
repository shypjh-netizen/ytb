import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export function WeeklyArchive() {
    const history = [
        { id: 1, title: '유튜브 수익화 3단계', date: '2일 전', score: 92 },
        { id: 2, title: '직장인 부업 현실', date: '5일 전', score: 85 },
        { id: 3, title: 'AI 툴 비교 분석', date: '1주일 전', score: 88 },
    ];

    return (
        <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Weekly Routine
                </h3>
            </div>

            <div className="space-y-3 mb-4">
                {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-surface hover:bg-surfaceHighlight transition-colors cursor-pointer text-sm group">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`w-1.5 h-1.5 rounded-full ${item.score >= 90 ? 'bg-primary' : 'bg-gray-500'}`} />
                            <span className="truncate text-gray-300 group-hover:text-white">{item.title}</span>
                        </div>
                        <span className="text-xs text-textSecondary whitespace-nowrap">{item.date}</span>
                    </div>
                ))}
            </div>

            <Button variant="secondary" className="w-full text-xs" size="sm">
                <Clock className="mr-2 w-3 h-3" />
                이번 주 루틴 시작 (+3일 남음)
            </Button>
        </div>
    );
}
