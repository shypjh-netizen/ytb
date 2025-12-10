import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-white shadow hover:bg-primary/80",
                secondary:
                    "border-transparent bg-surfaceHighlight text-white hover:bg-gray-600",
                destructive:
                    "border-transparent bg-red-900 text-red-100 shadow hover:bg-red-900/80",
                outline: "text-textMain border-border",
                success: "border-transparent bg-emerald-900 text-emerald-100 hover:bg-emerald-800",
                warning: "border-transparent bg-amber-900 text-amber-100 hover:bg-amber-800",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
