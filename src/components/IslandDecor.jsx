import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

/* Sol de chaque île : couleur + motif propre au projet */
export const GROUND = {
  medai: ['#eef4f7', '#c9d8e0'], mentora: ['#9fd47f', '#7fb862'], smartovate: ['#2a2540', '#463d6b'], rzprod: ['#8fcf6a', '#6aa84f'],
  volteo: ['#5b6470', '#3f464f'], studio: ['#2d2442', '#4b3d6e'], speranza: ['#f4e3c4', '#d9b98c'], linedata: ['#dfe8f2', '#b9c8d8'],
  italia: ['#ead6b2', '#cfb185'], devops: ['#aeb8c4', '#8c97a4'], guesto: ['#f1e4d0', '#d6c1a2'], travel: ['#9aa5ae', '#7b858e'],
  esprit: ['#e9ecef', '#c8102e'], forge: ['#4a3f3a', '#7a5a3a'], portal: ['#e8e1ff', '#b8a7f5'],
}

const M = ({ c, ...p }) => <meshStandardMaterial color={c} roughness={0.8} {...p} />

function Windows({ w, h, rows, cols, z, color = '#bfe3ff' }) {
  return Array.from({ length: rows * cols }).map((_, k) => {
    const r = Math.floor(k / cols), c = k % cols
    return <mesh key={k} position={[-w / 2 + (c + 0.5) * (w / cols), h * 0.18 + r * (h * 0.7 / rows), z]}><planeGeometry args={[w / cols * 0.55, h * 0.12]} /><meshBasicMaterial color={color} /></mesh>
  })
}

function Building({ p, w = 1.2, h = 1.4, d = 0.8, color = '#fff', roof, rows = 2, cols = 3, glow = '#bfe3ff', rotY = 0, children }) {
  return (
    <group position={p} rotation={[0, rotY, 0]}>
      <mesh position={[0, h / 2, 0]} castShadow><boxGeometry args={[w, h, d]} /><M c={color} /></mesh>
      {roof && <mesh position={[0, h + 0.04, 0]}><boxGeometry args={[w + 0.08, 0.08, d + 0.08]} /><M c={roof} /></mesh>}
      <Windows w={w} h={h} rows={rows} cols={cols} z={d / 2 + 0.005} color={glow} />
      {children}
    </group>
  )
}

function Parasol({ p, c = '#e11d48' }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.02, 0.02, 1.1]} /><M c="#666" /></mesh>
      <mesh position={[0, 1.1, 0]}><coneGeometry args={[0.55, 0.28, 8]} /><M c={c} /></mesh>
    </group>
  )
}

function Car({ p, c = '#ef4444', rotY = 0 }) {
  return (
    <group position={p} rotation={[0, rotY, 0]}>
      <RoundedBox args={[0.9, 0.25, 0.45]} radius={0.08} position={[0, 0.2, 0]}><M c={c} roughness={0.3} metalness={0.3} /></RoundedBox>
      <RoundedBox args={[0.5, 0.2, 0.4]} radius={0.06} position={[-0.05, 0.38, 0]}><meshStandardMaterial color="#bfe3ff" roughness={0.1} /></RoundedBox>
      {[[-0.28, 0.24], [0.28, 0.24], [-0.28, -0.24], [0.28, -0.24]].map(([x, z], k) => (
        <mesh key={k} position={[x, 0.09, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.09, 0.09, 0.06, 14]} /><M c="#111" /></mesh>
      ))}
    </group>
  )
}

function Smoke({ p }) {
  const g = useRef()
  useFrame((s) => g.current.children.forEach((m, k) => {
    const t = (s.clock.elapsedTime * 0.4 + k / 3) % 1
    m.position.y = t * 1.2; m.scale.setScalar(0.15 + t * 0.35); m.material.opacity = 0.6 * (1 - t)
  }))
  return <group ref={g} position={p}>{[0, 1, 2].map((k) => <mesh key={k}><sphereGeometry args={[0.5, 10, 8]} /><meshBasicMaterial color="#e5e7eb" transparent /></mesh>)}</group>
}

function Spot({ p, c, rotZ = 0 }) {
  const m = useRef()
  useFrame((s) => { m.current.material.opacity = 0.16 + Math.sin(s.clock.elapsedTime * 3 + rotZ * 5) * 0.06 })
  return (
    <group position={p} rotation={[0, 0, rotZ]}>
      <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.07, 0.1, 0.18, 10]} /><M c="#222" /></mesh>
      <mesh ref={m} position={[0, -1.1, 0]}><coneGeometry args={[0.55, 2, 18, 1, true]} /><meshBasicMaterial color={c} transparent opacity={0.18} side={THREE.DoubleSide} depthWrite={false} /></mesh>
    </group>
  )
}

/* Décor emblématique de chaque île (en plus du décor « projet ») */
export function IslandDecor({ theme, c }) {
  switch (theme) {
    case 'rzprod': return (
      <>
        <mesh position={[1.5, 0.02, -0.6]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.7, 28]} /><meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.2} /></mesh>
        <group position={[-1.5, 0, -0.2]}>
          <mesh position={[0, 0.35, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.45, 0.7, 4]} /><M c="#f59e0b" /></mesh>
        </group>
      </>
    )
    case 'volteo': return (
      <>
        {[-1, 0, 1].map((k) => <mesh key={k} position={[k * 0.9, 0.012, 0.9]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.04, 0.9]} /><meshBasicMaterial color="#fff" /></mesh>)}
        <group position={[1.6, 0, -1.6]} rotation={[0, -0.5, 0]}>
          <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.03, 0.03, 1]} /><M c="#555" /></mesh>
          <mesh position={[0, 1.02, 0]} rotation={[-0.6, 0, 0]}><boxGeometry args={[0.9, 0.04, 0.6]} /><meshStandardMaterial color="#1e3a8a" metalness={0.6} roughness={0.2} /></mesh>
        </group>
      </>
    )
    case 'studio': return (
      <>
        <Spot p={[-1.6, 2.6, 0.4]} c="#f472b6" rotZ={-0.4} />
        <Spot p={[1.6, 2.6, 0.4]} c="#60a5fa" rotZ={0.4} />
        <mesh position={[0, 0.06, 0.2]}><cylinderGeometry args={[2.0, 2.05, 0.1, 32]} /><M c="#1e1b2e" /></mesh>
      </>
    )
    case 'italia': return (
      <group position={[1.4, 0, 1.0]}>
        <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.55, 0.6, 0.3, 24]} /><M c="#e7d7bd" /></mesh>
        <mesh position={[0, 0.29, 0]}><cylinderGeometry args={[0.47, 0.47, 0.02, 24]} /><meshStandardMaterial color="#38bdf8" roughness={0.1} /></mesh>
        <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.05, 0.08, 0.5]} /><M c="#e7d7bd" /></mesh>
      </group>
    )
    case 'devops': return (
      <Building p={[-1.2, 0, -1.6]} w={1.3} h={1.0} d={0.8} color="#94a3b8" roof="#475569" rows={1} cols={3} glow="#fde68a">
        <mesh position={[0.4, 1.4, 0]}><cylinderGeometry args={[0.12, 0.14, 0.9, 14]} /><M c="#64748b" /></mesh>
        <Smoke p={[0.4, 1.9, 0]} />
      </Building>
    )
    case 'travel': return (
      <>
        <mesh position={[0, 0.013, 1.3]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[4.6, 0.7]} /><meshBasicMaterial color="#334155" /></mesh>
        {[-1.8, -0.9, 0, 0.9, 1.8].map((x) => <mesh key={x} position={[x, 0.016, 1.3]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.4, 0.06]} /><meshBasicMaterial color="#fff" /></mesh>)}
        <group position={[-1.6, 0, -1.4]}>
          <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.12, 0.16, 1.8, 12]} /><M c="#e5e7eb" /></mesh>
          <mesh position={[0, 1.9, 0]}><cylinderGeometry args={[0.35, 0.25, 0.3, 12]} /><meshStandardMaterial color="#7dd3fc" roughness={0.1} /></mesh>
        </group>
      </>
    )
    default: return null
  }
}

/* Socle d'île « premium » : couches de terrain, falaises en strates, rochers, fleurs, éclats flottants */
export function IslandBase({ theme, locked, active, color }) {
  const [top, edge] = locked ? ['#d5dcea', '#b7c1d6'] : (GROUND[theme] ?? ['#e3dc9f', '#c9b37a'])
  const rocks = useMemo(() => Array.from({ length: 10 }, (_, k) => {
    const a = (k / 10) * Math.PI * 2 + Math.sin(k * 7) * 0.2
    return { x: Math.cos(a) * 2.55, z: Math.sin(a) * 2.55, s: 0.12 + ((k * 37) % 10) / 60, r: k }
  }), [])
  const shards = useRef()
  useFrame((s) => { if (shards.current) shards.current.rotation.y = s.clock.elapsedTime * 0.15 })
  return (
    <group>
      {/* dessus : gazon / sol avec bord biseauté */}
      <mesh position={[0, -0.12, 0]} receiveShadow><cylinderGeometry args={[2.85, 2.95, 0.24, 28]} /><meshStandardMaterial color={top} roughness={0.9} /></mesh>
      <mesh position={[0, -0.3, 0]}><cylinderGeometry args={[2.95, 2.75, 0.14, 28]} /><meshStandardMaterial color={edge} roughness={0.95} /></mesh>
      {/* falaise en strates */}
      <mesh position={[0, -0.7, 0]}><cylinderGeometry args={[2.75, 2.3, 0.66, 12]} /><meshStandardMaterial color={locked ? '#a9b3c8' : '#9a6a43'} flatShading roughness={1} /></mesh>
      <mesh position={[0, -1.3, 0]}><cylinderGeometry args={[2.3, 1.6, 0.6, 11]} /><meshStandardMaterial color={locked ? '#98a3ba' : '#7d5435'} flatShading roughness={1} /></mesh>
      <mesh position={[0, -2.1, 0]}><coneGeometry args={[1.6, 1.1, 10]} /><meshStandardMaterial color={locked ? '#8b96ad' : '#5e4130'} flatShading roughness={1} /></mesh>
      {/* rochers sur le bord */}
      {!locked && rocks.map((r) => (
        <mesh key={r.r} position={[r.x, 0.02, r.z]} rotation={[r.r, r.r * 2, 0]}><dodecahedronGeometry args={[r.s, 0]} /><meshStandardMaterial color="#9ca3af" flatShading roughness={1} /></mesh>
      ))}
      {/* éclats de roche qui flottent sous l'île */}
      <group ref={shards} position={[0, -2.2, 0]}>
        {[0, 1, 2].map((k) => (
          <mesh key={k} position={[Math.cos(k * 2.1) * 2.2, -0.4 - k * 0.25, Math.sin(k * 2.1) * 2.2]}><dodecahedronGeometry args={[0.22 - k * 0.04, 0]} /><meshStandardMaterial color={locked ? '#98a3ba' : '#7d5435'} flatShading /></mesh>
        ))}
      </group>
      {/* halo lumineux sous l'île active */}
      {active && <pointLight position={[0, 1.6, 1.5]} intensity={6} distance={7} color={color} />}
    </group>
  )
}
