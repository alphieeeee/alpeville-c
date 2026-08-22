"use client";

import { useEffect, useMemo, useRef, type ComponentPropsWithoutRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BACKGROUND = "#15141b";
const INDIGO = "#6e56d9";
const BRIGHT_INDIGO = "#927cff";

function seededValue(seed: number) {
  return Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
}

const floorVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const floorFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec2 vUv;

  float lineMask(float value, float width) {
    return 1.0 - smoothstep(width, width + 0.006, abs(value));
  }

  float segment(vec2 p, vec2 a, vec2 b, float width) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return 1.0 - smoothstep(width, width + 0.008, length(pa - ba * h));
  }

  float circuit(vec2 p, float offset) {
    p.x = fract(p.x + offset);

    float trace = segment(p, vec2(0.00, 0.24), vec2(0.20, 0.24), 0.008);
    trace += segment(p, vec2(0.20, 0.24), vec2(0.26, 0.34), 0.008);
    trace += segment(p, vec2(0.26, 0.34), vec2(0.62, 0.34), 0.008);
    trace += segment(p, vec2(0.62, 0.34), vec2(0.70, 0.47), 0.008);
    trace += segment(p, vec2(0.70, 0.47), vec2(1.00, 0.47), 0.008);
    return clamp(trace, 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    vec2 gridUv = uv * vec2(22.0, 30.0);
    vec2 gridCell = abs(fract(gridUv) - 0.5);
    float grid = max(
      lineMask(gridCell.x - 0.5, 0.012),
      lineMask(gridCell.y - 0.5, 0.012)
    );

    vec2 circuitUv = vec2(uv.x * 3.2, fract(uv.y * 7.0));
    float traces = circuit(circuitUv, floor(uv.y * 7.0) * 0.17);
    traces += circuit(
      vec2(1.0 - circuitUv.x, fract(circuitUv.y + 0.46)),
      floor(uv.y * 5.0) * 0.11
    );
    traces = clamp(traces, 0.0, 1.0);

    float pulsePosition = fract(uTime * 0.075);
    float pulse = exp(-pow((uv.y - pulsePosition) * 24.0, 2.0));
    pulse += 0.6 * exp(-pow((uv.y - fract(pulsePosition + 0.48)) * 30.0, 2.0));

    float edgeFade = smoothstep(0.0, 0.12, uv.x) * smoothstep(0.0, 0.12, 1.0 - uv.x);
    float distanceFade = smoothstep(0.02, 0.32, uv.y) * (1.0 - smoothstep(0.82, 1.0, uv.y));

    vec3 baseIndigo = vec3(0.431, 0.337, 0.851);
    vec3 brightIndigo = vec3(0.573, 0.486, 1.0);
    vec3 color = baseIndigo * grid * 0.12;
    color += mix(baseIndigo, brightIndigo, pulse) * traces * (0.18 + pulse * 0.58);

    float alpha = (grid * 0.14 + traces * (0.22 + pulse * 0.48)) * edgeFade * distanceFade;
    float horizonSync = exp(-pow((pulsePosition - 0.79) * 18.0, 2.0));
    float horizonBand = exp(-pow((uv.y - 0.79) * 30.0, 2.0));
    color += brightIndigo * horizonBand * (0.035 + horizonSync * 0.16);
    alpha += horizonBand * (0.025 + horizonSync * 0.12) * edgeFade;
    gl_FragColor = vec4(color, alpha);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int octave = 0; octave < 4; octave++) {
      value += noise(p) * amplitude;
      p = p * 2.03 + 3.17;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 drift = vec2(uTime * 0.006, -uTime * 0.002);
    float cloud = fbm(uv * vec2(3.2, 2.1) + drift);
    cloud *= fbm(uv * vec2(5.4, 3.0) - drift * 0.7);
    cloud = smoothstep(0.24, 0.62, cloud);

    float radialFade = smoothstep(0.72, 0.12, length((uv - vec2(0.48, 0.54)) * vec2(1.0, 1.35)));
    float edgeFade = smoothstep(0.0, 0.18, uv.x) * smoothstep(0.0, 0.18, 1.0 - uv.x);
    vec3 indigo = vec3(0.431, 0.337, 0.851);
    gl_FragColor = vec4(indigo * cloud * 0.22, cloud * radialFade * edgeFade * 0.12);
  }
`;

type MotionPreference = RefObject<boolean>;

function CircuitFloor({ reducedMotion }: { reducedMotion: MotionPreference }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = reducedMotion.current
        ? 0
        : clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, -2.7, -7]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[24, 30, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={floorVertexShader}
        fragmentShader={floorFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Galaxy({ reducedMotion }: { reducedMotion: MotionPreference }) {
  const nearRef = useRef<THREE.Points>(null);
  const farRef = useRef<THREE.Points>(null);

  const { nearGeometry, farGeometry } = useMemo(() => {
    const createGeometry = (count: number, seedOffset: number, spread: number) => {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const indigo = new THREE.Color(INDIGO);
      const bright = new THREE.Color(BRIGHT_INDIGO);

      for (let index = 0; index < count; index += 1) {
        positions[index * 3] = (seededValue(index + seedOffset) - 0.5) * spread;
        positions[index * 3 + 1] =
          (seededValue(index + seedOffset + 401) - 0.36) * spread * 0.58;
        positions[index * 3 + 2] =
          -3 - seededValue(index + seedOffset + 803) * spread;

        const color = indigo
          .clone()
          .lerp(bright, seededValue(index + seedOffset + 1201) * 0.72);
        colors[index * 3] = color.r;
        colors[index * 3 + 1] = color.g;
        colors[index * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      return geometry;
    };

    return {
      nearGeometry: createGeometry(140, 1, 20),
      farGeometry: createGeometry(300, 1701, 32),
    };
  }, []);

  useFrame(({ clock }) => {
    if (reducedMotion.current) return;
    const time = clock.elapsedTime;
    if (nearRef.current) {
      nearRef.current.rotation.y = time * 0.004;
      nearRef.current.position.y = Math.sin(time * 0.13) * 0.06;
    }
    if (farRef.current) {
      farRef.current.rotation.y = -time * 0.002;
      farRef.current.position.x = Math.sin(time * 0.08) * 0.1;
    }
  });

  return (
    <>
      <points ref={farRef} geometry={farGeometry}>
        <pointsMaterial
          size={0.025}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.36}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={nearRef} geometry={nearGeometry}>
        <pointsMaterial
          size={0.055}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.56}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

function Nebula({ reducedMotion }: { reducedMotion: MotionPreference }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = reducedMotion.current
        ? 0
        : clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 1.4, -14]}>
      <planeGeometry args={[26, 13]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={floorVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function ShootingStars({ reducedMotion }: { reducedMotion: MotionPreference }) {
  const firstRef = useRef<THREE.Mesh>(null);
  const secondRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const updateStreak = (
      streak: THREE.Mesh | null,
      interval: number,
      phase: number,
      startX: number,
      startY: number,
    ) => {
      if (!streak) return;
      const material = streak.material as THREE.MeshBasicMaterial;

      if (reducedMotion.current) {
        material.opacity = 0;
        return;
      }

      const localTime = (clock.elapsedTime + phase) % interval;
      const duration = 1.15;
      if (localTime > duration) {
        material.opacity = 0;
        return;
      }

      const progress = localTime / duration;
      streak.position.set(
        startX + progress * 7.5,
        startY - progress * 3.2,
        -6,
      );
      material.opacity = Math.sin(progress * Math.PI) * 0.38;
    };

    updateStreak(firstRef.current, 19, 5.5, -7.5, 4.6);
    updateStreak(secondRef.current, 29, 17, -5.5, 5.4);
  });

  return (
    <group>
      <mesh ref={firstRef} rotation={[0, 0, -0.405]}>
        <planeGeometry args={[1.9, 0.018]} />
        <meshBasicMaterial
          color={BRIGHT_INDIGO}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={secondRef} rotation={[0, 0, -0.405]}>
        <planeGeometry args={[1.35, 0.012]} />
        <meshBasicMaterial
          color={INDIGO}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  const galaxyLayerRef = useRef<THREE.Group>(null);
  const floorLayerRef = useRef<THREE.Group>(null);
  const targetPointer = useRef(new THREE.Vector2());
  const currentPointer = useRef(new THREE.Vector2());
  const reducedMotion = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => {
      reducedMotion.current = motionQuery.matches;
    };
    const handlePointerMove = (event: PointerEvent) => {
      targetPointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };
    const handlePointerLeave = () => targetPointer.current.set(0, 0);

    handleMotionPreference();
    motionQuery.addEventListener("change", handleMotionPreference);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      motionQuery.removeEventListener("change", handleMotionPreference);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useFrame((_, delta) => {
    if (!galaxyLayerRef.current || !floorLayerRef.current) return;
    currentPointer.current.lerp(targetPointer.current, 1 - Math.exp(-delta * 1.8));

    // Separate depth layers create parallax without moving content-facing DOM.
    galaxyLayerRef.current.position.x = currentPointer.current.x * 0.075;
    galaxyLayerRef.current.position.y = currentPointer.current.y * 0.045;
    galaxyLayerRef.current.rotation.y = currentPointer.current.x * 0.006;

    floorLayerRef.current.position.x = currentPointer.current.x * 0.12;
    floorLayerRef.current.position.z = currentPointer.current.y * 0.05;
    floorLayerRef.current.rotation.z = -currentPointer.current.x * 0.0025;
  });

  return (
    <>
      <color attach="background" args={[BACKGROUND]} />
      <fog attach="fog" args={[BACKGROUND, 10, 30]} />
      <group ref={galaxyLayerRef}>
        <Nebula reducedMotion={reducedMotion} />
        <Galaxy reducedMotion={reducedMotion} />
        <ShootingStars reducedMotion={reducedMotion} />
      </group>
      <group ref={floorLayerRef}>
        <CircuitFloor reducedMotion={reducedMotion} />
      </group>
    </>
  );
}

type Animated3DBGProps = ComponentPropsWithoutRef<"div">;

export default function Animated3DBGv3({
  id,
  className = "",
  style,
  children,
  ...props
}: Animated3DBGProps) {
  return (
    <div
      {...props}
      id={id}
      style={style}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[#15141b] ${className}`.trim()}
    >
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 2.2, 9.5], fov: 48, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(110,86,217,0.11),transparent_45%),linear-gradient(180deg,rgba(21,20,27,0.04),rgba(21,20,27,0.16)_58%,rgba(21,20,27,0.64))]" />
      <div className="absolute inset-0 opacity-[0.025] [background-image:repeating-linear-gradient(0deg,transparent,transparent_3px,#927cff_4px)]" />
      {children}
    </div>
  );
}
