"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Animated3DChar.module.css";
import PortfolioAssistant from "./PortfolioAssistant";

const GHOST_ASSET = "/assets/ghost.glb";

// Keep the reusable 3D object's initial and scrolled states in one place.
const THREE_D_OBJECT_CONFIG = {
  desktop: {
    // x/y values use Three.js world units. Offsets and paddings are viewport
    // fractions, making the tuning responsive when the viewport changes.
    initialState: {
      alignment: "right" as const,
      xPosition: 0,
      yPosition: 0.18,
      xOffset: 0,
      yOffset: 0,
      topPadding: 0.04,
      leftPadding: 0,
      rightPadding: 0.1,
      bottomPadding: 0,
      scaleMultiplier: 0.72,
    },
    scrolledState: {
      alignment: "right" as const,
      xPosition: 0,
      yPosition: 0,
      xOffset: 0,
      yOffset: 0,
      topPadding: 0.04,
      leftPadding: 0,
      rightPadding: 0.04,
      bottomPadding: 0,
      targetWidthRatio: 0.1,
    },
  },
  mobile: {
    initialState: {
      alignment: "center" as const,
      xPosition: 0,
      yPosition: 0.35,
      xOffset: 0,
      yOffset: 0,
      topPadding: 0.43,
      leftPadding: 0,
      rightPadding: 0,
      bottomPadding: 0,
      scaleMultiplier: 0.5,
    },
    scrolledState: {
      alignment: "right" as const,
      xPosition: 0,
      yPosition: 0,
      xOffset: 0,
      yOffset: 0,
      topPadding: 0.04,
      leftPadding: 0,
      rightPadding: 0.04,
      bottomPadding: 0,
      targetWidthRatio: 0.13,
    },
  },
} as const;

type ThreeDObjectState = {
  alignment: "left" | "center" | "right";
  xPosition?: number;
  yPosition?: number;
  xOffset?: number;
  targetWidthRatio?: number;
  leftPadding?: number;
  rightPadding?: number;
};

function getHorizontalPosition(
  position: ThreeDObjectState,
  viewportWidth: number,
  modelWidth: number,
  scale: number,
) {
  const leftPadding = viewportWidth * (position.leftPadding || 0);
  const rightPadding = viewportWidth * (position.rightPadding || 0);
  const manualOffset =
    (position.xPosition || 0) + viewportWidth * (position.xOffset || 0);

  if (position.alignment === "center") {
    return (
      modelWidth * scale * 0.5 +
      (leftPadding - rightPadding) * 0.5 +
      manualOffset
    );
  }

  if (position.alignment === "left") {
    return -viewportWidth / 2 + leftPadding - rightPadding + manualOffset;
  }

  return viewportWidth / 2 - rightPadding + leftPadding + manualOffset;
}

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
  const headerHeightRef = useRef(0);
  const { viewport, size } = useThree();
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
    const header = document.querySelector<HTMLElement>("header");
    if (!header) return;

    const updateHeaderHeight = () => {
      headerHeightRef.current = header.getBoundingClientRect().height;
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

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

    const layout =
      size.width >= 1024
        ? THREE_D_OBJECT_CONFIG.desktop
        : THREE_D_OBJECT_CONFIG.mobile;
    const initialState = layout.initialState;
    const scrolledState = layout.scrolledState;
    const modelWidth = Math.max(modelBounds.max.x - modelBounds.min.x, 0.001);
    const initialScale =
      THREE.MathUtils.clamp(viewport.width / 6.5, 0.64, 0.9) *
      (initialState.scaleMultiplier || 1);
    // Preserve the existing target-width formula while making its ratio
    // configurable for each responsive layout.
    const scrolledScale =
      (viewport.width * (scrolledState.targetWidthRatio || 0.1)) / modelWidth;
    // The outer group is anchored at the model's top-right corner, so its
    // position does not need to compensate for the current scale.
    const initialX = getHorizontalPosition(
      initialState,
      viewport.width,
      modelWidth,
      initialScale,
    );
    const scrolledX = getHorizontalPosition(
      scrolledState,
      viewport.width,
      modelWidth,
      scrolledScale,
    );
    // Convert the fixed header's pixel height into the Canvas' world units.
    const headerHeight =
      (headerHeightRef.current / Math.max(size.height, 1)) * viewport.height;
    const initialTopPadding =
      headerHeight +
      viewport.height * (initialState.topPadding || 0) +
      viewport.height * (initialState.bottomPadding || 0);
    const scrolledTopPadding =
      headerHeight +
      viewport.height * (scrolledState.topPadding || 0) +
      viewport.height * (scrolledState.bottomPadding || 0);
    const initialBelowHeaderY =
      viewport.height / 2 -
      initialTopPadding +
      (initialState.yPosition || 0) +
      viewport.height * (initialState.yOffset || 0);
    const scrolledY =
      viewport.height / 2 -
      scrolledTopPadding +
      (scrolledState.yPosition || 0) +
      viewport.height * (scrolledState.yOffset || 0);
    const initialTop =
      (initialState.yPosition || 0) +
      modelBounds.max.y * initialScale +
      viewport.height * (initialState.yOffset || 0);
    const initialY = Math.min(initialTop, initialBelowHeaderY);
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
      <group
        name="ghostCharacter"
        position={[-modelBounds.max.x, -modelBounds.max.y, 0]}
      >
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
