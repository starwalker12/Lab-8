"use client";

import { memo } from 'react';
import { cn } from '@/lib/utils';

interface BitProps {
    bit: 0 | 1;
    onClick: () => void;
}

export const Bit = memo(({ bit, onClick }: BitProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center justify-center w-8 h-10 rounded-md text-lg font-mono transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary",
                bit === 1 ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground'
            )}
        >
            {bit}
        </button>
    );
});

Bit.displayName = 'Bit';
