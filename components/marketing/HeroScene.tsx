'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function KeychainModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} scale={1.5} position={[0, -0.3, 0]}>
        {/* Main body */}
        <RoundedBox args={[1.2, 1.6, 0.15]} radius={0.12} smoothness={4} castShadow>
          <meshPhysicalMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.5}
          />
        </RoundedBox>

        {/* QR Code face */}
        <RoundedBox args={[0.85, 0.85, 0.02]} radius={0.02} smoothness={4} position={[0, -0.05, 0.085]} castShadow>
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0.3}
            clearcoat={0.5}
          />
        </RoundedBox>

        {/* QR pattern dots */}
        {[
          [-0.25, 0.2], [-0.25, 0.05], [-0.25, -0.1], [-0.25, -0.25],
          [-0.1, 0.2], [-0.1, -0.25],
          [0.05, 0.2], [0.05, 0.05], [0.05, -0.1],
          [0.2, 0.2], [0.2, -0.1], [0.2, -0.25],
          [-0.1, 0.05], [0.2, 0.05],
          [-0.1, -0.1], [0.05, -0.25],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y - 0.05, 0.1]}>
            <boxGeometry args={[0.1, 0.1, 0.01]} />
            <meshPhysicalMaterial color="#1a1a2e" metalness={0.3} roughness={0.5} />
          </mesh>
        ))}

        {/* Brand accent strip (purple) */}
        <RoundedBox args={[1.2, 0.25, 0.155]} radius={0.06} smoothness={4} position={[0, 0.65, 0]} castShadow>
          <meshPhysicalMaterial
            color="#6C5CE7"
            metalness={0.6}
            roughness={0.2}
            clearcoat={1}
            emissive="#6C5CE7"
            emissiveIntensity={0.3}
          />
        </RoundedBox>

        {/* Ring at top */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <torusGeometry args={[0.2, 0.04, 16, 32]} />
          <meshPhysicalMaterial
            color="#C0C0C0"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1}
          />
        </mesh>

        {/* Teal accent line */}
        <mesh position={[0, -0.6, 0.078]}>
          <boxGeometry args={[0.9, 0.04, 0.005]} />
          <meshPhysicalMaterial
            color="#00B894"
            emissive="#00B894"
            emissiveIntensity={0.5}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* "VOUCH" text bar at bottom */}
        <RoundedBox args={[0.5, 0.12, 0.02]} radius={0.02} smoothness={4} position={[0, -0.72, 0.078]}>
          <meshPhysicalMaterial
            color="#6C5CE7"
            emissive="#6C5CE7"
            emissiveIntensity={0.2}
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

function GlowOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.3) * 3;
      orb1Ref.current.position.y = Math.cos(t * 0.4) * 1.5;
      const s = 1.0 + Math.sin(t * 1.5) * 0.08;
      orb1Ref.current.scale.set(s, s, s);
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.2) * 2.5;
      orb2Ref.current.position.y = Math.sin(t * 0.35) * 1.5;
      const s = 1.0 + Math.cos(t * 1.2) * 0.06;
      orb2Ref.current.scale.set(s, s, s);
    }
  });

  return (
    <>
      <mesh ref={orb1Ref} position={[3, 1, -3]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#6C5CE7"
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh ref={orb2Ref} position={[-2.5, -1, -2]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#00B894"
          transparent
          opacity={0.12}
        />
      </mesh>
    </>
  );
}

export function HeroScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <hemisphereLight color="#ffffff" groundColor="#06060b" intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-3, 2, 4]} intensity={0.8} color="#6C5CE7" />
          <pointLight position={[3, -2, 3]} intensity={0.6} color="#00B894" />
          <spotLight
            position={[0, 5, 3]}
            angle={0.4}
            penumbra={0.8}
            intensity={1.0}
            castShadow
          />

          <KeychainModel />
          <GlowOrbs />

          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.3}
            scale={8}
            blur={2.5}
            far={4}
          />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

