import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import { siPython, siReact, siFlutter, siDocker, siKotlin, siSwift, siSpringboot, siNestjs, siLaravel, siApachekafka, siFirebase, siTypescript } from 'simple-icons'

/* ---------- Volteo : voiture électrique branchée qui se recharge ---------- */
function EVCar({ p, rotY = 0, color = '#e5e7eb' }) {
  return (
    <group position={p} rotation={[0, rotY, 0]}>
      {/* carrosserie basse et fluide */}
      <RoundedBox args={[1.9, 0.36, 0.86]} radius={0.16} smoothness={4} position={[0, 0.34, 0]} castShadow>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.22} />
      </RoundedBox>
      {/* habitacle vitré */}
      <RoundedBox args={[1.05, 0.34, 0.74]} radius={0.15} smoothness={4} position={[-0.1, 0.62, 0]}>
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.08} />
      </RoundedBox>
      {/* phares LED + feux */}
      <mesh position={[0.95, 0.38, 0.26]}><boxGeometry args={[0.02, 0.05, 0.22]} /><meshBasicMaterial color="#e0f2fe" /></mesh>
      <mesh position={[0.95, 0.38, -0.26]}><boxGeometry args={[0.02, 0.05, 0.22]} /><meshBasicMaterial color="#e0f2fe" /></mesh>
      <mesh position={[-0.95, 0.42, 0]}><boxGeometry args={[0.02, 0.04, 0.7]} /><meshBasicMaterial color="#ef4444" /></mesh>
      {/* roues */}
      {[[-0.6, 0.42], [0.6, 0.42], [-0.6, -0.42], [0.6, -0.42]].map(([x, z], k) => (
        <group key={k} position={[x, 0.17, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh><cylinderGeometry args={[0.17, 0.17, 0.1, 22]} /><meshStandardMaterial color="#111827" roughness={0.6} /></mesh>
          <mesh position={[0, z > 0 ? 0.051 : -0.051, 0]}><cylinderGeometry args={[0.1, 0.1, 0.01, 16]} /><meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} /></mesh>
        </group>
      ))}
    </group>
  )
}

export function VolteoCharge({ c }) {
  const pulses = useRef([]), bar = useRef(), label = useRef()
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.9, 0.75, -0.55), new THREE.Vector3(-0.75, 0.2, -0.2), new THREE.Vector3(-0.35, 0.12, 0.15), new THREE.Vector3(-0.15, 0.42, 0.42),
  ]), [])
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.025, 8, false), [curve])
  useFrame((s) => {
    const t = s.clock.elapsedTime
    pulses.current.forEach((m, k) => { if (m) m.position.copy(curve.getPoint(((t * 0.6) + k / 3) % 1)) })
    const pct = 20 + ((t * 6) % 80)
    if (bar.current) { bar.current.scale.x = pct / 100; bar.current.position.x = -0.35 + (0.7 * pct / 100) / 2 }
    if (label.current) label.current.text = `${Math.round(pct)} %`
  })
  return (
    <group>
      {/* borne */}
      <group position={[-0.9, 0, -0.75]}>
        <RoundedBox args={[0.5, 1.3, 0.32]} radius={0.06} position={[0, 0.65, 0]}><meshStandardMaterial color="#f8fafc" /></RoundedBox>
        <mesh position={[0, 0.95, 0.165]}><planeGeometry args={[0.34, 0.26]} /><meshBasicMaterial color={c} /></mesh>
        <mesh position={[0, 1.33, 0]}><boxGeometry args={[0.52, 0.04, 0.34]} /><meshBasicMaterial color={c} /></mesh>
      </group>
      <mesh geometry={tube}><meshStandardMaterial color="#1f2937" roughness={0.5} /></mesh>
      {[0, 1, 2].map((k) => <mesh key={k} ref={(el) => (pulses.current[k] = el)}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color="#facc15" /></mesh>)}
      <EVCar p={[0.55, 0, 0.55]} rotY={-0.25} />
      {/* jauge de charge au-dessus de la voiture */}
      <group position={[0.55, 1.35, 0.55]}>
        <RoundedBox args={[0.82, 0.18, 0.04]} radius={0.05}><meshStandardMaterial color="#0f172a" /></RoundedBox>
        <mesh ref={bar} position={[0, 0, 0.025]}><planeGeometry args={[0.7, 0.1]} /><meshBasicMaterial color="#22c55e" /></mesh>
        <Text ref={label} position={[0, 0.22, 0]} fontSize={0.16} color="#16a34a" anchorX="center">20 %</Text>
      </group>
    </group>
  )
}

/* ---------- Inventaire : vrais logos des outils en orbite ---------- */
const TOOLS = [siPython, siReact, siFlutter, siDocker, siKotlin, siSwift, siSpringboot, siNestjs, siLaravel, siApachekafka, siFirebase, siTypescript]
function logoTexture(icon) {
  const c = document.createElement('canvas'); c.width = c.height = 256
  const x = c.getContext('2d')
  x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(8, 8, 240, 240, 48); x.fill()
  x.translate(48, 48); x.scale(160 / 24, 160 / 24)
  x.fillStyle = `#${icon.hex}`; x.fill(new Path2D(icon.path))
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
  return t
}
export function ToolsOrbit({ c }) {
  const g = useRef(), core = useRef()
  const texs = useMemo(() => TOOLS.map(logoTexture), [])
  useFrame((s, d) => {
    g.current.rotation.y += d * 0.35
    g.current.children.forEach((m) => m.lookAt(s.camera.position))
    core.current.rotation.y -= d * 0.6
  })
  return (
    <group>
      <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.55, 0.7, 0.5, 24]} /><meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0, 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.35, 0.55, 40]} /><meshBasicMaterial color={c} /></mesh>
      <mesh ref={core} position={[0, 1.15, 0]}><icosahedronGeometry args={[0.32, 1]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.6} metalness={0.4} roughness={0.2} /></mesh>
      <group ref={g} position={[0, 1.2, 0]}>
        {texs.map((t, k) => {
          const a = (k / texs.length) * Math.PI * 2
          return (
            <mesh key={k} position={[Math.cos(a) * 1.55, Math.sin(k * 1.7) * 0.35, Math.sin(a) * 1.55]}>
              <planeGeometry args={[0.46, 0.46]} /><meshBasicMaterial map={t} transparent toneMapped={false} side={THREE.DoubleSide} />
            </mesh>
          )
        })}
      </group>
      <Text position={[0, 2.35, 0]} fontSize={0.24} color={c} anchorX="center">Mes outils au quotidien</Text>
    </group>
  )
}

/* ---------- Portail final : bureau d'entreprise, le stage PFE ---------- */
export function InternshipOffice({ c }) {
  const door = useRef(), cal = useRef()
  useFrame((s) => {
    door.current.material.emissiveIntensity = 0.5 + Math.sin(s.clock.elapsedTime * 2) * 0.3
    cal.current.position.y = 1.5 + Math.sin(s.clock.elapsedTime * 1.5) * 0.06
  })
  return (
    <group>
      {/* façade d'entreprise avec porte lumineuse */}
      <group position={[0.2, 0, -1.6]}>
        <mesh position={[0, 1.1, 0]}><boxGeometry args={[2.4, 2.2, 0.5]} /><meshStandardMaterial color="#f1f5f9" /></mesh>
        {[-0.8, 0.8].map((x) => [0.7, 1.5].map((y) => (
          <mesh key={`${x}${y}`} position={[x, y, 0.26]}><planeGeometry args={[0.45, 0.42]} /><meshStandardMaterial color="#bae6fd" metalness={0.5} roughness={0.1} /></mesh>
        )))}
        <mesh ref={door} position={[0, 0.6, 0.26]}><planeGeometry args={[0.6, 1.2]} /><meshStandardMaterial color="#fff7ed" emissive={c} emissiveIntensity={0.6} /></mesh>
        <mesh position={[0, 2.35, 0.1]}><boxGeometry args={[1.9, 0.38, 0.1]} /><meshStandardMaterial color={c} /></mesh>
        <Text position={[0, 2.35, 0.17]} fontSize={0.18} color="#ffffff" anchorX="center">VOTRE ENTREPRISE</Text>
      </group>
      {/* bureau avec ordinateur portable, CV et mallette */}
      <group position={[-1.2, 0, 0.5]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, 0.7, 0]}><boxGeometry args={[1.1, 0.06, 0.6]} /><meshStandardMaterial color="#8b5a2b" /></mesh>
        {[[-0.5, -0.25], [0.5, -0.25], [-0.5, 0.25], [0.5, 0.25]].map(([x, z], k) => <mesh key={k} position={[x, 0.35, z]}><boxGeometry args={[0.05, 0.7, 0.05]} /><meshStandardMaterial color="#5b3a1f" /></mesh>)}
        <group position={[-0.15, 0.74, 0]}>
          <mesh><boxGeometry args={[0.42, 0.02, 0.3]} /><meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} /></mesh>
          <mesh position={[0, 0.15, -0.14]} rotation={[-0.25, 0, 0]}><boxGeometry args={[0.42, 0.3, 0.02]} /><meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} /></mesh>
          <mesh position={[0, 0.15, -0.128]} rotation={[-0.25, 0, 0]}><planeGeometry args={[0.38, 0.26]} /><meshBasicMaterial color={c} /></mesh>
        </group>
        <mesh position={[0.3, 0.735, 0.05]} rotation={[-Math.PI / 2, 0, 0.2]}><planeGeometry args={[0.22, 0.3]} /><meshStandardMaterial color="#ffffff" /></mesh>
        <Text position={[0.3, 0.74, 0.05]} rotation={[-Math.PI / 2, 0, 0.2]} fontSize={0.06} color="#111827" anchorX="center">CV</Text>
      </group>
      <group position={[1.6, 0, 0.9]} rotation={[0, -0.4, 0]}>
        <RoundedBox args={[0.6, 0.42, 0.2]} radius={0.05} position={[0, 0.21, 0]}><meshStandardMaterial color="#3f2a1d" /></RoundedBox>
        <mesh position={[0, 0.47, 0]} rotation={[0, 0, 0]}><torusGeometry args={[0.1, 0.025, 8, 16, Math.PI]} /><meshStandardMaterial color="#1f1510" /></mesh>
      </group>
      {/* calendrier « 6 mois » */}
      <group ref={cal} position={[1.5, 1.5, -0.4]}>
        <RoundedBox args={[0.7, 0.7, 0.05]} radius={0.06}><meshStandardMaterial color="#ffffff" /></RoundedBox>
        <mesh position={[0, 0.25, 0.03]}><planeGeometry args={[0.7, 0.2]} /><meshBasicMaterial color={c} /></mesh>
        <Text position={[0, 0.25, 0.04]} fontSize={0.09} color="#fff" anchorX="center">STAGE PFE</Text>
        <Text position={[0, -0.05, 0.04]} fontSize={0.2} color="#111827" anchorX="center">6 mois</Text>
      </group>
    </group>
  )
}
