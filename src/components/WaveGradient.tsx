import { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { WAVE_SHADERS } from '../lib/shaders/wave';

interface WaveGradientProps {
  width?: number;
  height?: number;
  resolution?: number;
}

export default function WaveGradient({
  width = 8,
  height = 8,
  resolution = 100,
}: WaveGradientProps) {
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColor: {
        value: [
          new THREE.Color('#d6f1ff'), // Pale ice blue
          new THREE.Color('#c0e4ef'), // Light frosty teal
          new THREE.Color('#9ad7e2'), // Deeper icy blue
          new THREE.Color('#e8fcff'), // Soft white-blue
        ],
      },
    };
  }, []);

  useFrame(() => {
    uniforms.uTime.value += 0.001;
  });

  return (
    <mesh>
      <planeGeometry args={[width, height, resolution, resolution]} />
      <shaderMaterial
        vertexShader={WAVE_SHADERS.vertex}
        fragmentShader={WAVE_SHADERS.fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}
