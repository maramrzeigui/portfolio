import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const prep = (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t }

/** Panneau d'entrée de l'île avec le vrai logo du projet / de l'entreprise. */
export function LogoSign({ src, color, position = [-1.25, 0, -1.95] }) {
  const tex = prep(useTexture(src))
  const ratio = tex.image ? tex.image.width / tex.image.height : 1
  const w = ratio >= 1 ? 1.3 : 1.3 * ratio
  const h = ratio >= 1 ? 1.3 / ratio : 1.3
  return (
    <group position={position} rotation={[0, 0.35, 0]}>
      {[-1, 1].map((sg) => (
        <mesh key={sg} position={[sg * (w / 2 + 0.02), (1.15 + h) / 2, -0.04]}><cylinderGeometry args={[0.035, 0.035, 1.15 + h + 0.2]} /><meshStandardMaterial color="#7a5230" /></mesh>
      ))}
      <RoundedBox args={[w + 0.24, h + 0.24, 0.08]} radius={0.06} position={[0, 1.15 + h / 2, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </RoundedBox>
      <mesh position={[0, 1.15 + h / 2, 0.045]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.15 - 0.06, 0.045]}><planeGeometry args={[w + 0.24, 0.05]} /><meshBasicMaterial color={color} /></mesh>
    </group>
  )
}

/** Écran flottant qui fait défiler les vraies captures (téléphone si portrait, moniteur si paysage). */
export function Showcase({ shots, position = [0.7, 2.75, -1.7] }) {
  const texs = useTexture(shots.map((s) => s.src)).map(prep)
  const [k, setK] = useState(0)
  const g = useRef()
  useEffect(() => { const id = setInterval(() => setK((x) => (x + 1) % texs.length), 2600); return () => clearInterval(id) }, [texs.length])
  const img = texs[k].image
  const ratio = img ? img.width / img.height : 0.5
  const portrait = ratio < 1
  const [w, h] = portrait ? [0.95 * ratio / 0.5 * 0.5, 0.95 * 2 * 0.5 / 0.5 * 0.5] : [1.5, 1.5 / ratio]
  const W = portrait ? 0.62 : w, H = portrait ? 0.62 / ratio : h
  useFrame((s) => {
    g.current.rotation.y = -0.45 + Math.sin(s.clock.elapsedTime * 0.6) * 0.12
    g.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 1.2) * 0.06
  })
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ toneMapped: false }), [])
  mat.map = texs[k]; mat.needsUpdate = true
  return (
    <group ref={g} position={position}>
      <RoundedBox args={[W + 0.08, H + 0.08, 0.05]} radius={portrait ? 0.06 : 0.03}>
        <meshStandardMaterial color="#14121c" metalness={0.4} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0, 0.027]} material={mat}><planeGeometry args={[W, H]} /></mesh>
      {!portrait && <mesh position={[0, -H / 2 - 0.2, -0.05]}><boxGeometry args={[0.08, 0.36, 0.05]} /><meshStandardMaterial color="#14121c" /></mesh>}
      {shots.length > 1 && shots.map((_, n) => (
        <mesh key={n} position={[(n - (shots.length - 1) / 2) * 0.07, -H / 2 - 0.1, 0.03]}><circleGeometry args={[n === k ? 0.022 : 0.014, 12]} /><meshBasicMaterial color={n === k ? '#b83f72' : '#cbd5e1'} /></mesh>
      ))}
    </group>
  )
}
