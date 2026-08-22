"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN = "#2ecaed";
const INDIGO = "#6e56d9";
const MAGENTA = "#6e316f";
const BACKGROUND = "#1a191d";

function seededValue(seed: number) {
  return Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
}

const gridVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float gridLine(float coordinate, float width) {
    float cellPosition = fract(coordinate);
    float distanceToLine = min(cellPosition, 1.0 - cellPosition);
    return 1.0 - smoothstep(width, width + 0.018, distanceToLine);
  }

  float passingStreak(float coordinate, float progress) {
    float head = progress * 2.0 - 0.22;
    float distanceBehindHead = head - coordinate;
    return smoothstep(-0.015, 0.025, distanceBehindHead)
      * (1.0 - smoothstep(0.025, 0.18, distanceBehindHead));
  }

  float gridStreak(
    vec2 gridUv,
    float horizontalLine,
    float verticalLine,
    float timeOffset
  ) {
    float cycle = uTime * 0.36 + timeOffset;
    float eventIndex = floor(cycle);
    float progress = fract(cycle);
    float seed = hash21(vec2(eventIndex, 71.0 + timeOffset * 13.0));
    float selectedLine = floor(seed * 28.0) + 1.0;
    float horizontalEvent = 1.0 - step(0.58, seed);

    float rowMatch = 1.0 - step(
      0.5,
      abs(floor(gridUv.y) - selectedLine)
    );
    float columnMatch = 1.0 - step(
      0.5,
      abs(floor(gridUv.x) - selectedLine)
    );
    float horizontalStreak = passingStreak(vUv.x, progress)
      * horizontalLine * rowMatch;
    float verticalStreak = passingStreak(vUv.y, progress)
      * verticalLine * columnMatch;
    float eventFade = smoothstep(0.04, 0.14, progress)
      * (1.0 - smoothstep(0.58, 0.78, progress));

    return mix(verticalStreak, horizontalStreak, horizontalEvent) * eventFade;
  }

  void main() {
    vec2 gridUv = vUv * vec2(30.0, 30.0);
    float horizontalLine = gridLine(gridUv.y, 0.035);
    float verticalLine = gridLine(gridUv.x, 0.035);
    float grid = max(horizontalLine, verticalLine);

    float primaryStreak = gridStreak(gridUv, horizontalLine, verticalLine, 0.0);
    float secondaryStreak = gridStreak(gridUv, horizontalLine, verticalLine, 0.34);
    float tertiaryStreak = gridStreak(gridUv, horizontalLine, verticalLine, 0.71);
    float packets = max(
      primaryStreak,
      max(secondaryStreak * 0.82, tertiaryStreak * 0.68)
    );

    float edgeFade = smoothstep(0.0, 0.08, vUv.x)
      * smoothstep(0.0, 0.08, 1.0 - vUv.x);
    float depthFade = smoothstep(0.02, 0.24, vUv.y)
      * (1.0 - smoothstep(0.88, 1.0, vUv.y));

    vec3 indigo = vec3(0.431, 0.337, 0.851);
    vec3 cyan = vec3(0.18, 0.72, 0.88);
    vec3 color = indigo * grid * 0.11;
    color += mix(indigo, cyan, 0.24) * packets * 1.08;
    float horizonBand = exp(-pow((vUv.y - 0.82) * 27.0, 2.0));
    float horizonPulse = 0.72 + sin(uTime * 0.75) * 0.14;
    color += indigo * horizonBand * horizonPulse * 0.16;
    float alpha = (grid * 0.13 + packets * 0.72) * edgeFade * depthFade;
    alpha += horizonBand * horizonPulse * 0.085 * edgeFade;
    gl_FragColor = vec4(color, alpha);
  }
`;

function HolographicCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const scanArcRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.045;
    groupRef.current.position.y = Math.sin(time * 0.42) * 0.08;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.11;
      outerRingRef.current.rotation.x = 0.78 + Math.sin(time * 0.24) * 0.08;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.17;
      innerRingRef.current.rotation.y = time * 0.08;
    }
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(time * 0.72) * 1.65;
      const material = scanRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.035 + Math.cos(time * 1.44) * 0.012;
    }
    if (scanArcRef.current) {
      scanArcRef.current.rotation.z = time * 0.48;
      scanArcRef.current.rotation.y = Math.sin(time * 0.22) * 0.18;
      const material = scanArcRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.16 + Math.sin(time * 0.96) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2.25, 1]} />
        <meshBasicMaterial
          color={INDIGO}
          wireframe
          transparent
          opacity={0.065}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[2.08, 32, 16]} />
        <meshBasicMaterial
          color={INDIGO}
          wireframe
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={outerRingRef} rotation={[0.78, 0.15, 0]}>
        <torusGeometry args={[2.85, 0.025, 6, 96]} />
        <meshBasicMaterial
          color={INDIGO}
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerRingRef} rotation={[0.2, 1.05, 0]}>
        <torusGeometry args={[2.58, 0.018, 6, 88]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.46, 0.012, 5, 72]} />
        <meshBasicMaterial
          color={INDIGO}
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.12, 48]} />
        <meshBasicMaterial
          color={INDIGO}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={scanArcRef} rotation={[0.36, 0.2, 0]}>
        <torusGeometry args={[2.7, 0.028, 5, 52, Math.PI * 0.68]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  );
}

function SignalParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seededValue(index + 1) - 0.5) * 22;
      positions[index * 3 + 1] = (seededValue(index + 301) - 0.5) * 11;
      positions[index * 3 + 2] = -2 - seededValue(index + 601) * 12;
    }

    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return nextGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.025;
    pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.18) * 0.12;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={INDIGO}
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.42}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function PerspectiveGrid() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, -3.2, -5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function HudPanels() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.elapsedTime;
    groupRef.current.children.forEach((panel, index) => {
      panel.position.y += Math.sin(time * 0.6 + index * 1.8) * 0.0005;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[5.7, 1.75, -5]} rotation={[0, -0.18, 0]}>
        <planeGeometry args={[2.2, 0.018]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.5} />
      </mesh>
      <mesh position={[6.15, 1.48, -5.2]} rotation={[0, -0.18, 0]}>
        <planeGeometry args={[1.3, 0.012]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.28} />
      </mesh>
      <mesh position={[-5.7, -2.15, -4.5]} rotation={[0, 0.18, 0]}>
        <planeGeometry args={[1.8, 0.018]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.42} />
      </mesh>
      <mesh position={[4.9, -1.85, -6]} rotation={[0, -0.12, -0.22]}>
        <planeGeometry args={[0.72, 0.72]} />
        <meshBasicMaterial
          color={MAGENTA}
          wireframe
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  const sceneRef = useRef<THREE.Group>(null);
  const targetPointer = useRef(new THREE.Vector2());
  const currentPointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      targetPointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };
    const handlePointerLeave = () => targetPointer.current.set(0, 0);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useFrame((_, delta) => {
    if (!sceneRef.current) return;
    currentPointer.current.lerp(targetPointer.current, 1 - Math.exp(-delta * 2));
    sceneRef.current.rotation.y = currentPointer.current.x * 0.018;
    sceneRef.current.rotation.x = -currentPointer.current.y * 0.01;
    sceneRef.current.position.x = currentPointer.current.x * 0.1;
    sceneRef.current.position.y = currentPointer.current.y * 0.06;
  });

  return (
    <>
      <color attach="background" args={[BACKGROUND]} />
      <fog attach="fog" args={[BACKGROUND, 9, 25]} />
      <group ref={sceneRef}>
        <group position={[-4.35, 0.1, -5.5]} rotation={[0.08, -0.28, -0.08]}>
          <HolographicCore />
        </group>
        <PerspectiveGrid />
        <SignalParticles />
        <HudPanels />
      </group>
    </>
  );
}

export default function Animated3DBGv2() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[#1a191d]"
    >
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 1.5, 10], fov: 48, near: 0.1, far: 40 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_48%,rgba(110,86,217,0.25),transparent_32%),radial-gradient(circle_at_72%_38%,rgba(110,86,217,0.16),transparent_38%),radial-gradient(circle_at_42%_75%,rgba(46,202,237,0.055),transparent_25%),linear-gradient(90deg,rgba(110,86,217,0.14),transparent_42%,transparent_76%,rgba(110,49,111,0.1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,25,29,0.06),rgba(26,25,29,0.24)_64%,rgba(26,25,29,0.76))]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:repeating-linear-gradient(0deg,transparent,transparent_3px,#6e56d9_4px)]" />
    </div>
  );
}
