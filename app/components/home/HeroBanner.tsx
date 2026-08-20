import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import styles from "./HeroBanner.module.css";

type HeroBannerProps = {
  headshotSrc: string;
  name: string;
} & ComponentPropsWithoutRef<"section">;

export default function HeroBanner({
  headshotSrc,
  name,
  className = "",
  children,
  ...props
}: HeroBannerProps) {
  return (
    <section {...props} id="home" className={`${styles.hero} ${className}`.trim()}>
      <div className={styles.frameWrap}>
        <div className={`${styles.float} ${styles.floatSlow}`} />
        <div className={`${styles.float} ${styles.floatFast}`} />
        <div className={styles.content}>
          <div className={styles.portraitShell}>
            <div className={styles.portraitFloat}>
              <div className={styles.portraitMask}>
                <Image
                  src={headshotSrc}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 640px) 136px, (max-width: 1024px) 188px, 220px"
                  className={styles.portrait}
                />
              </div>
            </div>
          </div>

          <div className={styles.copy}>
            <p className={styles.eyebrow}>Hi I&apos;m</p>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.lead}>
              I bring designs to life through code and motion.
            </p>
          </div>
        </div>
        <Image
          src="/assets/hero-border.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className={styles.frame}
        />
      </div>

      {children}
    </section>
  );
}
