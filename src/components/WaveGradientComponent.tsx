'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';

interface WaveGradientProps {
  width?: number;
  height?: number;
  resolution?: number;
  colors?: [string, string, string, string];
  speed?: number;

  // NEW PROP to control wave randomness/amplitude
  waveIntensity?: number;
}

// Updated shaders to include `uWaveIntensity`
const WAVE_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uWaveIntensity;
  uniform vec3 uColor[4];
  varying vec2 vUv;
  varying vec3 vColor;

  //	Simplex 3D Noise 
  //	by Ian McEwan, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 noiseCoord = uv * vec2(2.0, 3.0);
    
    // Multiply wave offsets by uWaveIntensity
    float wave = sin(noiseCoord.x * 10.0 + uTime) * 0.1 * uWaveIntensity;
    wave += sin(noiseCoord.y * 8.0 + uTime) * 0.1 * uWaveIntensity;
    
    // Multiply noise component by uWaveIntensity as well
    float noiseVal = snoise(vec3(noiseCoord.x + uTime, noiseCoord.y, uTime * 5.0));
    vec3 pos = vec3(position.x, position.y, position.z + wave + noiseVal * 0.2 * uWaveIntensity);

    // Gradual color transitions
    vColor = uColor[3];
    for (int i = 0; i < 3; i++) {
      float noiseFlow = 3.0 + float(i) * 0.5;
      float noiseSpeed = 5.0 + float(i) * 0.5;
      vec2 noiseFreq = vec2(1.0, 1.2) * 0.8;
      
      float noise = smoothstep(0.2, 0.8, snoise(vec3(
        noiseCoord.x * noiseFreq.x + uTime * noiseFlow,
        noiseCoord.y * noiseFreq.y,
        uTime * noiseSpeed
      )));

      vColor = mix(vColor, uColor[i], noise);
    }

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const WAVE_FRAGMENT_SHADER = `
  varying vec2 vUv;
  varying vec3 vColor;

  void main() {
    vec4 color = vec4(vColor, 1.0);
    gl_FragColor = color;
  }
`;

function WaveGradientMesh({
  colors = ['#d6f1ff', '#c0e4ef', '#9ad7e2', '#e8fcff'],
  speed = 0.001,
  waveIntensity = 1.0,
}: WaveGradientProps) {
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColor: {
        value: colors.map((color) => new THREE.Color(color)),
      },
      uWaveIntensity: { value: waveIntensity },
    };
  }, [colors, waveIntensity]);

  useFrame(() => {
    uniforms.uTime.value += speed;
  });

  const { viewport } = useThree();

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 100, 100]} />
      <shaderMaterial
        vertexShader={WAVE_VERTEX_SHADER}
        fragmentShader={WAVE_FRAGMENT_SHADER}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export interface WaveGradientComponentProps {
  className?: string;
  style?: React.CSSProperties;
  waveIntensity?: number;
  colors?: [string, string, string, string];
  speed?: number;
}

export default function WaveGradientComponent({
  className,
  style,
  ...props
}: WaveGradientComponentProps) {
  return (
    <div
      className={`absolute inset-0 ${className || ''}`}
      style={{
        ...style,
      }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 100] }}
        style={{ width: '100%', height: '100%' }}
      >
        <WaveGradientMesh {...props} />
      </Canvas>
    </div>
  );
}
