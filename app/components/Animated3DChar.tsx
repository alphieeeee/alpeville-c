"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Animated3DChar.module.css";

const GHOST_ASSET = "/assets/ghost.glb";

function GhostModel({ moving }: { moving: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(GHOST_ASSET);
  const { viewport } = useThree();
  const targetMoving = useRef(moving ? 1 : 0);
  const model = useMemo(() => scene.clone(true), [scene]);

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
    const targetX = small
      ? -Math.min(viewport.width * 0.2, 0.9)
      : -Math.min(viewport.width * 0.31, 1.85);
    const targetScale = small ? 0.86 : 1.02;

    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetX,
      5,
      delta,
    );
    groupRef.current.position.y =
      (small ? 0.35 : 0.18) + Math.sin(clock.elapsedTime * 1.25) * 0.05;
    groupRef.current.rotation.y =
      Math.sin(clock.elapsedTime * 0.7) * 0.07 + motion * 0.45;
    groupRef.current.rotation.z =
      Math.sin(clock.elapsedTime * 0.9) * 0.018 + motion * 0.07;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(
        groupRef.current.scale.x,
        targetScale + motion * 0.035,
        5,
        delta,
      ),
    );
  });

  return (
    <group ref={groupRef} position={[-1.4, 0.18, 0]}>
      <primitive object={model} />
    </group>
  );
}

export default function Animated3DChar() {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    const handleScroll = () => {
      setMoving(true);
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setMoving(false), 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
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
        <GhostModel moving={moving} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(GHOST_ASSET);
