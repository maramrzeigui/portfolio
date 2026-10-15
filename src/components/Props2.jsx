import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

/* ============ briques communes ============ */
const M = ({ c, ...p }) => <meshStandardMaterial color={c} roughness={0.7} {...p} />

/** Personnage simplifié (médecin, serveur, banquier, étudiant…) */
export function Person({ p, rotY = 0, outfit = '#ffffff', pants = '#334155', skin = '#f1c7a5', hair = '#3b2418', holding, coat, scale = 1 }) {
  const g = useRef()
  useFrame((s) => { g.current.position.y = p[1] + Math.abs(Math.sin(s.clock.elapsedTime * 1.6 + p[0])) * 0.02 })
  return (
    <group ref={g} position={p} rotation={[0, rotY, 0]} scale={scale}>
      {[-0.07, 0.07].map((x) => <mesh key={x} position={[x, 0.22, 0]}><capsuleGeometry args={[0.055, 0.32]} /><M c={pants} /></mesh>)}
      <mesh position={[0, 0.62, 0]}><capsuleGeometry args={[0.15, 0.28]} /><M c={outfit} /></mesh>
      {coat && <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.16, 0.21, 0.42, 16]} /><M c={coat} /></mesh>}
      <mesh position={[0, 1.0, 0]}><sphereGeometry args={[0.13, 20, 16]} /><M c={skin} /></mesh>
      <mesh position={[0, 1.06, -0.02]}><sphereGeometry args={[0.135, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} /><M c={hair} /></mesh>
      {[-1, 1].map((sg) => <mesh key={sg} position={[sg * 0.2, 0.62, 0.05]} rotation={[-0.6, 0, sg * 0.1]}><capsuleGeometry args={[0.04, 0.25]} /><M c={coat ?? outfit} /></mesh>)}
      {holding}
    </group>
  )
}

/** Écran d'application dessiné sur canvas (téléphone, tablette, moniteur) */
export function useScreen(w, h, draw, deps = []) {
  const { canvas, tex } = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8
    return { canvas, tex }
  }, [w, h])
  useEffect(() => { draw(canvas.getContext('2d'), w, h); tex.needsUpdate = true }, deps) // eslint-disable-line
  useEffect(() => () => tex.dispose(), [tex])
  return tex
}
const rr = (x, X, Y, W, H, r, fill) => { x.beginPath(); x.roundRect(X, Y, W, H, r); x.fillStyle = fill; x.fill() }
const txt = (x, s, X, Y, size, color = '#111827', weight = 600) => { x.font = `${weight} ${size}px Poppins, Arial`; x.fillStyle = color; x.fillText(s, X, Y) }

function Phone({ p, rotY = 0, tex, w = 0.42, h = 0.84, float = true }) {
  const g = useRef()
  useFrame((s) => { if (float) g.current.position.y = p[1] + Math.sin(s.clock.elapsedTime * 1.4 + p[0]) * 0.05 })
  return (
    <group ref={g} position={p} rotation={[0, rotY, 0]}>
      <RoundedBox args={[w + 0.05, h + 0.05, 0.04]} radius={0.05}><meshStandardMaterial color="#111827" metalness={0.5} roughness={0.3} /></RoundedBox>
      <mesh position={[0, 0, 0.022]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
    </group>
  )
}
function Monitor({ p, rotY = 0, tex, w = 1.1, h = 0.68 }) {
  return (
    <group position={p} rotation={[0, rotY, 0]}>
      <RoundedBox args={[w + 0.06, h + 0.06, 0.05]} radius={0.03} position={[0, h / 2 + 0.35, 0]}><meshStandardMaterial color="#1f2937" /></RoundedBox>
      <mesh position={[0, h / 2 + 0.35, 0.027]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
      <mesh position={[0, 0.17, -0.02]}><boxGeometry args={[0.06, 0.34, 0.06]} /><M c="#374151" /></mesh>
      <mesh position={[0, 0.01, 0]}><boxGeometry args={[0.4, 0.02, 0.24]} /><M c="#374151" /></mesh>
    </group>
  )
}

/* ============ 1. Smartovate : banque, distributeur, détection de fraude ============ */
export function BankFraud({ c }) {
  const cards = useRef([]), alertRef = useRef()
  const atm = useScreen(256, 200, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#0b3b66'); txt(x, 'RETRAIT', 18, 40, 24, '#fff', 800)
    rr(x, 18, 60, W - 36, 40, 8, '#1e5a8f'); txt(x, '200 DT', 30, 88, 20, '#fff')
    rr(x, 18, 112, W - 36, 40, 8, '#1e5a8f'); txt(x, 'Solde', 30, 140, 20, '#fff')
    txt(x, 'Analyse IA en cours…', 18, 182, 15, '#7dd3fc', 500)
  })
  const dash = useScreen(360, 220, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#0f0a1e'); txt(x, 'Fraud Detection · temps réel', 14, 30, 17, '#f0abfc', 700)
    ;[60, 90, 120, 150, 180].forEach((y, k) => {
      const bad = k === 2
      rr(x, 14, y - 18, W - 28, 26, 6, bad ? '#7f1d1d' : '#1f1b33')
      txt(x, `TX-${4821 + k}`, 24, y, 13, '#e5e7eb', 500)
      txt(x, bad ? 'FRAUDE 0.97' : `OK 0.0${k + 2}`, W - 118, y, 13, bad ? '#fecaca' : '#86efac', 700)
    })
  })
  useFrame((s) => {
    const t = s.clock.elapsedTime
    cards.current.forEach((m, k) => {
      if (!m) return
      const u = ((t * 0.35) + k / 4) % 1
      m.position.set(-1.6 + u * 3.0, 0.42 + Math.sin(u * Math.PI) * 0.15, 1.15)
      const fraud = k === 1 && u > 0.5
      m.material.color.set(fraud ? '#ef4444' : '#e2e8f0')
    })
    alertRef.current.material.opacity = 0.5 + Math.sin(t * 6) * 0.4
  })
  return (
    <group>
      {/* façade de banque à colonnes */}
      <group position={[-0.2, 0, -1.7]}>
        <mesh position={[0, 0.08, 0]}><boxGeometry args={[2.6, 0.16, 1.0]} /><M c="#e2e8f0" /></mesh>
        {[-1, -0.35, 0.35, 1].map((x) => <mesh key={x} position={[x, 0.8, 0.35]}><cylinderGeometry args={[0.1, 0.11, 1.3, 14]} /><M c="#f8fafc" /></mesh>)}
        <mesh position={[0, 0.8, -0.2]}><boxGeometry args={[2.3, 1.3, 0.4]} /><M c="#cbd5e1" /></mesh>
        <mesh position={[0, 1.6, 0.1]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 0.42]}><coneGeometry args={[1.85, 0.45, 4]} /><M c="#475569" /></mesh>
        <Text position={[0, 1.55, 0.6]} fontSize={0.2} color="#0f172a" anchorX="center">BANQUE</Text>
      </group>
      {/* distributeur automatique */}
      <group position={[1.6, 0, -0.6]} rotation={[0, -0.6, 0]}>
        <RoundedBox args={[0.7, 1.45, 0.45]} radius={0.05} position={[0, 0.72, 0]}><M c="#334155" metalness={0.4} /></RoundedBox>
        <mesh position={[0, 1.05, 0.23]}><planeGeometry args={[0.52, 0.4]} /><meshBasicMaterial map={atm} toneMapped={false} /></mesh>
        <mesh position={[0, 0.72, 0.24]}><boxGeometry args={[0.36, 0.04, 0.03]} /><M c="#111827" /></mesh>
        <mesh position={[0, 0.5, 0.24]}><boxGeometry args={[0.4, 0.14, 0.02]} /><M c="#64748b" /></mesh>
      </group>
      {/* tableau de bord IA */}
      <Monitor p={[-1.25, 0, 0.35]} rotY={0.45} tex={dash} w={1.15} h={0.7} />
      {/* flux de cartes passées au scanner IA */}
      <mesh position={[0, 0.4, 1.15]}><boxGeometry args={[0.12, 0.6, 0.6]} /><meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.6} transparent opacity={0.55} /></mesh>
      {[0, 1, 2, 3].map((k) => (
        <mesh key={k} ref={(el) => (cards.current[k] = el)} rotation={[-0.2, 0, 0]}><boxGeometry args={[0.32, 0.02, 0.2]} /><meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} /></mesh>
      ))}
      <mesh ref={alertRef} position={[1.0, 1.25, 1.15]}><circleGeometry args={[0.17, 24]} /><meshBasicMaterial color="#ef4444" transparent /></mesh>
      <Text position={[1.0, 1.25, 1.16]} fontSize={0.2} color="#fff" anchorX="center" anchorY="middle">!</Text>
    </group>
  )
}

/* ============ 2. Guesto : restaurant, serveur, appli, QR code ============ */
export function GuestoRestaurant({ c, play }) {
  const step = play?.order ?? -1
  const app = useScreen(200, 400, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#fff7ed'); txt(x, 'guesto', 16, 40, 26, '#111827', 800)
    txt(x, 'Table 7 · Menu', 16, 70, 14, '#9a3412', 600)
    ;['Café crème', 'Croissant', 'Pizza', 'Citronnade'].forEach((n, k) => {
      rr(x, 12, 90 + k * 64, W - 24, 54, 10, '#ffffff'); txt(x, n, 24, 122 + k * 64, 15)
      rr(x, W - 52, 104 + k * 64, 30, 26, 8, c); txt(x, '+', W - 43, 123 + k * 64, 18, '#fff', 800)
    })
    rr(x, 12, H - 60, W - 24, 44, 12, c); txt(x, step >= 0 ? 'Commande envoyée ✓' : 'Commander', 30, H - 32, 15, '#fff', 700)
  }, [step, c])
  const qr = useMemo(() => Array.from({ length: 49 }, (_, k) => [0, 1, 2, 4, 5, 6, 7, 13, 14, 20, 28, 34, 35, 41, 42, 43, 44, 46, 47, 48, 10, 17, 24, 31, 38, 23, 25, 19, 29].includes(k)), [])
  return (
    <group>
      {/* comptoir + cuisine */}
      <group position={[1.1, 0, -1.4]}>
        <mesh position={[0, 0.5, 0]}><boxGeometry args={[1.6, 1.0, 0.6]} /><M c="#7c2d12" /></mesh>
        <mesh position={[0, 1.02, 0]}><boxGeometry args={[1.7, 0.06, 0.7]} /><M c="#f5f5f4" /></mesh>
        <mesh position={[-0.4, 1.15, 0]}><cylinderGeometry args={[0.12, 0.12, 0.18, 16]} /><M c="#d6d3d1" metalness={0.6} /></mesh>
        <mesh position={[0, 1.6, -0.25]}><boxGeometry args={[1.6, 0.5, 0.05]} /><M c="#1c1917" /></mesh>
        <Text position={[0, 1.6, -0.22]} fontSize={0.16} color="#fde68a" anchorX="center">MENU · CAFÉ · DESSERTS</Text>
      </group>
      {/* présentoir QR code géant sur la table */}
      <group position={[-0.5, 0, 0.5]}>
        <mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.04, 0.06, 0.9]} /><M c="#57534e" /></mesh>
        <mesh position={[0, 0.9, 0]}><cylinderGeometry args={[0.6, 0.6, 0.05, 28]} /><M c="#fafaf9" /></mesh>
        <group position={[0, 1.18, 0]} rotation={[-0.15, 0, 0]}>
          <mesh><boxGeometry args={[0.42, 0.5, 0.03]} /><M c="#ffffff" /></mesh>
          {qr.map((on, k) => on && <mesh key={k} position={[-0.15 + (k % 7) * 0.05, 0.2 - Math.floor(k / 7) * 0.05, 0.017]}><planeGeometry args={[0.046, 0.046]} /><meshBasicMaterial color="#111" /></mesh>)}
          <Text position={[0, -0.2, 0.02]} fontSize={0.05} color={c} anchorX="center">SCANNEZ POUR COMMANDER</Text>
        </group>
        {[-0.85, 0.85].map((x) => <mesh key={x} position={[x, 0.45, 0]}><boxGeometry args={[0.36, 0.06, 0.36]} /><M c={c} /></mesh>)}
      </group>
      {/* serveur avec plateau */}
      <Person p={[-1.8, 0, -0.6]} rotY={0.6} outfit="#111827" pants="#111827" coat="#ffffff"
        holding={<group position={[0.24, 0.85, 0.12]}><mesh><cylinderGeometry args={[0.2, 0.2, 0.02, 20]} /><M c="#d6d3d1" metalness={0.6} /></mesh><mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.06, 0.05, 0.1, 14]} /><M c="#fff" /></mesh></group>} />
      <Phone p={[0.8, 1.7, 0.9]} rotY={-0.4} tex={app} />
    </group>
  )
}

/* ============ 3. MedAIChain : hôpital, médecin, appli ordonnances / dossier patient ============ */
export function HospitalApp({ c }) {
  const rx = useScreen(200, 400, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#fff1f2'); txt(x, 'Ordonnance', 16, 40, 22, '#9f1239', 800)
    txt(x, 'NFT #2041 · vérifiée ✓', 16, 66, 12, '#16a34a', 600)
    ;['Amoxicilline 1 g', 'Paracétamol 500', 'Vitamine D'].forEach((n, k) => { rr(x, 12, 86 + k * 58, W - 24, 48, 10, '#fff'); txt(x, n, 24, 116 + k * 58, 14) })
    rr(x, 12, 270, W - 24, 90, 12, '#ffe4e6'); txt(x, 'IA : urgence faible', 22, 300, 13, '#be123c', 700); txt(x, '20 biomarqueurs lus', 22, 324, 12, '#881337', 500)
  })
  const profile = useScreen(300, 200, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#ffffff'); rr(x, 0, 0, W, 44, 0, c); txt(x, 'Dossier patient', 14, 29, 17, '#fff', 700)
    x.beginPath(); x.arc(40, 84, 24, 0, Math.PI * 2); x.fillStyle = '#fecdd3'; x.fill()
    txt(x, 'Sarra B. · 34 ans', 76, 80, 15); txt(x, 'Groupe A+ · Allergie : aucune', 76, 100, 11, '#6b7280', 500)
    ;['Glycémie 0.92', 'Cholestérol 1.8', 'Hémoglobine 13.4'].forEach((n, k) => { rr(x, 14, 122 + k * 24, W - 28, 20, 5, '#f1f5f9'); txt(x, n, 22, 137 + k * 24, 11, '#334155', 500) })
  })
  return (
    <group>
      {/* médecin qui consulte le dossier sur tablette */}
      <Person p={[-0.4, 0, 0.4]} rotY={0.3} outfit="#bfdbfe" pants="#1e3a8a" coat="#ffffff" hair="#4b5563"
        holding={<group position={[0.1, 0.8, 0.25]} rotation={[-0.5, 0, 0]}><mesh><boxGeometry args={[0.36, 0.26, 0.02]} /><M c="#111827" /></mesh><mesh position={[0, 0, 0.012]}><planeGeometry args={[0.33, 0.22]} /><meshBasicMaterial map={profile} toneMapped={false} /></mesh></group>} />
      <mesh position={[-0.4, 1.08, 0.53]}><torusGeometry args={[0.06, 0.012, 8, 16, Math.PI]} /><M c="#64748b" /></mesh>
      {/* lit d'hôpital */}
      <group position={[1.3, 0, -0.5]} rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.7, 0.12, 1.4]} /><M c="#e2e8f0" /></mesh>
        <mesh position={[0, 0.55, 0.05]}><boxGeometry args={[0.66, 0.08, 1.2]} /><M c="#ffffff" /></mesh>
        <mesh position={[0, 0.62, -0.5]}><boxGeometry args={[0.5, 0.08, 0.3]} /><M c="#fecdd3" /></mesh>
        {[[-0.3, -0.6], [0.3, -0.6], [-0.3, 0.6], [0.3, 0.6]].map(([X, Z], k) => <mesh key={k} position={[X, 0.2, Z]}><cylinderGeometry args={[0.03, 0.03, 0.4]} /><M c="#94a3b8" /></mesh>)}
      </group>
      <Phone p={[1.1, 1.75, 0.6]} rotY={-0.5} tex={rx} />
      <Monitor p={[-1.7, 0, -0.6]} rotY={0.7} tex={profile} w={0.9} h={0.6} />
    </group>
  )
}

/* ============ 5. Speranza : restaurant + livraison + commande en ligne ============ */
export function SperanzaDelivery({ c }) {
  const scooter = useRef(), notif = useRef()
  const order = useScreen(200, 400, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#111111'); txt(x, 'Speranza pizza', 14, 40, 20, '#fbbf24', 800)
    ;['Margherita · 9 €', 'Burger maison · 11 €', 'Tacos XL · 10 €'].forEach((n, k) => { rr(x, 12, 70 + k * 64, W - 24, 52, 10, '#262626'); txt(x, n, 22, 101 + k * 64, 13, '#fff', 500) })
    rr(x, 12, 280, W - 24, 46, 12, '#f97316'); txt(x, 'Payer · Stripe', 40, 309, 15, '#fff', 700)
    txt(x, 'Livraison 30 min', 46, 360, 13, '#a3a3a3', 500)
  })
  useFrame((s) => {
    const t = s.clock.elapsedTime
    const a = t * 0.5
    scooter.current.position.set(Math.cos(a) * 1.9, 0, Math.sin(a) * 1.9 + 0.2)
    scooter.current.rotation.y = -a
    notif.current.scale.setScalar(0.85 + Math.abs(Math.sin(t * 2)) * 0.2)
  })
  return (
    <group>
      {/* façade du vrai restaurant : bandeau noir et lettres jaunes */}
      <group position={[0, 0, -1.6]}>
        <mesh position={[0, 0.85, 0]}><boxGeometry args={[2.6, 1.7, 0.6]} /><M c="#f5f5f4" /></mesh>
        <mesh position={[0, 1.75, 0.05]} rotation={[0.5, 0, 0]}><boxGeometry args={[2.8, 0.06, 0.9]} /><M c="#6b4f3a" /></mesh>
        <mesh position={[0, 1.42, 0.31]}><boxGeometry args={[2.4, 0.34, 0.04]} /><M c="#111111" /></mesh>
        <Text position={[0, 1.42, 0.34]} fontSize={0.2} color="#fbbf24" anchorX="center" anchorY="middle">Speranza  Pizza</Text>
        <mesh position={[0, 0.65, 0.31]}><planeGeometry args={[1.2, 1.0]} /><M c="#d4d4d4" metalness={0.5} /></mesh>
        {[-0.95, 0.95].map((x) => <mesh key={x} position={[x, 0.75, 0.31]}><planeGeometry args={[0.4, 1.2]} /><M c="#111111" /></mesh>)}
      </group>
      {/* scooter de livraison qui tourne autour de l'île */}
      <group ref={scooter}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[0, 0.25, 0]}><boxGeometry args={[0.5, 0.12, 0.18]} /><M c="#f97316" /></mesh>
          {[-0.2, 0.2].map((x) => <mesh key={x} position={[x, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.06, 14]} /><M c="#111" /></mesh>)}
          <mesh position={[-0.12, 0.45, 0]}><boxGeometry args={[0.26, 0.26, 0.26]} /><M c="#dc2626" /></mesh>
          <mesh position={[0.22, 0.42, 0]}><cylinderGeometry args={[0.02, 0.02, 0.35]} /><M c="#333" /></mesh>
        </group>
      </group>
      <Phone p={[1.3, 1.6, 0.6]} rotY={-0.5} tex={order} />
      <group ref={notif} position={[1.3, 2.25, 0.6]}>
        <RoundedBox args={[0.9, 0.22, 0.04]} radius={0.08}><M c="#16a34a" /></RoundedBox>
        <Text position={[0, 0, 0.03]} fontSize={0.09} color="#fff" anchorX="center" anchorY="middle">Nouvelle commande en ligne</Text>
      </group>
    </group>
  )
}

/* ============ 6. Linedata : deux chats synchronisés en temps réel ============ */
const MSGS = [['A', 'Ordre 1042 validé'], ['B', 'Reçu ✓ mise à jour'], ['A', 'Prix ajusté : 101.2'], ['B', 'Synchro OK, 0 reload'], ['A', 'Rapport IA généré'], ['B', 'Parfait, merci !']]
function ChatScreen({ side, n, c }) {
  return useScreen(320, 220, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#f8fafc'); rr(x, 0, 0, W, 36, 0, c); txt(x, side === 'A' ? 'App Blazor 1 · Trader' : 'App Blazor 2 · Back-office', 12, 24, 14, '#fff', 700)
    MSGS.slice(Math.max(0, n - 4), n).forEach(([who, m], k) => {
      const mine = who === side
      x.font = '500 13px Poppins, Arial'; const tw = x.measureText(m).width + 24
      rr(x, mine ? W - tw - 12 : 12, 48 + k * 42, tw, 32, 12, mine ? c : '#e2e8f0'); txt(x, m, (mine ? W - tw - 12 : 12) + 12, 69 + k * 42, 13, mine ? '#fff' : '#0f172a', 500)
    })
  }, [n])
}
export function LinedataChat({ c }) {
  const [n, setN] = useState(1)
  useEffect(() => { const id = setInterval(() => setN((v) => (v >= MSGS.length ? 1 : v + 1)), 1500); return () => clearInterval(id) }, [])
  const a = ChatScreen({ side: 'A', n, c }), b = ChatScreen({ side: 'B', n, c })
  const packets = useRef([])
  useFrame((s) => packets.current.forEach((m, k) => {
    if (!m) return
    const u = (s.clock.elapsedTime * 0.8 + k / 3) % 1
    m.position.set(-0.9 + u * 1.8, 1.25 + Math.sin(u * Math.PI) * 0.45, -0.3)
  }))
  return (
    <group>
      <Monitor p={[-1.15, 0, -0.4]} rotY={0.35} tex={a} w={1.05} h={0.72} />
      <Monitor p={[1.15, 0, -0.4]} rotY={-0.35} tex={b} w={1.05} h={0.72} />
      {[0, 1, 2].map((k) => <mesh key={k} ref={(el) => (packets.current[k] = el)}><sphereGeometry args={[0.06, 12, 12]} /><meshBasicMaterial color={c} /></mesh>)}
      <Text position={[0, 2.05, -0.3]} fontSize={0.2} color={c} anchorX="center">SignalR · temps réel</Text>
      <mesh position={[0, 0.36, 0.1]}><boxGeometry args={[3.2, 0.06, 0.8]} /><M c="#e2e8f0" /></mesh>
      {[-1.5, 1.5].map((x) => <mesh key={x} position={[x, 0.17, 0.1]}><boxGeometry args={[0.06, 0.34, 0.7]} /><M c="#94a3b8" /></mesh>)}
    </group>
  )
}

/* ============ MentoraBall : plateforme éducative ============ */
export function EduPlatform({ c }) {
  const course = useScreen(400, 240, (x, W, H) => {
    rr(x, 0, 0, W, H, 0, '#ffffff'); rr(x, 0, 0, 110, H, 0, '#1e1b4b'); txt(x, 'Mentora', 14, 30, 16, '#c7d2fe', 800)
    ;['Cours', 'Quiz', 'Blog', 'Événements'].forEach((n, k) => txt(x, n, 14, 70 + k * 30, 13, k === 0 ? '#fff' : '#a5b4fc', 600))
    txt(x, 'Chapitre 3 · Réseaux de neurones', 124, 32, 14, '#111827', 700)
    rr(x, 124, 46, W - 136, 70, 8, '#eef2ff'); txt(x, '▶ Vidéo du cours', 140, 86, 13, '#4338ca', 600)
    rr(x, 124, 128, W - 136, 52, 10, '#ecfdf5'); txt(x, 'Gemini : Résumé en 3 points ✓', 136, 159, 12, '#047857', 700)
    rr(x, 124, 190, W - 136, 36, 10, '#fef3c7'); txt(x, '🎙 « Ouvre le quiz »', 136, 213, 12, '#92400e', 600)
  })
  return (
    <group>
      {/* grand tableau interactif */}
      <group position={[0, 0, -1.5]}>
        <RoundedBox args={[2.3, 1.42, 0.08]} radius={0.04} position={[0, 1.25, 0]}><M c="#1f2937" /></RoundedBox>
        <mesh position={[0, 1.25, 0.045]}><planeGeometry args={[2.2, 1.32]} /><meshBasicMaterial map={course} toneMapped={false} /></mesh>
        {[-1, 1].map((x) => <mesh key={x} position={[x, 0.27, 0]}><cylinderGeometry args={[0.04, 0.04, 0.55]} /><M c="#4b5563" /></mesh>)}
      </group>
      {/* pupitres et étudiants */}
      {[-1.2, 0.2].map((x, k) => (
        <group key={x} position={[x, 0, 0.5]}>
          <mesh position={[0, 0.5, 0]}><boxGeometry args={[0.8, 0.05, 0.45]} /><M c="#d6a75c" /></mesh>
          {[[-0.35, -0.18], [0.35, -0.18], [-0.35, 0.18], [0.35, 0.18]].map(([X, Z], j) => <mesh key={j} position={[X, 0.25, Z]}><boxGeometry args={[0.04, 0.5, 0.04]} /><M c="#78350f" /></mesh>)}
          <mesh position={[0.1, 0.55, 0]}><boxGeometry args={[0.3, 0.02, 0.2]} /><M c="#94a3b8" metalness={0.6} /></mesh>
          <Person p={[0, 0, 0.5]} rotY={Math.PI} outfit={k ? '#60a5fa' : '#f472b6'} scale={0.85} hair={k ? '#111827' : '#7c2d12'} />
        </group>
      ))}
      {/* toque de diplômé qui flotte */}
      <group position={[1.6, 1.9, 0]}>
        <mesh><boxGeometry args={[0.5, 0.04, 0.5]} /><M c="#111827" /></mesh>
        <mesh position={[0, -0.09, 0]}><cylinderGeometry args={[0.16, 0.18, 0.14, 16]} /><M c="#111827" /></mesh>
        <mesh position={[0.2, -0.12, 0.2]}><cylinderGeometry args={[0.012, 0.012, 0.24]} /><M c="#fbbf24" /></mesh>
      </group>
    </group>
  )
}
