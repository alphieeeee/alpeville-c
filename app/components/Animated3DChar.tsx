"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Animated3DChar.module.css";
import PortfolioAssistant from "./PortfolioAssistant";

const GHOST_ASSET = "/assets/ghost.glb";

function GhostAsset({
  moving,
  scrollProgress,
  onOpenAssistant,
  scene,
}: {
  moving: boolean;
  scrollProgress: number;
  onOpenAssistant: () => void;
  scene: THREE.Group;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const targetMoving = useRef(moving ? 1 : 0);
  const model = useMemo(() => scene.clone(true), [scene]);
  const modelBounds = useMemo(() => new THREE.Box3().setFromObject(model), [model]);
  const modelCenter = useMemo(
    () => modelBounds.getCenter(new THREE.Vector3()),
    [modelBounds],
  );
  const modelSize = useMemo(
    () => modelBounds.getSize(new THREE.Vector3()),
    [modelBounds],
  );

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
      <group name="ghostCharacter">
        <primitive object={model} />
        <Text
          anchorX="center"
          anchorY="top"
          color="#2ecaed"
          fontSize={0.12}
          outlineColor="#08080d"
          outlineWidth={0.012}
          position={[modelCenter.x, modelBounds.min.y - 0.12, modelCenter.z]}
        >
          Hit Me
        </Text>
        <mesh
          position={modelCenter.toArray()}
          onClick={(event) => {
            event.stopPropagation();
            onOpenAssistant();
          }}
          aria-label="Hit me - open Ask Alps portfolio assistant"
        >
          <boxGeometry args={[modelSize.x * 1.12, modelSize.y * 1.12, modelSize.z * 1.12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function GhostModel({
  moving,
  scrollProgress,
  onOpenAssistant,
}: {
  moving: boolean;
  scrollProgress: number;
  onOpenAssistant: () => void;
}) {
  const { scene } = useGLTF(GHOST_ASSET);

  return (
    <GhostAsset
      moving={moving}
      scrollProgress={scrollProgress}
      onOpenAssistant={onOpenAssistant}
      scene={scene}
    />
  );
}

export default function Animated3DChar() {
  const [moving, setMoving] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

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

  if (!isMounted) return null;

  return (
    <div className={styles.canvasContainer}>
      <Canvas
        className={styles.canvas}
        eventSource={document.body}
        eventPrefix="client"
        aria-hidden="true"
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
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />
      </Canvas>
      <PortfolioAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}

useGLTF.preload(GHOST_ASSET);
