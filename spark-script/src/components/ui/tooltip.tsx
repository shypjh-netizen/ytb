import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

// Since we didn't install radix, we might need to mock this or use a simple CSS one.
// Wait, I cannot use radix if I didn't install it in package.json.
// I listed lucide-react, framer-motion, clsx, tailwind-merge.
// I did NOT list radix-ui.
// I should build a simple custom tooltip using Framer Motion to avoid dependency issues since I cannot run npm install.

import { motion, AnimatePresence } from "framer-motion"

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 px-3 py-1.5 min-w-max text-xs text-white bg-gray-800 rounded-md shadow-md -top-10 left-1/2 -translate-x-1/2"
                    >
                        {content}
                        <div className="absolute top-full left-1/2 -ml-1 -mt-px border-4 border-transparent border-t-gray-800" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
