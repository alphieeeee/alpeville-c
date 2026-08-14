'use client'
import React, { useRef } from 'react'
import { useGSAP } from "@gsap/react";
import { usePageTransition } from '../../../lib/gsap/usePageTransition';
import SmootherContainer from './SmootherContainer';
import Footer from '../site/Footer';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({
    children
  }) => {
    const mainContainer = useRef<HTMLDivElement>(null);
    const { pageTransitionIn } = usePageTransition();
    
    useGSAP(() => {
      pageTransitionIn();
    }, { scope: mainContainer });

  return (
    <>
      <SmootherContainer>
        <div id='main-container' ref={mainContainer} className={`main-container relative min-h-[100vh] min-h-[100dvh] flex flex-col`}>
          <div id="header-divider" aria-hidden="true" className="h-20 sm:h-20 lg:h-20" />
          {children}
          <div id="header-divider" aria-hidden="true" className="h-20 sm:h-20 lg:h-20" />
          <Footer />
        </div>
        <div className={`transition-overlay absolute w-full h-full top-0 left-0 z-40 pointer-events-none bg-white`}>
          <div className={`transition-overlay absolute w-full h-full top-0 left-0 pointer-events-auto bg-white`}></div>
        </div>
      </SmootherContainer>
    </>
  )
}

export default TransitionLayout
