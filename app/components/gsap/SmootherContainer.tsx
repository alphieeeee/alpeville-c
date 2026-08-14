'use client'
import React, { useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

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
