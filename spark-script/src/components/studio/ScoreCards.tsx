import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { Zap, TrendingUp, Anchor, MessageCircle } from 'lucide-react';

const scores = [
    { id: 'hook', label: '후킹 지수', score: 92, icon: Anchor, color: 'text-blue-400', desc: '초반 5초 이탈률 방어력' },
    { id: 'flow', label: '전개 속도', score: 85, icon: Zap, color: 'text-yellow-400', desc: '지루할 틈 없는 전개' },
    { id: 'emotion', label: '감정 고점', score: 78, icon: TrendingUp, color: 'text-red-400', desc: '시청자의 감정 동요 유발' },
    { id: 'cta', label: '참여 유도', score: 88, icon: MessageCircle, color: 'text-green-400', desc: '댓글/구독 유도 장치' },
];

export function ScoreCards() {
    return (
        <div className="grid grid-cols-2 gap-3 mb-6">
            {scores.map((item, i) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                >
                    <Card className="border-border/50 bg-surface/50 overflow-hidden relative group">
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium text-textSecondary flex items-center gap-2">
                                <item.icon className={`w-4 h-4 ${item.color}`} />
                                {item.label}
                            </CardTitle>
                            <Tooltip content={item.desc}>
                                <Badge variant={item.score >= 90 ? "default" : item.score >= 80 ? "success" : "secondary"}>
                                    {item.score}
                                </Badge>
                            </Tooltip>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="h-2 w-full bg-surfaceHighlight rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    className={`h-full ${item.score >= 90 ? 'bg-primary' : 'bg-emerald-500'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.score}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
