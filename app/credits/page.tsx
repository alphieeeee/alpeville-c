import type { Metadata } from "next";
import CtaButton from "../components/CtaButton";
import AnimPanning from "../components/gsap/AnimPanning";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Credits",
  description: "Credits and intellectual property notice for Alpeville.",
};

export default function CreditsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 sm:px-10">
      <AnimPanning duration={0.4} direction="up" from={0} to={0} fade="in" animOnce={true} onScroll={false}>
        <CtaButton href="/" variant="secondary">Back</CtaButton>
      </AnimPanning>
      <AnimPanning delay={0.15} duration={0.8} direction="up" from={0} to={0} fade="in" animOnce={true} onScroll={false}>
        <article className={styles.content}>
          <p className={styles.eyebrow}>Credits</p>
          <h1>Made with borrowed nostalgia.</h1>
          <p>This is an unofficial, fan-made portfolio project created for personal and educational demonstration purposes.</p>
          <p>Boo and related Mario characters, names, artwork, and properties belong to Nintendo. This project is not affiliated with, endorsed by, or sponsored by Nintendo. No ownership of Nintendo intellectual property is claimed.</p>
          <p className={styles.muted}>The character is included as a personal creative reference while demonstrating frontend engineering, motion, and interactive 3D.</p>
        </article>
      </AnimPanning>
    </main>
  );
}
