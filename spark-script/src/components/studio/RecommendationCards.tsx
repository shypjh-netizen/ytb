import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function RecommendationCards() {
    const ideas = [
        {
            title: "일주일에 3시간 투자해서 월 100버는 법",
            hook: "이 영상을 보기 전까지 당신은 시간을 버리고 있었습니다.",
            tags: ["부업", "효율", "자동화"]
        },
        {
            title: "초보 유튜버가 가장 많이 하는 실수 TOP 3",
            hook: "당신의 채널이 안 크는 이유는 바로 '이것' 때문입니다.",
            tags: ["유튜브꿀팁", "실패분석"]
        },
        {
            title: "AI로 대본 1분만에 쓰는 비법 공개",
            hook: "더 이상 대본 때문에 밤새지 마세요.",
            tags: ["AI", "ChatGPT", "생산성"]
        }
    ];

    return (
        <div className="space-y-4">
            {ideas.map((idea, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.15) }}
                >
                    <Card className="hover:border-primary/50 transition-colors group cursor-pointer bg-surface/50">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-base group-hover:text-primary transition-colors">
                                    {idea.title}
                                </CardTitle>
                                <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-sm text-textSecondary italic">"{idea.hook}"</p>
                            <div className="flex gap-2 mt-3">
                                {idea.tags.map(tag => (
                                    <span key={tag} className="text-xs text-gray-500 bg-black/20 px-2 py-0.5 rounded">#{tag}</span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 justify-end">
                            <Button variant="ghost" size="sm" className="text-xs group-hover:translate-x-1 transition-transform">
                                대본 생성하기 <ArrowRight className="ml-1 w-3 h-3" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
