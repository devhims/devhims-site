'use client'; // TrianglesScene.js''
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

function Triangles() {
  // Reference to the plane geometry so we can modify vertex positions
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);

  useEffect(() => {
    const geometry = geometryRef.current;
    if (!geometry) return;

    // Access the plane’s position attributes
    const positions = geometry.attributes.position;
    // Randomly offset each vertex’s z-coordinate to get the triangulated 3D effect
    for (let i = 0; i < positions.count; i++) {
      const z = Math.random() * 0.4 - 0.2; // adjust range to taste
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
  }, []);

  // A simple shader pair that:
  //   - Passes UV coordinates to the fragment shader
  //   - Blends between two colors (purple/blue) based on the UV “y” coordinate
  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      // You can adjust these colors to match your original gradient more precisely
      vec3 colorA = vec3(0.4, 0.2, 0.6);  // purple
      vec3 colorB = vec3(0.2, 0.6, 0.8);  // blue
      vec3 color = mix(colorA, colorB, vUv.y);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh>
      {/* 
        args: [width, height, widthSegments, heightSegments]
        Increase subdivisions for more triangles 
      */}
      <planeGeometry args={[5, 5, 30, 30]} ref={geometryRef} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function TrianglesScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      {/* Optional: add ambient or directional light if you want shading */}
      <Triangles />
    </Canvas>
  );
}
