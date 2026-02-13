'use client'

import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

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
    // Load logo - ensure path is correct. 
    // If it fails, it might be due to missing Suspense boundary in parent.
    const texture = useTexture('/lion-and-sun-flag.jpg')

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTexture: { value: texture },
        uOpacity: { value: 0.25 } // Very Faint as requested
    }), [texture])

    useFrame((state) => {
        if (mesh.current && mesh.current.material instanceof THREE.ShaderMaterial) {
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    return (
        <mesh ref={mesh} rotation={[0.1, 0, 0]} position={[0, 0, 0]}>
            {/* Aspect ratio kept, but size increased to fill more space */}
            <planeGeometry args={[14, 9, 32, 32]} />
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

export default function ResistanceNetwork() {
    const [activeNodes, setActiveNodes] = useState(0)

    // Real-Time Stats Fetching
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats')
                const data = await res.json()
                if (data.count !== undefined) {
                    setActiveNodes(data.count)
                }
            } catch (e) {
                console.error('Failed to fetch stats', e)
            }
        }

        fetchStats()
        const interval = setInterval(fetchStats, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full h-full bg-[#050505] rounded-3xl overflow-hidden border border-[#d4af37]/20 shadow-2xl group flex flex-col items-center justify-center">

            {/* 3D Flag Background */}
            <div className="absolute inset-0 z-0 opacity-100">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Flag />
                    </Suspense>
                    <ambientLight intensity={1} />
                </Canvas>
            </div>

            {/* Overlay Gradient for Data Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80 pointer-events-none z-10 opacity-90"></div>

            {/* Content UI */}
            <div className="relative z-20 text-center space-y-8 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-2 font-lalezar drop-shadow-[0_0_25px_rgba(212,175,55,0.8)]">
                        فرزندان شیر و خورشید ایران
                    </h2>
                    <p className="text-[#d4af37] text-lg font-vazir mb-8 opacity-80">
                        پرچم ما، هویت ماست.
                    </p>
                </motion.div>

                {/* Counter Badge */}
                <div className="inline-flex items-center gap-6 bg-black/60 backdrop-blur-md border border-[#d4af37]/30 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    <div className="text-right">
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-sans mb-1">
                            تعداد کارت‌های صادر شده
                        </div>
                        <div className="text-4xl font-mono font-bold text-white tabular-nums tracking-wider drop-shadow-md">
                            {activeNodes.toLocaleString()}
                        </div>
                    </div>
                    {/* Pulsing Dot */}
                    <div className="relative w-3 h-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                </div>
            </div>

            {/* Decorative Overlay - Scanlines/Grain */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-20 mix-blend-overlay bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        </div>
    )
}
