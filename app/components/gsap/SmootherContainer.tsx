'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

interface SmootherContainerProps {
	children: React.ReactNode;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmootherContainer: React.FC<SmootherContainerProps> = ({
		children
	}) => {
		const smoother = useRef<ScrollSmoother | null>(null);
		const smoothWrapper = useRef<HTMLDivElement>(null);
		const smoothContent = useRef<HTMLDivElement>(null);
		const pathname = usePathname();

		useGSAP(() => {
			if (!smoothWrapper.current || !smoothContent.current || smoother.current) return;

			smoother.current = ScrollSmoother.create({
				wrapper: smoothWrapper.current,
				content: smoothContent.current,
				smooth: 2,
				effects: true,
			});

			return () => {
				smoother.current?.kill();
				smoother.current = null;
			};
		}, { scope: smoothWrapper });

		useEffect(() => {
			if (!smoother.current) return;
			smoother.current.refresh();
			smoother.current.scrollTo(0, false);
			window.scrollTo(0, 0);
		}, [pathname]);
		
  return (
		<>
			<div id='smooth-wrapper' ref={smoothWrapper}>
      			<div id='smooth-content' ref={smoothContent} className={`relative`}>
					{children}
				</div>
			</div>
		</>
  )
}

export default SmootherContainer
