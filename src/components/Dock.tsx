'use client';

import React, { useState, useEffect } from 'react';
import { useSpring, useSprings } from '@react-spring/web';
import Link from 'next/link';
import MyAnimatedDiv from './MyAnimatedDiv';

interface DockItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  size?: number;
}

export interface DockProps {
  position?: 'bottom' | 'top' | 'left' | 'right';
  collapsible?: boolean;
  responsive?: 'bottom' | 'top' | 'left' | 'right';
  items: DockItem[];
  size?: number;
}

const Dock: React.FC<DockProps> = ({
  position = 'bottom',
  collapsible = false,
  responsive = 'bottom',
  items,
  size = 24,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isDockVisible, setDockVisible] = useState<boolean>(!collapsible);
  const [currentPosition, setCurrentPosition] = useState<
    'bottom' | 'top' | 'left' | 'right'
  >(position);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleParentMouseEnter = () => {
    if (collapsible) {
      setDockVisible(true);
    }
  };

  const handleParentMouseLeave = () => {
    if (collapsible) {
      setDockVisible(false);
    }
  };

  useEffect(() => {
    const updatePosition = () => {
      if (responsive && window.innerWidth <= 768) {
        setCurrentPosition(responsive);
      } else {
        setCurrentPosition(position);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [position, responsive]);

  /**
   * Returns a simple style object for controlling
   * the main Dock flex direction.
   */
  const getDockStyle = (): React.CSSProperties => {
    const isVertical =
      currentPosition === 'left' || currentPosition === 'right';
    return { flexDirection: isVertical ? 'column' : 'row' };
  };

  /**
   * Returns the Tailwind classes for positioning the container
   * based on the current dock position.
   */
  const getContainerClasses = (pos: 'bottom' | 'top' | 'left' | 'right') => {
    switch (pos) {
      case 'left':
        return 'items-center';
      case 'right':
        return 'justify-end';
      case 'top':
        return 'justify-center items-start';
      case 'bottom':
        return 'justify-center items-end';
      default:
        return '';
    }
  };

  const springs = useSprings(
    items.length,
    items.map((_, index) => {
      const translateValue =
        hoverIndex === index
          ? currentPosition === 'left'
            ? 'translateX(5px) translateY(0px)'
            : currentPosition === 'right'
            ? 'translateX(-5px) translateY(0px)'
            : currentPosition === 'top'
            ? 'translateX(0px) translateY(5px)'
            : 'translateX(0px) translateY(-5px)'
          : 'translateX(0px) translateY(0px)';

      return {
        transform:
          hoverIndex === index
            ? `scale(1.5) ${translateValue}`
            : hoverIndex !== null && Math.abs(hoverIndex - index) === 1
            ? `scale(1.3) translateX(0px) translateY(0px)`
            : `scale(1) translateX(0px) translateY(0px)`,
        config: { tension: 200, friction: 15 },
      };
    })
  );

  const visibilitySpring = useSpring({
    opacity: isDockVisible ? 1 : 0,
    config: { tension: 120, friction: 14 },
  });

  return (
    <div
      className={`flex ${getContainerClasses(currentPosition)}`}
      onMouseEnter={handleParentMouseEnter}
      onMouseLeave={handleParentMouseLeave}
    >
      <MyAnimatedDiv
        className='flex pointer-events-auto border border-gray-500/50 p-[0.8em] rounded-2xl
                   transition-opacity transition-transform duration-200'
        style={{ ...getDockStyle(), ...visibilitySpring }}
      >
        {springs.map((spring, index) => {
          const { icon: Icon, href, size: itemSize } = items[index];
          return (
            <Link href={href} key={href} target='_blank'>
              <MyAnimatedDiv
                className='bg-[#060606] m-[5px] w-[50px] h-[50px] p-[10px]
                           rounded-lg border-[0.5px] border-gray-500/50 flex relative z-0
                           items-center justify-center will-change-transform
                           cursor-pointer pointer-events-auto
                           transition-transform duration-100
                           transition-colors ease-out
                           hover:z-10 hover:bg-white/15 hover: cursor-pointer'
                style={spring}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Icon size={itemSize ?? size} />
              </MyAnimatedDiv>
            </Link>
          );
        })}
      </MyAnimatedDiv>
    </div>
  );
};

export default Dock;
