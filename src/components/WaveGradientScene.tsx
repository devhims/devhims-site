'use client';

import { Canvas } from '@react-three/fiber';
import WaveGradient from './WaveGradient';

interface WaveGradientSceneProps {
  width?: string | number;
  height?: string | number;
  planeWidth?: number;
  planeHeight?: number;
}

export default function WaveGradientScene({
  width = '100vw',
  height = '100vh',
  planeWidth = 8,
  planeHeight = 8,
}: WaveGradientSceneProps) {
  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        camera={{ position: [0, 0, 2], fov: 75 }}
      >
        <WaveGradient width={planeWidth} height={planeHeight} />
      </Canvas>
    </div>
  );
}
