'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { noise } from '@/constants';

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform sampler2D uNoiseTexture;
uniform sampler2D uNoiseTexture2;
uniform vec2 uResolution;

varying vec2 vUv;

#define TAU 6.2831853071

void main() {
    vec2 uv = vUv;

    // Sample one of the noise textures to create a subtle vertical displacement (o)
    float o = texture2D(uNoiseTexture, uv * 0.25 + vec2(0.0, uTime * 0.05)).r;

    // Sample the second noise texture and map it from [-1,1] (this is d)
    float d = texture2D(
        uNoiseTexture2, 
        uv * 0.25 - vec2(0.0, uTime * 0.04 + o * 0.04)
    ).r * 2.0 - 1.0;

    // Use one of the noise textures again to create an offset for sine waves
    vec2 waveOffset = texture2D(
        uNoiseTexture, 
        uv * 0.5 + vec2(uTime * 0.1, uTime * 0.07)
    ).rg * 2.0 - 1.0;

    // Combine multiple sine waves with slightly different speeds/frequencies
    // and incorporate the noise offset to break up the regularity.
    float wave = 0.0;
    wave += sin(uTime * 0.6 + uv.x * TAU * 1.5 + waveOffset.x * 2.0) * 0.02;
    wave += sin(uTime * 0.3 - uv.x * TAU * 3.0 + waveOffset.y * 3.0) * 0.015;
    wave += sin(uTime * 0.9 + uv.x * TAU * 2.0 + waveOffset.x * 4.0) * 0.01;

    // Combine everything into 'v': vertical gradient + noise-based displacement + waves
    float v = uv.y + d * 0.1 + wave;

    // Flip + mirror around the center to make the aurora wrap nicely
    v = 1.0 - abs(v * 2.0 - 1.0);

    // Add some dynamic power shaping over time to give the aurora a "breathing" effect
    float timePower = 2.0 + sin(uTime * 0.2) * 0.5;
    float noisePower = sin((uTime * 0.2 + d * 0.25) * TAU) * 0.5;
    v = pow(v, timePower + noisePower);

    // Base color logic
    vec3 color = vec3(0.0);
    float x = (1.0 - uv.x * 0.75);
    float y = 1.0 - abs(uv.y * 2.0 - 1.0);
    float colorShift = sin(uTime * 0.3) * 0.1;
    color += vec3(
        x * (0.5 + colorShift),
        y,
        x * (1.0 - colorShift)
    ) * v;

    // Subtle sparkly flickers
    vec2 seed = gl_FragCoord.xy;
    vec2 r;
    r.x = fract(sin((seed.x * 12.9898) + (seed.y * 78.2330)) * 43758.5453);
    r.y = fract(sin((seed.x * 53.7842) + (seed.y * 47.5134)) * 43758.5453);
    float s = mix(
        r.x,
        (sin((uTime * 2.5 + 60.0) * r.y) * 0.5 + 0.5) * (r.y * r.y) * (r.y * r.y),
        0.04
    ); 
    color += pow(s, 70.0) * (1.0 - v);

    // Pseudo blur by sampling neighboring UVs
vec3 glowColor = vec3(0.0);
float offset = 0.002; // tune the blur radius
for (int i = -2; i <= 2; i++) {
    for (int j = -2; j <= 2; j++) {
        vec2 coordOffset = vec2(float(i), float(j)) * offset;
        // Recompute your mask or color at uv + coordOffset
        // But be mindful of performance
        float neighborMask = 1.0 - abs(((uv + coordOffset).y) * 2.0 - 1.0);
        glowColor += vec3(neighborMask);
    }
}

// Average it
glowColor /= 25.0;
// Choose a glow tint, e.g., greenish
glowColor *= vec3(0.0, 1.0, 0.8);

// Add a fraction of it to final color
color += glowColor * 0.1;

// Right after you have color
float flicker = texture2D(uNoiseTexture2, uv * 5.0 + vec2(uTime * 2.0)).r;
flicker = flicker * 0.3; // adjust intensity


color += color * flicker;

    gl_FragColor = vec4(color, 1.0);
}
`;

export default function AuroraEffect({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    // Capture ref value at the start of the effect
    const container = containerRef.current;
    if (!container) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create noise textures
    const noiseLoader = new THREE.TextureLoader();
    const noiseTexture = noiseLoader.load(noise);
    const noiseTexture2 = noiseLoader.load(noise);
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;
    noiseTexture2.wrapS = noiseTexture2.wrapT = THREE.RepeatWrapping;

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNoiseTexture: { value: noiseTexture },
        uNoiseTexture2: { value: noiseTexture2 },
        uResolution: { value: new THREE.Vector2() },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    materialRef.current = material;

    // Create mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !material.uniforms.uResolution) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation loop with consistent time update
    const animate = (timestamp: number) => {
      if (!material || !renderer || !scene || !camera) return;

      // Update time at a consistent rate
      const deltaTime = timestamp - (timeRef.current || timestamp);
      timeRef.current = timestamp;

      material.uniforms.uTime.value += deltaTime * 0.001; // Convert to seconds and adjust speed
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (renderer) {
        renderer.dispose();
        container?.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative ${className}`}
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: 'transparent',
      }}
    />
  );
}
