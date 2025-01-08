'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const HoverEffect = ({
  items,
  className,
}: {
  items: { id: number; name: string }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item, idx) => (
        <div
          key={item?.id}
          className='relative group cursor-pointer'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 bg-white/10 rounded-full'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className='px-2 py-1 backdrop-blur-sm rounded-full text-sm relative z-20 border-[0.5px] border-gray-500/50'>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};
