"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import type { GameState } from "./useGameState";

const PLATFORM_Y = [0.5, 2.2, 3.9];

export function Player({ getState }: { getState: () => GameState }) {
  const ref = useRef<Group>(null);
  const hammerRef = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const state = getState();
    ref.current.position.set(state.playerX, state.playerY, 0);
    if (hammerRef.current) {
      hammerRef.current.visible = state.hasHammer;
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.4]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>
      <group ref={hammerRef} position={[0.45, 0.5, 0.2]} rotation={[0, 0, -0.4]}>
        <mesh>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color="#78716c" />
        </mesh>
      </group>
    </group>
  );
}

export function Platforms() {
  return (
    <>
      {PLATFORM_Y.map((y, index) => (
        <group key={y} position={[0, y - 0.15, 0]}>
          <mesh>
            <boxGeometry args={[10, 0.15, 1.2]} />
            <meshStandardMaterial color="#374151" metalness={0.4} roughness={0.6} />
          </mesh>
          <mesh position={[-4.2, 0.35, 0]}>
            <boxGeometry args={[0.12, 0.7, 0.12]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          <mesh position={[4.2, 0.35, 0]}>
            <boxGeometry args={[0.12, 0.7, 0.12]} />
            <meshStandardMaterial color="#4b5563" />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[9.6, 0.02, 1]} />
            <meshStandardMaterial color={index === 2 ? "#f59e0b" : "#1f2937"} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export function Legacy({ getState }: { getState: () => GameState }) {
  const ref = useRef<Group>(null);
  const bodyRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const anger = getState().anger;
    ref.current.position.y = 5.2 + (anger === "furious" ? Math.sin(Date.now() * 0.02) * 0.1 : 0);
    ref.current.rotation.z = anger === "mad" ? Math.sin(Date.now() * 0.01) * 0.05 : 0;
  });

  const anger = getState().anger;
  const color = anger === "furious" ? "#ef4444" : anger === "mad" ? "#f97316" : "#a855f7";

  return (
    <group ref={ref} position={[0, 5.2, 0]}>
      <mesh>
        <boxGeometry args={[0.7, 0.8, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={bodyRef} position={[0, 0.65, 0]}>
        <boxGeometry args={[0.55, 0.5, 0.45]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={anger === "furious" ? 0.4 : 0.1}
        />
      </mesh>
      <mesh position={[-0.5, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function Barrels({ getState }: { getState: () => GameState }) {
  const refs = useRef<(Group | null)[]>([]);

  useFrame(() => {
    const barrels = getState().barrels;
    barrels.forEach((barrel, index) => {
      const group = refs.current[index];
      if (group) {
        group.position.set(barrel.x, barrel.y + 0.35, 0);
        group.rotation.x += 0.08 * barrel.direction;
        group.visible = true;
      }
    });
    for (let i = barrels.length; i < refs.current.length; i++) {
      if (refs.current[i]) refs.current[i]!.visible = false;
    }
  });

  return (
    <group>
      {Array.from({ length: 12 }).map((_, index) => (
        <group
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          visible={false}
        >
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.5, 12]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Scene({ getState }: { getState: () => GameState }) {
  return (
    <>
      <color attach="background" args={["#0c0f14"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -3]} intensity={0.3} color="#f59e0b" />
      <Platforms />
      <Legacy getState={getState} />
      <Player getState={getState} />
      <Barrels getState={getState} />
    </>
  );
}
