import React from 'react';
import WaveGradientComponent from '@/components/WaveGradientComponent';

export default function Wave() {
  return (
    <>
      <WaveGradientComponent waveIntensity={1.5} className='-z-10' />
      <h1>Your page content</h1>
    </>
  );
}
