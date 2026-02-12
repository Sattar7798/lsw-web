'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Vertex Shader: Gentle wave animation
const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Wave equation: Combined sine waves for natural flutter
  float elevation = sin(pos.x * 1.5 + uTime * 0.8) * 0.3 
                  + sin(pos.y * 1.0 + uTime * 0.5) * 0.1
                  + sin(pos.x * 3.0 + uTime * 1.5) * 0.05; // High freq ripple

  pos.z += elevation;
  vElevation = elevation;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

// Fragment Shader: Texture + Gold Tint + Fade
const fragmentShader = `
uniform sampler2D uTexture;
uniform float uOpacity;
varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  
  // Add a golden sheen based on elevation (fake lighting)
  float sheen = smoothstep(0.0, 0.2, vElevation);
  vec3 gold = vec3(1.0, 0.84, 0.0);
  
  // Mix texture with gold sheen
  vec3 finalColor = mix(textureColor.rgb, gold, sheen * 0.2);
  
  // Output with low opacity for "faint" background effect
  gl_FragColor = vec4(finalColor, uOpacity * textureColor.a); 
  
  // If texture has no alpha (jpg), calculate alpha from brightness or just use constant
  if (textureColor.a >= 0.9) {
      gl_FragColor.a = uOpacity;
  }
}
`

function Flag() {
    const mesh = useRef<THREE.Mesh>(null)
    const texture = useTexture('/lion-and-sun-flag.jpg')

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTexture: { value: texture },
        uOpacity: { value: 0.4 } // Increased opacity for better visibility
    }), [texture])

    useFrame((state) => {
        if (mesh.current && mesh.current.material instanceof THREE.ShaderMaterial) {
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    return (
        <mesh ref={mesh} rotation={[0.1, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 13, 32, 32]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                transparent={true}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    )
}

export default function WavingFlag() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Flag />
                </Suspense>
            </Canvas>
        </div>
    )
}
