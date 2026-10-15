import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import { VolteoCharge, ToolsOrbit, InternshipOffice } from './NewProps'
import { BankFraud, GuestoRestaurant, HospitalApp, SperanzaDelivery, LinedataChat, EduPlatform } from './Props2'

/* ---------- themed level props (built from primitives) ---------- */

function Linedata({ c }) {
  const pulse = useRef()
  useFrame((s) => { const t = (s.clock.elapsedTime * 0.8) % 1; pulse.current.position.set(-1.4 + t * 2.8, 1.3 + Math.sin(t * Math.PI) * 0.8, 0) })
  return (
    <group>
      {[-1.4, 1.4].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <RoundedBox args={[1.3, 0.85, 0.08]} radius={0.04} position={[0, 1.1, 0]}>
            <meshStandardMaterial color="#0d1630" emissive={c} emissiveIntensity={0.35} />
          </RoundedBox>
          <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.08, 0.5, 0.08]} /><meshStandardMaterial color="#556" /></mesh>
          <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.6, 0.05, 0.35]} /><meshStandardMaterial color="#556" /></mesh>
        </group>
      ))}
      <mesh ref={pulse}><sphereGeometry args={[0.12, 16, 16]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.55, -1.1]}><boxGeometry args={[0.55, 1.1, 0.55]} /><meshStandardMaterial color="#1b2340" emissive={c} emissiveIntensity={0.15} /></mesh>
      ))}
    </group>
  )
}

function Speranza({ c }) {
  const pizza = useRef()
  useFrame((_, d) => (pizza.current.rotation.y += d * 0.8))
  return (
    <group>
      <mesh position={[-1, 0.6, -0.6]}><sphereGeometry args={[0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#b5563a" roughness={0.9} /></mesh>
      <mesh position={[-1, 0.45, 0.25]}><circleGeometry args={[0.35, 24, 0, Math.PI]} /><meshBasicMaterial color="#ffb347" toneMapped={false} /></mesh>
      <group ref={pizza} position={[1, 1.1, 0.3]} rotation={[0.35, 0, 0]}>
        <mesh><cylinderGeometry args={[0.85, 0.85, 0.08, 40]} /><meshStandardMaterial color="#f4c26b" /></mesh>
        <mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.75, 0.75, 0.03, 40]} /><meshStandardMaterial color="#d8402a" /></mesh>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[Math.cos(i * 0.9) * 0.45, 0.08, Math.sin(i * 0.9) * 0.45]}><cylinderGeometry args={[0.1, 0.1, 0.03, 16]} /><meshStandardMaterial color="#8a1d1d" /></mesh>
        ))}
      </group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[1.3, 0.12 + i * 0.13, -1]} rotation={[0, i * 0.2, 0]}><boxGeometry args={[0.7, 0.11, 0.7]} /><meshStandardMaterial color="#f1e3c8" /></mesh>
      ))}
      <Text position={[0, 2.2, 0]} fontSize={0.28} color={c} anchorX="center">20 commandes / jour</Text>
    </group>
  )
}

function RzProd({ c }) {
  const pin = useRef()
  useFrame((s) => (pin.current.position.y = 1.9 + Math.sin(s.clock.elapsedTime * 3) * 0.15))
  return (
    <group>
      <mesh position={[-0.8, 0.9, -0.8]}><coneGeometry args={[1.1, 1.8, 6]} /><meshStandardMaterial color="#5a6b4a" flatShading /></mesh>
      <mesh position={[-0.8, 1.6, -0.8]}><coneGeometry args={[0.38, 0.45, 6]} /><meshStandardMaterial color="#ffffff" flatShading /></mesh>
      <mesh position={[0.7, 0.6, -1.1]}><coneGeometry args={[0.8, 1.2, 6]} /><meshStandardMaterial color="#6f7f58" flatShading /></mesh>
      {[[1.3, 0.6], [0.9, 1.1], [1.6, -0.1], [-1.6, 0.8]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.05, 0.07, 0.5]} /><meshStandardMaterial color="#6b4a2b" /></mesh>
          <mesh position={[0, 0.7, 0]}><coneGeometry args={[0.3, 0.7, 7]} /><meshStandardMaterial color="#2f8f4e" flatShading /></mesh>
        </group>
      ))}
      <group ref={pin} position={[0.2, 1.9, 0.6]}>
        <mesh><sphereGeometry args={[0.22, 24, 24]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>
        <mesh position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.16, 0.4, 24]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>
      </group>
      <Text position={[0, 2.6, 0]} fontSize={0.26} color={c} anchorX="center">SOS · 100 % hors-ligne</Text>
    </group>
  )
}

function Smartovate({ c }) {
  const cubes = useRef([])
  const core = useRef()
  useFrame((s, d) => {
    cubes.current.forEach((m, i) => {
      if (!m) return
      const t = ((s.clock.elapsedTime * 0.35 + i / 6) % 1)
      m.position.set(-1.8 + t * 3.6, 0.45, 0.7)
      const fraud = i === 2
      m.material.color.set(t > 0.5 && fraud ? '#ff2d55' : c)
      m.scale.setScalar(t > 0.5 && fraud ? 1.3 : 1)
    })
    core.current.rotation.y += d
    core.current.rotation.x += d * 0.5
  })
  return (
    <group>
      <mesh position={[0, 0.25, 0.7]}><boxGeometry args={[4, 0.1, 0.5]} /><meshStandardMaterial color="#1b1430" /></mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} ref={(el) => (cubes.current[i] = el)}><boxGeometry args={[0.25, 0.25, 0.25]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>
      ))}
      <mesh position={[0, 0.7, 0.7]}><torusGeometry args={[0.55, 0.05, 12, 40]} /><meshBasicMaterial color="#ffc94f" toneMapped={false} /></mesh>
      <Float speed={2} floatIntensity={0.6}>
        <mesh ref={core} position={[0, 1.9, -0.6]}><octahedronGeometry args={[0.75, 0]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.4} flatShading /></mesh>
      </Float>
      {[0.6, 1, 0.8, 1.4, 1.1].map((h, i) => (
        <mesh key={i} position={[-1.6 + i * 0.3, h / 2, -1.2]}><boxGeometry args={[0.2, h, 0.2]} /><meshStandardMaterial color="#2a1f55" emissive="#7c5cff" emissiveIntensity={0.5} /></mesh>
      ))}
      <Text position={[0, 3.1, 0]} fontSize={0.3} color={c} anchorX="center">BOSS · Fraud Detector</Text>
    </group>
  )
}


function MedAI({ c }) {
  const chain = useRef()
  useFrame((s) => { chain.current.rotation.y = s.clock.elapsedTime * 0.6 })
  return (
    <group>
      <Float speed={2} floatIntensity={0.5}>
        <group position={[-0.6, 1.5, -0.4]}>
          <mesh><boxGeometry args={[1, 0.32, 0.32]} /><meshStandardMaterial color="#ff4d6d" /></mesh>
          <mesh><boxGeometry args={[0.32, 1, 0.32]} /><meshStandardMaterial color="#ff4d6d" /></mesh>
        </group>
      </Float>
      <group ref={chain} position={[0.9, 1.1, 0]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[Math.cos(i * 1.05) * 0.8, Math.sin(i * 2.1) * 0.25, Math.sin(i * 1.05) * 0.8]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.5} metalness={0.4} roughness={0.3} />
          </mesh>
        ))}
      </group>
      <mesh position={[-1.2, 0.35, 0.8]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.13, 0.3]} /><meshStandardMaterial color="#ffd166" /></mesh>
      <Text position={[0, 2.6, 0]} fontSize={0.26} color={c} anchorX="center">Llama 3.2 · NFT Polygon</Text>
    </group>
  )
}

function Mentora({ c }) {
  const ball = useRef()
  useFrame((s) => { ball.current.position.y = 0.3 + Math.abs(Math.sin(s.clock.elapsedTime * 3)) * 0.9 })
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-1, 0.1 + i * 0.18, -0.6]} rotation={[0, i * 0.25, 0]}><boxGeometry args={[0.9, 0.16, 0.65]} /><meshStandardMaterial color={['#ef476f', '#118ab2', '#ffd166'][i]} /></mesh>
      ))}
      <group position={[-1, 0.75, -0.6]}>
        <mesh><boxGeometry args={[0.7, 0.05, 0.7]} /><meshStandardMaterial color="#1d2235" /></mesh>
        <mesh position={[0, -0.12, 0]}><cylinderGeometry args={[0.22, 0.24, 0.2, 16]} /><meshStandardMaterial color="#1d2235" /></mesh>
      </group>
      <mesh ref={ball} position={[1, 0.3, 0.4]}><icosahedronGeometry args={[0.3, 1]} /><meshStandardMaterial color="#fff" flatShading /></mesh>
      <group position={[0.9, 0, -0.9]}>
        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.03, 0.03, 1]} /><meshStandardMaterial color="#555" /></mesh>
        <mesh position={[0, 1.1, 0]}><capsuleGeometry args={[0.12, 0.2]} /><meshStandardMaterial color={c} /></mesh>
      </group>
      <Text position={[0, 2.3, 0]} fontSize={0.26} color={c} anchorX="center">Gemini · Voix · Face ID</Text>
    </group>
  )
}

function Gallery({ c, items = [] }) {
  const g = useRef()
  useFrame((s) => { g.current.rotation.y = s.clock.elapsedTime * 0.25 })
  return (
    <group>
      <group ref={g} position={[0, 1.3, 0]}>
        {items.map((it, i) => {
          const a = (i / items.length) * Math.PI * 2
          return (
            <Float key={it.id} speed={2} floatIntensity={0.4}>
              <RoundedBox args={[0.7, 0.7, 0.12]} radius={0.08} position={[Math.cos(a) * 1.5, Math.sin(i) * 0.2, Math.sin(a) * 1.5]} rotation={[0, -a + Math.PI / 2, 0]}>
                <meshStandardMaterial color={it.color} emissive={it.color} emissiveIntensity={0.3} />
              </RoundedBox>
            </Float>
          )
        })}
      </group>
      <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.5, 0.6, 0.8, 8]} /><meshStandardMaterial color="#f1f5f9" flatShading /></mesh>
      <Text position={[0, 2.7, 0]} fontSize={0.26} color={c} anchorX="center">{items.length} projets perso</Text>
    </group>
  )
}

function Esprit({ c }) {
  const cap = useRef()
  useFrame((s) => { cap.current.rotation.y = s.clock.elapsedTime; cap.current.position.y = 2.2 + Math.sin(s.clock.elapsedTime * 2) * 0.12 })
  return (
    <group position={[0, 0, -0.6]}>
      <mesh position={[0, 0.08, 0]}><boxGeometry args={[2.6, 0.16, 1.2]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
      {[-1, -0.35, 0.35, 1].map((x) => (
        <mesh key={x} position={[x, 0.75, 0.35]}><cylinderGeometry args={[0.1, 0.1, 1.2, 12]} /><meshStandardMaterial color="#f8fafc" /></mesh>
      ))}
      <mesh position={[0, 0.75, -0.2]}><boxGeometry args={[2.3, 1.2, 0.5]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
      <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[1.85, 0.5, 4]} /><meshStandardMaterial color="#c8102e" flatShading /></mesh>
      <group ref={cap} position={[0, 2.2, 0.4]}>
        <mesh><boxGeometry args={[0.6, 0.05, 0.6]} /><meshStandardMaterial color="#1d2235" /></mesh>
        <mesh position={[0, -0.1, 0]}><cylinderGeometry args={[0.18, 0.2, 0.16, 16]} /><meshStandardMaterial color="#1d2235" /></mesh>
        <mesh position={[0.25, -0.12, 0.25]}><cylinderGeometry args={[0.02, 0.02, 0.25]} /><meshStandardMaterial color="#ffd166" /></mesh>
      </group>
      <Text position={[0, 3, 0.4]} fontSize={0.3} color={c} anchorX="center">ESPRIT · 2022 à 2027</Text>
    </group>
  )
}

function Forge({ c }) {
  const ring = useRef()
  useFrame((s, d) => { ring.current.rotation.z += d; ring.current.rotation.x = Math.sin(s.clock.elapsedTime) * 0.3 })
  const cols = ['#e81cff', '#2b77e7', '#11d3f3', '#f89b29', '#ffd200', '#ff4b1f']
  return (
    <group>
      <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.55, 0.7, 0.7, 6]} /><meshStandardMaterial color="#475569" flatShading /></mesh>
      <group ref={ring} position={[0, 1.6, 0]}>
        {cols.map((col, i) => (
          <mesh key={i} position={[Math.cos((i / 6) * Math.PI * 2) * 1, Math.sin((i / 6) * Math.PI * 2) * 1, 0]}>
            <octahedronGeometry args={[0.2, 0]} /><meshStandardMaterial color={col} emissive={col} emissiveIntensity={0.6} flatShading />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 1.6, 0]}><icosahedronGeometry args={[0.35, 0]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.8} flatShading /></mesh>
      <Text position={[0, 2.9, 0]} fontSize={0.26} color={c} anchorX="center">6 branches de compétences</Text>
    </group>
  )
}

const FLAGS = [
  { k: 'AR', bands: ['#e70013', '#e70013'], dot: '#fff' },
  { k: 'FR', bands: ['#0055a4', '#ffffff', '#ef4135'], v: true },
  { k: 'EN', bands: ['#012169', '#ffffff', '#c8102e'] },
  { k: 'DE', bands: ['#000000', '#dd0000', '#ffce00'] },
]
function Langues() {
  const refs = useRef([])
  useFrame((s) => refs.current.forEach((m, i) => m && (m.rotation.y = Math.sin(s.clock.elapsedTime * 2 + i) * 0.25)))
  return (
    <group>
      {FLAGS.map((f, i) => {
        const x = -1.5 + i * 1
        const n = f.bands.length
        return (
          <group key={f.k} position={[x, 0, (i % 2) * -0.6]}>
            <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.03, 0.03, 1.6]} /><meshStandardMaterial color="#64748b" /></mesh>
            <group ref={(el) => (refs.current[i] = el)} position={[0, 1.35, 0]}>
              {f.bands.map((b, k) => (
                <mesh key={k} position={f.v ? [0.12 + (k - (n - 1) / 2) * 0.17 + 0.17, 0, 0] : [0.3, ((n - 1) / 2 - k) * (0.4 / n), 0]}>
                  <boxGeometry args={f.v ? [0.17, 0.4, 0.02] : [0.52, 0.4 / n, 0.02]} /><meshStandardMaterial color={b} />
                </mesh>
              ))}
              {f.dot && <mesh position={[0.3, 0, 0.015]}><circleGeometry args={[0.1, 20]} /><meshBasicMaterial color={f.dot} /></mesh>}
            </group>
            <Text position={[0.3, 1.85, 0]} fontSize={0.2} color="#1d2235" anchorX="center">{f.k}</Text>
          </group>
        )
      })}
    </group>
  )
}

function Portal({ c }) {
  const r = useRef(), t = useRef()
  useFrame((s, d) => { r.current.rotation.z += d * 0.8; t.current.rotation.y += d * 1.2 })
  return (
    <group>
      <group position={[0.4, 1.5, -0.6]}>
        <mesh ref={r}><torusGeometry args={[1.05, 0.12, 16, 60]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.9} /></mesh>
        <mesh><circleGeometry args={[0.95, 48]} /><meshBasicMaterial color="#bfe7ff" transparent opacity={0.55} side={THREE.DoubleSide} /></mesh>
      </group>
      <group ref={t} position={[-1.5, 0, 0.6]}>
        <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.25, 0.3, 0.3, 12]} /><meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.25} /></mesh>
        <mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.06, 0.06, 0.5]} /><meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} /></mesh>
        <mesh position={[0, 0.95, 0]}><cylinderGeometry args={[0.35, 0.12, 0.45, 20]} /><meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} /></mesh>
      </group>
      <Text position={[0.4, 3, -0.6]} fontSize={0.3} color={c} anchorX="center">Prochain niveau : vous ?</Text>
    </group>
  )
}

function Volteo({ c }) {
  const bolt = useRef()
  useFrame((s) => { bolt.current.rotation.y = s.clock.elapsedTime * 1.5; bolt.current.position.y = 2.1 + Math.sin(s.clock.elapsedTime * 2) * 0.1 })
  return (
    <group>
      {[-0.9, 0.9].map((x) => (
        <group key={x} position={[x, 0, -0.6]}>
          <RoundedBox args={[0.6, 1.3, 0.4]} radius={0.08} position={[0, 0.65, 0]}><meshStandardMaterial color="#f8fafc" /></RoundedBox>
          <mesh position={[0, 0.95, 0.21]}><planeGeometry args={[0.4, 0.3]} /><meshBasicMaterial color={c} /></mesh>
          <mesh position={[0.32, 0.6, 0.1]} rotation={[0, 0, 0.3]}><torusGeometry args={[0.18, 0.025, 8, 20, Math.PI]} /><meshStandardMaterial color="#1d2235" /></mesh>
        </group>
      ))}
      <mesh position={[0, 0.25, 0.9]}><boxGeometry args={[1.2, 0.3, 0.6]} /><meshStandardMaterial color="#22c55e" /></mesh>
      <mesh position={[0, 0.48, 0.85]}><boxGeometry args={[0.7, 0.2, 0.5]} /><meshStandardMaterial color="#bbf7d0" /></mesh>
      <group ref={bolt} position={[0, 2.1, -0.6]}>
        <mesh rotation={[0, 0, 0.4]}><boxGeometry args={[0.14, 0.5, 0.08]} /><meshBasicMaterial color="#ffd60a" /></mesh>
        <mesh position={[0.06, -0.28, 0]} rotation={[0, 0, 0.4]}><boxGeometry args={[0.14, 0.4, 0.08]} /><meshBasicMaterial color="#ffd60a" /></mesh>
      </group>
      <Text position={[0, 2.8, -0.6]} fontSize={0.26} color={c} anchorX="center">OCPP 1.6J</Text>
    </group>
  )
}

function Italia({ c }) {
  return (
    <group position={[0, 0, -0.5]}>
      {[-0.9, 0, 0.9].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[-0.32, 0.6, 0]}><boxGeometry args={[0.16, 1.2, 0.4]} /><meshStandardMaterial color="#e7c9a0" /></mesh>
          <mesh position={[0.32, 0.6, 0]}><boxGeometry args={[0.16, 1.2, 0.4]} /><meshStandardMaterial color="#e7c9a0" /></mesh>
          <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.32, 0.09, 8, 16, Math.PI]} /><meshStandardMaterial color="#e7c9a0" /></mesh>
        </group>
      ))}
      <mesh position={[0, 1.5, 0]}><boxGeometry args={[2.7, 0.18, 0.42]} /><meshStandardMaterial color="#d9b88a" /></mesh>
      {['#009246', '#ffffff', '#ce2b37'].map((col, k) => (
        <mesh key={col} position={[-0.25 + k * 0.25, 2.05, 0]}><boxGeometry args={[0.25, 0.5, 0.03]} /><meshStandardMaterial color={col} /></mesh>
      ))}
      <Text position={[0, 2.6, 0]} fontSize={0.26} color={c} anchorX="center">Prisma · MySQL · JWT</Text>
    </group>
  )
}

function DevOps({ c }) {
  const g1 = useRef(), g2 = useRef(), box = useRef()
  useFrame((s, d) => {
    g1.current.rotation.z += d * 1.2; g2.current.rotation.z -= d * 1.6
    box.current.position.x = -1.6 + ((s.clock.elapsedTime * 0.6) % 1) * 3.2
  })
  return (
    <group>
      <group ref={g1} position={[-0.6, 1.5, -0.8]}>
        <mesh><cylinderGeometry args={[0.45, 0.45, 0.18, 10]} /><meshStandardMaterial color={c} flatShading /></mesh>
      </group>
      <group ref={g2} position={[0.3, 1.9, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh><torusGeometry args={[0.3, 0.1, 6, 10]} /><meshStandardMaterial color="#64748b" flatShading /></mesh>
      </group>
      <mesh position={[0, 0.2, 0.7]}><boxGeometry args={[3.4, 0.08, 0.5]} /><meshStandardMaterial color="#334155" /></mesh>
      <mesh ref={box} position={[0, 0.45, 0.7]}><boxGeometry args={[0.45, 0.4, 0.35]} /><meshStandardMaterial color="#0db7ed" /></mesh>
      {[0, 1, 2].map((k) => <mesh key={k} position={[1.3, 0.25 + k * 0.32, -0.6]}><boxGeometry args={[0.6, 0.3, 0.45]} /><meshStandardMaterial color={['#0db7ed', '#2496ed', '#1d63ed'][k]} /></mesh>)}
      <Text position={[0, 2.7, -0.6]} fontSize={0.26} color={c} anchorX="center">Jenkins → Sonar → Docker</Text>
    </group>
  )
}

function Table({ p, qr }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.05, 0.07, 0.9]} /><meshStandardMaterial color="#5b4636" /></mesh>
      <mesh position={[0, 0.92, 0]}><cylinderGeometry args={[0.55, 0.55, 0.06, 28]} /><meshStandardMaterial color="#f5efe6" /></mesh>
      {[-1, 1].map((sx) => (
        <group key={sx} position={[sx * 0.75, 0, 0]}>
          <mesh position={[0, 0.5, 0]}><boxGeometry args={[0.36, 0.06, 0.36]} /><meshStandardMaterial color="#e11d48" /></mesh>
          <mesh position={[sx * 0.16, 0.75, 0]}><boxGeometry args={[0.05, 0.5, 0.36]} /><meshStandardMaterial color="#e11d48" /></mesh>
          <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.03, 0.03, 0.5]} /><meshStandardMaterial color="#444" /></mesh>
        </group>
      ))}
      <group position={[0.1, 1.08, -0.1]} rotation={[-0.35, 0, 0]}>
        <mesh><boxGeometry args={[0.26, 0.26, 0.02]} /><meshStandardMaterial color="#fff" /></mesh>
        {qr.map((on, k) => on && <mesh key={k} position={[-0.088 + (k % 5) * 0.044, 0.088 - Math.floor(k / 5) * 0.044, 0.012]}><planeGeometry args={[0.04, 0.04]} /><meshBasicMaterial color="#111" /></mesh>)}
      </group>
    </group>
  )
}

/** Restaurant Guesto : réagit à la commande jouée dans la fiche (play.order = étape 0..5). */
function Guesto({ c, play }) {
  const step = play?.order ?? -1
  const tray = useRef(), bell = useRef(), stars = useRef()
  const qr = useMemo(() => Array.from({ length: 25 }, (_, k) => [0, 1, 3, 4, 5, 9, 12, 15, 19, 20, 21, 23, 24, 7, 17].includes(k)), [])
  const from = new THREE.Vector3(1.3, 1.25, -1.05), to = new THREE.Vector3(-0.35, 1.02, 0.55)
  useFrame((s, d) => {
    const t = s.clock.elapsedTime
    // plateau : apparaît en cuisine (étape 3) puis vole jusqu'à la table (étape 4+)
    const target = step >= 4 ? to : from
    tray.current.visible = step >= 3
    tray.current.position.lerp(target, Math.min(1, d * 3))
    tray.current.position.y += step === 4 ? Math.sin(t * 6) * 0.004 : 0
    bell.current.scale.setScalar(step === 2 ? 1 + Math.abs(Math.sin(t * 10)) * 0.4 : step > 2 ? 1 : 0.001)
    stars.current.visible = step >= 5
    stars.current.rotation.y = t * 1.5
  })
  return (
    <group>
      {/* cuisine */}
      <group position={[1.3, 0, -1.05]}>
        <mesh position={[0, 0.5, 0]}><boxGeometry args={[1.3, 1, 0.6]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
        <mesh position={[0, 1.02, 0]}><boxGeometry args={[1.4, 0.06, 0.7]} /><meshStandardMaterial color="#f8fafc" /></mesh>
        <mesh position={[-0.4, 1.45, -0.2]}><cylinderGeometry args={[0.14, 0.12, 0.25, 16]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh position={[-0.4, 1.65, -0.2]}><sphereGeometry args={[0.17, 16, 12]} /><meshStandardMaterial color="#fff" /></mesh>
        <Text position={[0, 1.95, 0]} fontSize={0.2} color={c} anchorX="center">CUISINE</Text>
      </group>
      <Table p={[-0.35, 0, 0.4]} qr={qr} />
      {/* plateau + cloche */}
      <group ref={tray} position={[1.3, 1.25, -1.05]}>
        <mesh><cylinderGeometry args={[0.24, 0.24, 0.03, 24]} /><meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.25} /></mesh>
        <mesh position={[0, 0.02, 0]}><sphereGeometry args={[0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} /></mesh>
        <mesh position={[0, 0.24, 0]}><sphereGeometry args={[0.035, 12, 12]} /><meshStandardMaterial color="#94a3b8" /></mesh>
      </group>
      {/* notification serveur */}
      <group ref={bell} position={[-1.7, 1.7, -0.6]}>
        <RoundedBox args={[0.38, 0.7, 0.05]} radius={0.05}><meshStandardMaterial color="#1d2235" /></RoundedBox>
        <mesh position={[0, 0, 0.03]}><planeGeometry args={[0.32, 0.6]} /><meshBasicMaterial color={c} /></mesh>
        <Text position={[0, 0.02, 0.04]} fontSize={0.2} color="#fff" anchorX="center">🔔</Text>
      </group>
      <group ref={stars} position={[-0.35, 1.9, 0.4]}>
        {[0, 1, 2, 3, 4].map((k) => (
          <mesh key={k} position={[Math.cos(k * 1.256) * 0.45, Math.sin(k * 2) * 0.08, Math.sin(k * 1.256) * 0.45]}><octahedronGeometry args={[0.08, 0]} /><meshBasicMaterial color="#facc15" /></mesh>
        ))}
      </group>
      <Text position={[0, 2.7, 0]} fontSize={0.26} color={c} anchorX="center">{step < 0 ? 'Commandez dans la fiche →' : ['QR scanné', 'Commande envoyée', 'Serveur notifié', 'En cuisine…', 'Servi à table !', 'Bon appétit ⭐'][step]}</Text>
    </group>
  )
}

const KEYS = 8
/** Studio Mag : piano 3D dont les touches s'enfoncent quand on joue dans la fiche. */
function Studio({ c, play }) {
  const keys = useRef([]), notes = useRef([]), spk = useRef([])
  const last = useRef(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    const n = play?.note
    if (n && n !== last.current) {
      last.current = n
      const free = notes.current.find((m) => m && m.userData.life <= 0)
      if (free) { free.userData.life = 1; free.position.set(-0.9 + n.i * 0.26, 1.2, 0.2) }
    }
    keys.current.forEach((k, i) => {
      if (!k) return
      const on = n && n.i === i && performance.now() - n.at < 220
      k.position.y = on ? 0.93 : 1
      k.material.color.set(on ? c : '#ffffff')
    })
    notes.current.forEach((m) => {
      if (!m) return
      m.userData.life -= 0.012
      m.visible = m.userData.life > 0
      m.position.y += 0.02
      m.position.x += Math.sin(t * 4 + m.position.y * 3) * 0.004
    })
    const beat = n && performance.now() - n.at < 300 ? 1.15 : 1 + Math.sin(t * 4) * 0.02
    spk.current.forEach((sp) => sp && sp.scale.setScalar(THREE.MathUtils.lerp(sp.scale.x, beat, 0.3)))
  })
  return (
    <group>
      {/* piano */}
      <group position={[0, 0, -0.2]}>
        <mesh position={[0, 0.85, 0]}><boxGeometry args={[2.3, 0.18, 0.7]} /><meshStandardMaterial color="#1e1b2e" /></mesh>
        {[-1, 1].map((x) => <mesh key={x} position={[x * 1.05, 0.4, 0]}><boxGeometry args={[0.12, 0.8, 0.6]} /><meshStandardMaterial color="#1e1b2e" /></mesh>)}
        {Array.from({ length: KEYS }).map((_, i) => (
          <mesh key={i} ref={(el) => (keys.current[i] = el)} position={[-0.91 + i * 0.26, 1, 0.12]}>
            <boxGeometry args={[0.24, 0.06, 0.45]} /><meshStandardMaterial color="#fff" />
          </mesh>
        ))}
        {[0, 1, 3, 4, 5].map((i) => <mesh key={i} position={[-0.78 + i * 0.26, 1.06, -0.02]}><boxGeometry args={[0.14, 0.06, 0.26]} /><meshStandardMaterial color="#111" /></mesh>)}
        <mesh position={[0, 1.35, -0.32]}><boxGeometry args={[2.3, 0.7, 0.06]} /><meshStandardMaterial color="#1e1b2e" /></mesh>
      </group>
      {/* enceintes */}
      {[-1.9, 1.9].map((x, k) => (
        <group key={x} position={[x, 0, -0.9]} ref={(el) => (spk.current[k] = el)}>
          <mesh position={[0, 0.6, 0]}><boxGeometry args={[0.6, 1.2, 0.5]} /><meshStandardMaterial color="#27272a" /></mesh>
          <mesh position={[0, 0.85, 0.26]}><circleGeometry args={[0.18, 24]} /><meshStandardMaterial color={c} /></mesh>
          <mesh position={[0, 0.35, 0.26]}><circleGeometry args={[0.1, 24]} /><meshStandardMaterial color={c} /></mesh>
        </group>
      ))}
      {/* guitare */}
      <group position={[-1.4, 0.7, 0.9]} rotation={[0, 0.4, 0.35]}>
        <mesh><sphereGeometry args={[0.28, 20, 16]} /><meshStandardMaterial color="#b45309" /></mesh>
        <mesh position={[0, 0.25, 0]}><sphereGeometry args={[0.2, 20, 16]} /><meshStandardMaterial color="#b45309" /></mesh>
        <mesh position={[0, 0.75, 0]}><boxGeometry args={[0.07, 0.7, 0.04]} /><meshStandardMaterial color="#3f2a14" /></mesh>
      </group>
      {Array.from({ length: 8 }).map((_, k) => (
        <Text key={k} ref={(el) => { if (el) { notes.current[k] = el; el.userData.life ??= 0 } }} fontSize={0.32} color={c} anchorX="center" visible={false}>{k % 2 ? '♫' : '♪'}</Text>
      ))}
      <Text position={[0, 2.5, 0]} fontSize={0.26} color={c} anchorX="center">Jouez du piano dans la fiche 🎹</Text>
    </group>
  )
}

/** DiscoverWay : globe + avion ; play.trip = destination réservée. */
function Travel({ c, play }) {
  const globe = useRef(), plane = useRef(), pin = useRef()
  const booked = !!play?.trip
  useFrame((s, d) => {
    const t = s.clock.elapsedTime
    globe.current.rotation.y += d * 0.3
    const sp = booked ? 2.2 : 0.8
    const a = t * sp
    plane.current.position.set(Math.cos(a) * 1.15, 1.6 + Math.sin(a * 2) * 0.15, Math.sin(a) * 1.15)
    plane.current.rotation.y = -a
    pin.current.visible = booked
    pin.current.position.y = 2.55 + Math.sin(t * 4) * 0.06
  })
  return (
    <group position={[0.3, 0, -0.3]}>
      <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.35, 0.45, 0.6, 12]} /><meshStandardMaterial color="#334155" /></mesh>
      <group ref={globe} position={[0, 1.6, 0]}>
        <mesh><sphereGeometry args={[0.75, 32, 24]} /><meshStandardMaterial color="#38bdf8" /></mesh>
        {[[0.3, 0.4, 0.55], [-0.5, 0.1, 0.5], [0.1, -0.35, 0.65], [0.6, -0.1, -0.4], [-0.3, 0.5, -0.5]].map((p, k) => (
          <mesh key={k} position={p}><sphereGeometry args={[0.24, 12, 10]} /><meshStandardMaterial color="#4ade80" flatShading /></mesh>
        ))}
      </group>
      <group ref={plane}>
        <mesh rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.06, 0.32]} /><meshStandardMaterial color="#fff" /></mesh>
        <mesh><boxGeometry args={[0.06, 0.02, 0.5]} /><meshStandardMaterial color={c} /></mesh>
      </group>
      <group ref={pin}>
        <mesh><sphereGeometry args={[0.12, 16, 16]} /><meshBasicMaterial color="#ef4444" /></mesh>
        <mesh position={[0, -0.18, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.09, 0.25, 16]} /><meshBasicMaterial color="#ef4444" /></mesh>
      </group>
      {/* valise + palmier */}
      <group position={[-1.6, 0, 0.8]}>
        <RoundedBox args={[0.5, 0.65, 0.25]} radius={0.06} position={[0, 0.33, 0]}><meshStandardMaterial color="#f97316" /></RoundedBox>
        <mesh position={[0, 0.72, 0]}><torusGeometry args={[0.1, 0.025, 8, 16, Math.PI]} /><meshStandardMaterial color="#1d2235" /></mesh>
      </group>
      <group position={[1.6, 0, 0.6]}>
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, 0.12]}><cylinderGeometry args={[0.06, 0.09, 1.4]} /><meshStandardMaterial color="#8b5a2b" /></mesh>
        {[0, 1, 2, 3, 4].map((k) => <mesh key={k} position={[0.08, 1.42, 0]} rotation={[0.5, (k * Math.PI * 2) / 5, 0]}><boxGeometry args={[0.1, 0.03, 0.7]} /><meshStandardMaterial color="#16a34a" /></mesh>)}
      </group>
      <Text position={[0, 3, 0]} fontSize={0.26} color={c} anchorX="center">{booked ? `Cap sur ${play.trip} ✈️` : 'Réservez un voyage →'}</Text>
    </group>
  )
}

function Tree({ p, s = 1 }) {
  return (
    <group position={p} scale={s}>
      <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.07, 0.1, 0.6]} /><meshStandardMaterial color="#7a5230" /></mesh>
      <mesh position={[0, 0.85, 0]}><icosahedronGeometry args={[0.42, 0]} /><meshStandardMaterial color="#5fae4f" flatShading /></mesh>
    </group>
  )
}

function Flag({ done, c }) {
  const f = useRef()
  useFrame((s) => {
    f.current.position.y = THREE.MathUtils.lerp(f.current.position.y, done ? 1.55 : 0.35, 0.05)
    f.current.rotation.y = Math.sin(s.clock.elapsedTime * 3) * 0.15
  })
  return (
    <group position={[2.1, 0, -1.3]}>
      <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.03, 0.03, 1.8]} /><meshStandardMaterial color="#555" /></mesh>
      <mesh ref={f} position={[0.25, 0.35, 0]}><boxGeometry args={[0.5, 0.32, 0.02]} /><meshStandardMaterial color={done ? c : '#bbb'} /></mesh>
    </group>
  )
}

function Bridge({ a, b, lit }) {
  const pts = useMemo(() => {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b)
    return Array.from({ length: 17 }, (_, k) => {
      const p = A.clone().lerp(B, (k + 1) / 18)
      p.y -= Math.sin(((k + 1) / 18) * Math.PI) * 0.5
      return p
    })
  }, [a, b])
  return pts.map((p, k) => (
    <mesh key={k} position={[p.x, p.y - 0.08, p.z]} rotation={[0, Math.atan2(b[0] - a[0], b[2] - a[2]), 0]}>
      <boxGeometry args={[0.9, 0.08, 0.35]} />
      <meshStandardMaterial color={lit ? '#c08a55' : '#d6dbe6'} />
    </mesh>
  ))
}


export const Props = { linedata: LinedataChat, speranza: SperanzaDelivery, rzprod: RzProd, smartovate: BankFraud, medai: HospitalApp, mentora: EduPlatform, gallery: Gallery, esprit: Esprit, forge: ToolsOrbit, langues: Langues, portal: InternshipOffice, volteo: VolteoCharge, italia: Italia, devops: DevOps, guesto: GuestoRestaurant, studio: Studio, travel: Travel }
export { Tree, Flag, Bridge }
