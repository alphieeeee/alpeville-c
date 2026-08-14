'use client'
import React, { useRef, RefObject } from 'react';
import { useGSAP } from '@gsap/react'
import { animPanning } from '../../../lib/animations/animPanning';

type AnimDirection = 'left' | 'right' | 'up' | 'down';

interface AnimPanningProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: RefObject<HTMLElement>;
  delay?: number;
  duration: number;
  markers?: boolean;
  animOnce?: boolean;
  onScroll?: boolean;
  children?: React.ReactNode;
  direction: AnimDirection;
  from: number;
  to: number,
  fade?: 'in' | 'out';
  ease?: string;
  elemHitArea?: string;
  viewportHitArea?: string;
}

const AnimPanning: React.FC<AnimPanningProps> = ({
  id,
  trigger,
  className,
  style,
  delay,
  duration,
  markers,
  animOnce,
  onScroll,
  children,
  direction,
  from,
  to,
  fade,
  ease,
  elemHitArea,
  viewportHitArea,
}) => {
  const customClasses = `relative ${className ? ` ${className}` : ''}`;
  const customStyles = { ...style };
  const elementRef = useRef<HTMLDivElement | null>(null);
  const container = trigger ?? elementRef;
  
  useGSAP(() => {
    animPanning({
      elementRef,
      triggerRef: trigger,
      delay,
      duration,
      markers,
      animOnce,
      onScroll,
      direction,
      from,
      to,
      fade,
      ease,
      elemHitArea,
      viewportHitArea,
    });
  }, { scope: container });

  return (
    <div
      id={id}
      className={customClasses}
      style={customStyles}
      ref={elementRef}
      >
      {children}
    </div>
  );
};

export default AnimPanning;
