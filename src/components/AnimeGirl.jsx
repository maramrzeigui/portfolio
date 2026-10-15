import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Html } from '@react-three/drei'
import * as THREE from 'three'
import { CHIBI, drawChibi } from '../anime/chibi'
import realPhoto from '../assets/maram.png'

/**
 * Mini-Maram : illustration anime (chibi) dessinée et animée en temps réel sur un canvas,
 * affichée face caméra dans la scène 3D.
 * anim : 'idle' | 'walk' | 'run' · wave : salut de la main · dirRef.current : -1 / 1 (sens de marche)
 */
export default function AnimeGirl({ anim = 'idle', wave = false, level, dirRef, ...props }) {
  const { canvas, tex } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = CHIBI.W; canvas.height = CHIBI.H
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return { canvas, tex }
  }, [])
  useEffect(() => () => tex.dispose(), [tex])
  const ctx = useMemo(() => canvas.getContext('2d'), [canvas])
  const plane = useRef()
  const blinkAt = useRef(2)
  const acc = useRef(0)

  const h = 2.0
  const w = (h * CHIBI.W) / CHIBI.H

  useFrame((s, d) => {
    acc.current += d
    if (acc.current < 1 / 40) return // ~40 images/s suffisent pour un dessin animé
    acc.current = 0
    const t = s.clock.elapsedTime
    if (t > blinkAt.current + 0.14) blinkAt.current = t + 2.4 + Math.random() * 2.5
    drawChibi(ctx, { t, walk: anim !== 'idle', run: anim === 'run', blink: t > blinkAt.current, wave })
    tex.needsUpdate = true
    const dir = dirRef?.current ?? 1
    plane.current.scale.x = THREE.MathUtils.lerp(plane.current.scale.x, dir, 0.25)
  })

  return (
    <group {...props}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}><circleGeometry args={[0.36, 32]} /><meshBasicMaterial color="#000" transparent opacity={0.18} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}><ringGeometry args={[0.42, 0.5, 48]} /><meshBasicMaterial color="#b83f72" transparent opacity={0.85} /></mesh>
      <Billboard lockX lockZ>
        <mesh ref={plane} position={[0, h / 2 - 0.02, 0]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={tex} transparent alphaTest={0.35} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </Billboard>
      {level != null && (
        <Html zIndexRange={[4, 0]} center position={[0, h + 0.25, 0]} distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <div className="nametag"><img src={realPhoto} alt="" /><b>Maram</b><span>LVL {level}</span></div>
        </Html>
      )}
    </group>
  )
}
