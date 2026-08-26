"use client";
import { useRef } from "react";
import styles from "./ScrollProgressBar.module.css";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const progressBarContainer = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const progressKnob = useRef<HTMLDivElement>(null);

  useGSAP(() => {
			if (!progressBar.current || !progressBarContainer.current) return;
			ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.set(progressBar.current, {
            scaleY: self.progress,
            transformOrigin: "50% 0%",
          });
          gsap.set(progressKnob.current, {
            top: `${self.progress * 100}%`,
            transformOrigin: "50% 0%",
          });
        },
      })
  }, { scope: progressBarContainer });
  
  return (
    <div ref={progressBarContainer} className={styles.root} aria-hidden="true">
      <div className={styles.track}>
        <div ref={progressBar} className="scroll-progress-barv" />
        <div ref={progressKnob} className="knob" />
      </div>
    </div>
  );
}
