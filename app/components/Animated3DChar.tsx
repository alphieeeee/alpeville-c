"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Animated3DChar.module.css";

const GHOST_ASSET = "/assets/ghost.glb";

function GhostModel({
  moving,
  scrollProgress,
}: {
  moving: boolean;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(GHOST_ASSET);
  const { viewport } = useThree();
  const targetMoving = useRef(moving ? 1 : 0);
  const model = useMemo(() => scene.clone(true), [scene]);
  const modelBounds = useMemo(() => new THREE.Box3().setFromObject(model), [model]);

  useEffect(() => {
    targetMoving.current = moving ? 1 : 0;
  }, [moving]);

  useEffect(() => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const motion = THREE.MathUtils.damp(
      groupRef.current.userData.motion ?? 0,
      targetMoving.current,
      8,
      delta,
    );
    groupRef.current.userData.motion = motion;

    const small = viewport.width < 6.5;
    const modelWidth = Math.max(modelBounds.max.x - modelBounds.min.x, 0.001);
    const rightPadding = viewport.width * 0.1;
    const initialScale =
      THREE.MathUtils.clamp(viewport.width / 6.5, 0.64, 0.9) * 0.72;
    const scrolledScale = (viewport.width * 0.1) / modelWidth;
    const initialX =
      viewport.width / 2 - rightPadding - modelBounds.max.x * initialScale;
    const scrolledX =
      viewport.width / 2 - rightPadding - modelBounds.max.x * scrolledScale;
    const topPadding = viewport.height * 0.1;
    const initialY = small ? 0.35 : 0.18;
    const scrolledY =
      viewport.height / 2 - topPadding - modelBounds.max.y * scrolledScale;
    const targetX = THREE.MathUtils.lerp(initialX, scrolledX, scrollProgress);
    const targetY = THREE.MathUtils.lerp(initialY, scrolledY, scrollProgress);
    const targetScale = THREE.MathUtils.lerp(
      initialScale,
      scrolledScale,
      scrollProgress,
    );

    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      5,
      delta,
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY + Math.sin(clock.elapsedTime * 1.25) * 0.05 * (1 - scrollProgress),
      5,
      delta,
    );
    groupRef.current.rotation.y =
      Math.sin(clock.elapsedTime * 0.7) * 0.07 +
      (moving ? -motion * 0.45 : 0);
    groupRef.current.rotation.z =
      Math.sin(clock.elapsedTime * 0.9) * 0.018 + motion * 0.07;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(
        groupRef.current.scale.x,
        targetScale,
        5,
        delta,
      ),
    );
  });

  return (
    <group ref={groupRef} position={[1.7, 0.18, 0]}>
      <primitive object={model} />
    </group>
  );
}

export default function Animated3DChar() {
  const [moving, setMoving] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let timeout: number | undefined;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollProgress(Math.min(currentScrollY / 180, 1));
      setMoving(true);
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setMoving(false), 180);
    };

    const initialFrame = window.requestAnimationFrame(() =>
      setScrollProgress(Math.min(window.scrollY / 180, 1)),
    );
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", handleScroll);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={styles.canvasContainer} aria-hidden="true">
      <Canvas
        className={styles.canvas}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 36, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 4, 5]} intensity={3.4} color="#ffffff" castShadow />
        <directionalLight position={[-3, 1, 2]} intensity={0.8} color="#9de8ff" />
        <GhostModel
          moving={moving}
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(GHOST_ASSET);
