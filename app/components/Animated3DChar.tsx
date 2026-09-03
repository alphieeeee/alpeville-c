"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Animated3DChar.module.css";
import PortfolioAssistant from "./PortfolioAssistant";

const BOO_ASSET = "/assets/boo.glb";

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
      rightPadding: 0.2,
      bottomPadding: 0,
      scaleMultiplier: 0.8,
    },
    scrolledState: {
      alignment: "right" as const,
      xPosition: 0,
      yPosition: 0,
      xOffset: 0,
      yOffset: 0,
      topPadding: 0.06,
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
      topPadding: 0.5,
      leftPadding: 0,
      rightPadding: 0,
      bottomPadding: 0,
      scaleMultiplier: 0.55,
    },
    scrolledState: {
      alignment: "right" as const,
      xPosition: 0,
      yPosition: 0,
      xOffset: 0,
      yOffset: 0,
      topPadding: 0.05,
      leftPadding: 0,
      rightPadding: 0.04,
      bottomPadding: 0,
      targetWidthRatio: 0.15,
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

function AiIndicator({ position }: { position: [number, number, number] }) {
  const sparkleGroupRef = useRef<THREE.Group>(null);

  const bubbleShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.16, 0.14);
    shape.lineTo(0.16, 0.14);
    shape.quadraticCurveTo(0.28, 0.14, 0.28, 0.02);
    shape.lineTo(0.28, -0.02);
    shape.quadraticCurveTo(0.28, -0.14, 0.16, -0.14);
    shape.lineTo(0.08, -0.14);
    shape.lineTo(-0.04, -0.25);
    shape.quadraticCurveTo(-0.06, -0.27, -0.06, -0.23);
    shape.lineTo(-0.06, -0.14);
    shape.lineTo(-0.16, -0.14);
    shape.quadraticCurveTo(-0.28, -0.14, -0.28, -0.02);
    shape.lineTo(-0.28, 0.02);
    shape.quadraticCurveTo(-0.28, 0.14, -0.16, 0.14);

    const hole = new THREE.Path();
    hole.moveTo(-0.14, 0.07);
    hole.lineTo(0.14, 0.07);
    hole.quadraticCurveTo(0.2, 0.07, 0.2, 0.01);
    hole.lineTo(0.2, -0.01);
    hole.quadraticCurveTo(0.2, -0.07, 0.14, -0.07);
    hole.lineTo(-0.14, -0.07);
    hole.quadraticCurveTo(-0.2, -0.07, -0.2, -0.01);
    hole.lineTo(-0.2, 0.01);
    hole.quadraticCurveTo(-0.2, 0.07, -0.14, 0.07);
    shape.holes.push(hole);

    return shape;
  }, []);

  const sparkleShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.08);
    shape.lineTo(0.035, 0.025);
    shape.lineTo(0.09, -0.01);
    shape.lineTo(0.035, -0.045);
    shape.lineTo(0, -0.1);
    shape.lineTo(-0.035, -0.045);
    shape.lineTo(-0.09, -0.01);
    shape.lineTo(-0.035, 0.025);
    shape.closePath();
    return shape;
  }, []);

  useFrame(({ clock }) => {
    if (!sparkleGroupRef.current) return;

    const pulse = 0.72 + (Math.sin(clock.elapsedTime * 4) + 1) * 0.14;
    sparkleGroupRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={position} scale={0.82}>
      <mesh>
        <shapeGeometry args={[bubbleShape]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.82}
          depthWrite={false}
        />
      </mesh>
      <group ref={sparkleGroupRef}>
        <mesh position={[-0.12, -0.01, 0.005]} scale={0.62}>
          <shapeGeometry args={[sparkleShape]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, -0.01, 0.005]} scale={0.62}>
          <shapeGeometry args={[sparkleShape]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0.12, -0.01, 0.005]} scale={0.62}>
          <shapeGeometry args={[sparkleShape]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

const ASK_ME_LETTERS = ["A", "S", "K", "M", "E"];
const ASK_ME_LETTER_POSITIONS = [-0.28, -0.14, 0, 0.19, 0.34];
const ASK_ME_REVEAL_MS = 280;
const ASK_ME_HOLD_MS = 450;
const ASK_ME_BLINK_MS = 200;
const ASK_ME_FADE_MS = 500;
const ASK_ME_CYCLE_MS =
  ASK_ME_LETTERS.length * ASK_ME_REVEAL_MS +
  ASK_ME_HOLD_MS +
  ASK_ME_BLINK_MS * 6 +
  ASK_ME_FADE_MS;

function setTextOpacity(mesh: THREE.Mesh, opacity: number) {
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

  for (const material of materials) {
    material.transparent = true;
    material.opacity = opacity;
  }
}

function AnimatedAskMeText({ position }: { position: [number, number, number] }) {
  const letterRefs = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(({ clock }) => {
    const elapsedMs = (clock.elapsedTime * 1000) % ASK_ME_CYCLE_MS;
    const revealEndMs = ASK_ME_LETTERS.length * ASK_ME_REVEAL_MS;
    const blinkStartMs = revealEndMs + ASK_ME_HOLD_MS;
    const fadeStartMs = blinkStartMs + ASK_ME_BLINK_MS * 6;

    letterRefs.current.forEach((letter, index) => {
      if (!letter) return;

      let opacity = 0;
      const letterStartMs = index * ASK_ME_REVEAL_MS;
      const letterFadeProgress =
        (elapsedMs - letterStartMs) / (ASK_ME_REVEAL_MS * 0.55);

      if (elapsedMs >= letterStartMs && elapsedMs < revealEndMs) {
        opacity = THREE.MathUtils.clamp(letterFadeProgress, 0, 1);
      } else if (elapsedMs >= revealEndMs && elapsedMs < blinkStartMs) {
        opacity = 1;
      } else if (elapsedMs >= blinkStartMs && elapsedMs < fadeStartMs) {
        opacity = Math.floor((elapsedMs - blinkStartMs) / ASK_ME_BLINK_MS) % 2 === 0 ? 1 : 0;
      } else if (elapsedMs >= fadeStartMs) {
        opacity = 1 - (elapsedMs - fadeStartMs) / ASK_ME_FADE_MS;
      }

      setTextOpacity(letter, opacity);
    });
  });

  return (
    <group position={position}>
      {ASK_ME_LETTERS.map((letter, index) => (
        <Text
          key={letter}
          ref={(mesh) => {
            letterRefs.current[index] = mesh;
          }}
          position={[ASK_ME_LETTER_POSITIONS[index], 0, 0]}
          font="/fonts/DesignRegular.woff"
          color="#2ecaed"
          fontSize={0.20}
          anchorX="center"
          anchorY="top"
        >
          {letter}
        </Text>
      ))}
    </group>
  );
}

function GhostAsset({
  scrollProgress,
  isScrolling,
  onOpenAssistant,
  scene,
}: {
  scrollProgress: number;
  isScrolling: boolean;
  onOpenAssistant: () => void;
  scene: THREE.Group;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headerHeightRef = useRef(0);
  const isHoveredRef = useRef(false);
  const { viewport, size } = useThree();
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
    const header = document.querySelector<HTMLElement>("header");
    if (!header) return;

    const updateHeaderHeight = () => {
      headerHeightRef.current = header.getBoundingClientRect().height;
    };

    updateHeaderHeight();

    // Older browsers may not provide ResizeObserver, so keep header tracking alive with resize.
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeaderHeight);

      return () => window.removeEventListener("resize", updateHeaderHeight);
    }

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
    const isDesktopHovered = size.width >= 1024 && isHoveredRef.current;
    const isLookingLeft = isScrolling || isDesktopHovered;
    const targetRotationY = isLookingLeft
      ? THREE.MathUtils.degToRad(-55)
      : Math.PI / 12;
    const targetRotationX = THREE.MathUtils.degToRad(isLookingLeft ? 10 : 0);

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
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotationY,
      7,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotationX,
      7,
      delta,
    );
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
        <AiIndicator
          position={[modelBounds.max.x - 0.18, modelBounds.max.y + 0.3, modelCenter.z]}
        />
        <mesh
          position={modelCenter.toArray()}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (document.body.dataset.mobileNavOpen === "true") return;
            event.nativeEvent.stopImmediatePropagation();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            if (document.body.dataset.mobileNavOpen === "true") return;
            if (size.width >= 1024) isHoveredRef.current = true;
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(event) => {
            event.stopPropagation();
            isHoveredRef.current = false;
            document.body.style.cursor = "";
          }}
          onClick={(event) => {
            event.stopPropagation();
            if (document.body.dataset.mobileNavOpen === "true") return;
            event.nativeEvent.stopImmediatePropagation();
            document.body.style.cursor = "";
            onOpenAssistant();
          }}
          aria-label="Open Ask Alps portfolio assistant"
        >
          <boxGeometry args={[modelSize.x * 1.12, modelSize.y * 1.12, modelSize.z * 1.12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <AnimatedAskMeText
          position={[modelCenter.x + 0.18, modelBounds.min.y - 0.15, modelCenter.z]}
        />
      </group>
    </group>
  );
}

function GhostModel({
  scrollProgress,
  isScrolling,
  onOpenAssistant,
}: {
  scrollProgress: number;
  isScrolling: boolean;
  onOpenAssistant: () => void;
}) {
  const { scene } = useGLTF(BOO_ASSET);

  return (
    <GhostAsset
      scrollProgress={scrollProgress}
      isScrolling={isScrolling}
      onOpenAssistant={onOpenAssistant}
      scene={scene}
    />
  );
}

export default function Animated3DChar() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

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
      setIsScrolling(true);
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setIsScrolling(false), 180);
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
        fallback={<div className={styles.canvasFallback} aria-hidden="true" />}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 36, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.8} color="#ffffff" />
        <GhostModel
          scrollProgress={scrollProgress}
          isScrolling={isScrolling}
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

useGLTF.preload(BOO_ASSET);
