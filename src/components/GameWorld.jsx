import Ico from './Ico'
import LevelIcon from './LevelIcon'
import photo from '../assets/maram.png'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sparkles, useProgress } from '@react-three/drei'
import { easing } from 'maath'
import { AnimatePresence, motion } from 'framer-motion'
import * as THREE from 'three'
import { RestaurantGame, PianoGame, TravelGame } from './MiniGames'
import { Intro } from './Story'
import Encounter from './Encounter'
import { LogoSign, Showcase } from './RealProps'
import { TechChip } from './TechIcon'
import { IslandBase, IslandDecor } from './IslandDecor'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import AnimeGirl from './AnimeGirl'
import { Props, Tree, Flag, Bridge } from './World3D'
import { journey, chapters, totalXp } from '../journey'
import { player } from '../data'
import sakura from '../assets/sakura.mp3'
import realPhoto from '../assets/maram.png'
const animePortrait = () => realPhoto

const LAST = journey.length - 1

function Loading() {
  const { progress } = useProgress()
  return <Html center><div className="island-loader"><i /><span>{Math.round(progress)}%</span></div></Html>
}

/* ---------- 3D ---------- */

function SkyFollow({ isRotating }) {
  const g = useRef()
  useFrame((s) => g.current.position.copy(s.camera.position))
  return <group ref={g}><Sky isRotating={isRotating} /></group>
}

function StartPad() {
  return (
    <group position={journey[0].pos}>
      <mesh position={[0, -0.15, 0]} receiveShadow><cylinderGeometry args={[1.5, 1.3, 0.3, 10]} /><meshStandardMaterial color="#e3dc9f" flatShading /></mesh>
      <mesh position={[0, -0.75, 0]}><coneGeometry args={[1.3, 1, 10]} /><meshStandardMaterial color="#8b5a2b" flatShading /></mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.35, 1.5, 48]} /><meshBasicMaterial color="#b83f72" /></mesh>
    </group>
  )
}

function Platform({ lv, i, current, unlocked, onPick, play }) {
  const P = Props[lv.theme]
  const active = i === current
  const locked = i > unlocked
  return (
    <group position={lv.pos}>
      <group onClick={(e) => { e.stopPropagation(); if (!locked) onPick(i) }}
        onPointerOver={() => !locked && (document.body.style.cursor = 'pointer')} onPointerOut={() => (document.body.style.cursor = '')}>
        <IslandBase theme={lv.theme} locked={locked} active={active} color={lv.color} />
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[2.95, 3.1, 64]} /><meshBasicMaterial color={lv.color} transparent opacity={active ? 0.95 : 0.3} /></mesh>
        {locked ? (
          <Html zIndexRange={[4, 0]} center position={[0, 1, 0]} style={{ pointerEvents: 'none' }}><div className="lock">🔒<span>NIVEAU {i}</span></div></Html>
        ) : (
          <>
            <P c={lv.color} items={lv.items} play={play} />
            <IslandDecor theme={lv.theme} c={lv.color} />
            <Suspense fallback={null}>
              {lv.logo && <LogoSign src={lv.logo} color={lv.color} />}
              {i === current && lv.shots && <Showcase shots={lv.shots} />}
            </Suspense>
            <Tree p={[-2.15, 0, 1]} s={0.85} />
            <Tree p={[-1.9, 0, -1.7]} s={1.1} />
            <Flag done={i < unlocked || i === current} c={lv.color} />
          </>
        )}
      </group>
      {active && <Sparkles count={40} scale={[5, 3, 5]} position={[0, 1.5, 0]} size={5} speed={0.6} color={lv.color} />}
    </group>
  )
}

// emplacement du personnage sur une île : devant à droite, pour laisser le décor visible
const spot = (i) => { const p = journey[i].pos; return i === 0 ? [...p] : [p[0] + 1.5, p[1], p[2] + 1.6] }

function Rig({ current, travelling, setTravelling, onArrive, wide, startAt = 0 }) {
  const hero = useRef()
  const pos = useMemo(() => new THREE.Vector3(...spot(startAt)), [])
  const from = useRef(pos.clone())
  const look = useMemo(() => new THREE.Vector3(0, 0, -20), [])
  const hop = useRef(0)
  const waveT = useRef(0)
  const dirRef = useRef(1)
  const [waving, setWaving] = useState(false)
  const [anim, setAnim] = useState('idle')

  useEffect(() => { from.current = pos.clone() }, [current])

  useFrame((s, d) => {
    const T = new THREE.Vector3(...spot(current))
    const flat = new THREE.Vector3(T.x - pos.x, 0, T.z - pos.z)
    const dist = flat.length()
    if (dist > 0.05) {
      flat.normalize()
      const total = Math.max(0.001, Math.hypot(T.x - from.current.x, T.z - from.current.z))
      const speed = total > 20 ? 9 : 5.2
      pos.addScaledVector(flat, Math.min(dist, d * speed))
      const k = 1 - Math.max(0, dist - d * speed) / total
      pos.y = THREE.MathUtils.lerp(from.current.y, T.y, k) - Math.sin(k * Math.PI) * 0.45
      easing.dampAngle(hero.current.rotation, 'y', Math.atan2(flat.x, flat.z), 0.12, d)
      if (Math.abs(flat.x) > 0.1) dirRef.current = flat.x > 0 ? 1 : -1
      const want = total > 20 ? 'run' : 'walk'
      if (anim !== want) setAnim(want)
      if (!travelling) setTravelling(true)
    } else {
      if (anim !== 'idle') { setAnim('idle'); hop.current = 1; waveT.current = 2.2; setWaving(true); onArrive() }
      pos.y = THREE.MathUtils.lerp(pos.y, T.y, 0.2)
      easing.dampAngle(hero.current.rotation, 'y', 0, 0.35, d)
      dirRef.current = 1
    }
    if (waveT.current > 0) { waveT.current -= d; if (waveT.current <= 0) setWaving(false) }
    // petit saut de victoire à l'arrivée
    hop.current = Math.max(0, hop.current - d * 2.2)
    hero.current.position.set(pos.x, pos.y + Math.sin(hop.current * Math.PI) * 0.6, pos.z)

    // caméra cinématique
    const start = current === 0 && dist < 0.05
    const camOff = start ? [0, 4.6, 10] : travelling ? [-1.5, 4.2, 12.5] : wide ? [-3.4, 3, 8.6] : [0.7, 3.6, 14]
    const lookOff = start ? [0, 4.6, -10] : travelling ? [-1.5, 1.2, -1] : wide ? [-3.4, 1.2, -1] : [0.7, -3.4, -1]
    // à l'arrêt, on cadre le centre de l'île (décor + personnage) ; en trajet, on suit le personnage
    const base = !travelling && current > 0 ? journey[current].pos : [pos.x, pos.y, pos.z]
    easing.damp3(s.camera.position, [base[0] + camOff[0], base[1] + camOff[1], base[2] + camOff[2]], travelling ? 0.45 : 0.6, d)
    easing.damp3(look, [base[0] + lookOff[0], base[1] + lookOff[1], base[2] + lookOff[2]], 0.45, d)
    s.camera.lookAt(look)
  })

  return <group ref={hero}><AnimeGirl anim={anim} wave={waving} level={current} dirRef={dirRef} scale={1.25} /></group>
}

/* ---------- UI ---------- */

const Stars = ({ n }) => <span className="stars">{'★'.repeat(n)}<i>{'★'.repeat(5 - n)}</i></span>

function Checklist({ items, delay = 0.45 }) {
  return (
    <ul className="checklist">
      {items.map((p, k) => (
        <motion.li key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: delay + k * 0.15 }}>
          <motion.span className="chk" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.12 + k * 0.15, type: 'spring' }}>✓</motion.span>{p}
        </motion.li>
      ))}
    </ul>
  )
}

const GH = <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>

/** Liens du projet : démo en ligne + dépôts GitHub, présentés comme des boutons. */
function ProjectLinks({ lv }) {
  const urls = [lv.link, lv.code, lv.code2].filter(Boolean)
  if (!urls.length) return <span />
  const label = (u) => {
    if (!u.includes('github.com')) return { icon: '🌐', t: 'Voir en ligne' }
    const repo = u.split('github.com/')[1].split('/').slice(0, 2).join('/')
    const extra = lv.game === 'studio' ? (u.includes('Android') ? ' · Android' : ' · iOS') : lv.title === 'MentoraBall' ? (u.includes('javapi') ? ' · Desktop' : ' · Web') : ''
    return { icon: GH, t: `Code${extra}`, sub: repo }
  }
  return (
    <span className="plinks">
      {urls.map((u) => { const l = label(u); return (
        <a key={u} href={u} target="_blank" rel="noreferrer" className={u.includes('github.com') ? 'gh-btn' : 'demo-btn'}>
          <span className="pl-ic">{l.icon}</span><span><b>{l.t}</b>{l.sub && <small>{l.sub}</small>}</span>
        </a>
      ) })}
    </span>
  )
}

function Gallery({ shots, title }) {
  const [open, setOpen] = useState(null)
  return (
    <>
      <p className="lv-obj"><Ico n="shots" /> Aperçu réel</p>
      <div className="gallery">
        {shots.map((sh, k) => (
          <motion.button key={sh.src} onClick={() => setOpen(k)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + k * 0.07 }} aria-label={`Agrandir : ${sh.cap}`}>
            <img src={sh.src} alt={`${title} : ${sh.cap}`} loading="lazy" /><span>{sh.cap}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open != null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img key={open} src={shots[open].src} alt={shots[open].cap} initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % shots.length) }} />
            <p>{title} · {shots[open].cap} <small>({open + 1}/{shots.length} · cliquez l'image pour la suivante)</small></p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LevelCard({ lv, i, onNext, onRestart, play, setPlay }) {
  const kindLabel = { project: 'PROJET', gallery: 'PROJETS', edu: 'FORMATION', skills: 'INVENTAIRE', contact: 'NIVEAU FINAL' }[lv.kind]
  return (
    <motion.div key={i} className="lv-card" style={{ '--c': lv.color }}
      initial={{ opacity: 0, x: -50, rotateY: 14 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      <div className="card-cover">
        <motion.span className={`cover-icon ${lv.logo ? 'has-logo' : ''}`} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: 'spring' }}>
          <LevelIcon lv={lv} size={30} color="#fff" />
        </motion.span>
        <div>
          <p className="cover-kicker">{kindLabel} · CHAPITRE {lv.chapter.toUpperCase()}</p>
          <h3>{lv.title}</h3>
        </div>
      </div>
      <div className="card-body">
        {lv.easy && lv.kind !== 'contact' && (
          <motion.div className="sol-box" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <b><Ico n="idea" /> La solution</b><span>{lv.easy.solution}</span>
          </motion.div>
        )}
        {lv.pitch && <p className="pitch">{lv.pitch}</p>}
        {(lv.ctx || lv.date) && <p className="ctx">{lv.ctx && <b>{lv.ctx}</b>}{lv.date && <span>{lv.date}</span>}</p>}
        {lv.orgs && (
          <div className="orgs">
            <small>Avec</small>
            {lv.orgs.map((o) => <span key={o.name} title={o.name}><img src={o.src} alt={o.name} /></span>)}
          </div>
        )}
        {lv.shots && <Gallery shots={lv.shots} title={lv.title} />}

        {lv.game === 'restaurant' && <RestaurantGame play={play} setPlay={setPlay} color={lv.color} />}
        {lv.game === 'studio' && <PianoGame setPlay={setPlay} color={lv.color} />}
        {lv.game === 'travel' && <TravelGame play={play} setPlay={setPlay} color={lv.color} />}

        {lv.ai && <div className="ai-box"><b><Ico n="ai" /> La valeur de l'IA</b><span>{lv.ai}</span></div>}
        {lv.mission && <><p className="lv-obj"><Ico n="mission" /> Mission</p><p className="mission">{lv.mission}</p></>}
        {lv.built && <><p className="lv-obj"><Ico n="built" /> Réalisé</p><Checklist items={lv.built} /></>}

        {lv.impact && (
          <>
            <p className="lv-obj"><Ico n="impact" /> Impact</p>
            <div className="impact">
              {lv.impact.map((m, k) => (
                <motion.div key={m.k} initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.7 + k * 0.12, type: 'spring' }}>
                  <b>{m.v}</b><span>{m.k}</span>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {lv.stack && (
          <>
            <p className="lv-obj"><Ico n="gear" /> Technologies utilisées</p>
            <div className="inventory">
              {lv.stack.map((t, k) => (
                <motion.span key={t} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 + k * 0.06 }}><TechChip name={t} dark /></motion.span>
              ))}
            </div>
          </>
        )}

        {lv.items && (
          <div className="mini-projects">
            {lv.items.map((w, k) => (
              <motion.a key={w.id} href={w.url} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + k * 0.1 }} style={{ '--c': w.color }}>
                <span>{w.icon}</span><div><b>{w.name}</b><small>{w.desc}</small></div>
              </motion.a>
            ))}
          </div>
        )}

        {lv.langs && (
          <>
            <p className="lv-obj"><Ico n="langs" /> Langues</p>
            <div className="mini-skills">
              {lv.langs.map((l, k) => (
                <div key={l.name}>
                  <p><b><img className="flag" src={l.flag} alt="" /> {l.name}</b><span>{l.level}</span></p>
                  <div className="bar"><motion.i style={{ background: lv.color }} initial={{ width: 0 }} animate={{ width: `${l.v}%` }} transition={{ delay: 0.5 + k * 0.12, duration: 0.9 }} /></div>
                </div>
              ))}
            </div>
          </>
        )}

        {lv.skills && (
          <div className="mini-skills">
            {lv.skills.map((b, k) => (
              <div key={b.branch}>
                <p><b>{b.branch}</b></p>
                <div className="bar"><motion.i style={{ background: lv.color }} initial={{ width: 0 }} animate={{ width: `${b.level}%` }} transition={{ delay: 0.3 + k * 0.1, duration: 0.9 }} /></div>
                <div className="tchips">{b.items.map((it) => <TechChip key={it} name={it} />)}</div>
              </div>
            ))}
          </div>
        )}

        {lv.kind === 'contact' && (
          <div className="final">
            <p>Vous avez exploré tous mes projets. Je recherche un <b>stage PFE de 6 mois</b> en IA, Data ou mobile / full-stack. On joue le prochain niveau ensemble ?</p>
            <div className="final-links">
              <a className="neo-blue" href={`mailto:${player.email}?subject=Opportunit%C3%A9%20PFE`}><Ico n="mail" /> M'écrire</a>
              <a className="neo-white" href={player.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="neo-white" href={player.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="neo-white" href={`tel:${player.phone.replace(/\s/g, '')}`}><Ico n="phone" /> Appeler</a>
            </div>
            <button className="replay" onClick={onRestart}>↺ Rejouer depuis le début</button>
          </div>
        )}

        <div className="card-foot">
          <ProjectLinks lv={lv} />
        </div>
        {i < LAST && <button className="card-next" onClick={onNext}>Île suivante : {journey[i + 1].logo ? <img className="next-logo" src={journey[i + 1].logo} alt="" /> : null} {journey[i + 1].world} →</button>}
      </div>
    </motion.div>
  )
}

const steps = [
  { ico: 'alert', title: 'Un problème, puis l\'île', text: 'Avant chaque île, un problème réel est présenté simplement. Cliquez sur « Voir comment … le résout » : Maram rejoint l\'île, et la fiche du projet montre la solution.' },
  { ico: 'layers', title: 'Chaque île = un projet', text: '4 chapitres : IA & Data, Mobile, Web & DevOps, puis Profil. Chaque fiche présente la solution, l\'apport de l\'IA, les réalisations, l\'impact et les technologies.' },
  { ico: 'play', title: 'Des démos à essayer', text: 'Sur certaines îles, testez vraiment : commandez un repas chez Guesto, jouez du piano au Studio Mag, réservez un voyage avec DiscoverWay.' },
  { ico: 'map', title: 'Naviguez librement', text: 'La barre du bas montre votre progression : cliquez une île déjà visitée pour y revenir. Flèches ← → ou Q / D pour avancer et reculer.' },
  { ico: 'mouse', title: 'Commandes', text: 'Sur l\'île de départ, glissez la souris pour la faire tourner. M active la musique, H rouvre cette aide.' },
]

function Help({ open, onClose }) {
  const [k, setK] = useState(0)
  useEffect(() => { if (open) setK(0) }, [open])
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="help-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="help" onClick={(e) => e.stopPropagation()} initial={{ y: 40, scale: 0.92 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }}>
            <p className="help-kicker">Comment jouer · {k + 1}/{steps.length}</p>
            <AnimatePresence mode="wait">
              <motion.div key={k} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                <div className="help-icon"><Ico n={steps[k].ico} size={44} stroke={1.8} /></div>
                <h3>{steps[k].title}</h3>
                <p>{steps[k].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="help-keys"><kbd>←</kbd><kbd>→</kbd><kbd>Q</kbd><kbd>D</kbd><kbd>Entrée</kbd><kbd>H</kbd><kbd>M</kbd></div>
            <div className="help-dots">{steps.map((_, n) => <i key={n} className={n === k ? 'on' : ''} onClick={() => setK(n)} />)}</div>
            <div className="help-actions">
              {k > 0 && <button className="neo-white" onClick={() => setK(k - 1)}>Retour</button>}
              {k < steps.length - 1
                ? <button className="neo-blue" onClick={() => setK(k + 1)}>Suivant</button>
                : <button className="neo-blue" onClick={onClose}>C'est parti ! →</button>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function GameWorld({ onProgress, skipIntro }) {
  // lien direct vers une île : ?niveau=12
  const startAt = Math.min(LAST, Math.max(0, parseInt(new URLSearchParams(location.search).get('niveau')) || 0))
  const [current, setCurrent] = useState(startAt)
  const [unlocked, setUnlocked] = useState(startAt)
  const [travelling, setTravelling] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [help, setHelp] = useState(false)
  const [intro, setIntro] = useState(startAt === 0 && !skipIntro)
  const [challenge, setChallenge] = useState(null)
  const [music, setMusic] = useState(false)
  const [banner, setBanner] = useState(0)
  const [play, setPlay] = useState({ order: -1, note: null, trip: null, seats: 1 })
  const [wide, setWide] = useState(() => innerWidth > 860)
  const audio = useRef(null)
  const lv = journey[current]
  const xp = journey.slice(0, unlocked + 1).reduce((s, l) => s + l.xp, 0)

  useEffect(() => { onProgress?.({ level: current, xp, pct: xp / totalXp }) }, [current, xp])
  useEffect(() => { const r = () => setWide(innerWidth > 860); addEventListener('resize', r); return () => removeEventListener('resize', r) }, [])
  useEffect(() => {
    if (!audio.current) { audio.current = new Audio(sakura); audio.current.loop = true; audio.current.volume = 0.35 }
    music ? audio.current.play().catch(() => {}) : audio.current.pause()
  }, [music])
  useEffect(() => () => audio.current?.pause(), [])

  const go = (i) => {
    if (i < 0 || i > LAST || i === current || i > unlocked + 1 || travelling || challenge != null) return
    // nouvelle île jamais visitée : d'abord l'obstacle à vaincre
    if (i > unlocked && journey[i].obstacle) return setChallenge(i)
    setCurrent(i)
    setUnlocked((u) => Math.max(u, i))
  }
  const win = () => {
    const i = challenge
    setChallenge(null)
    setCurrent(i)
    setUnlocked((u) => Math.max(u, i))
  }
  const arrive = () => { setTravelling(false); setBanner((b) => b + 1) }

  useEffect(() => {
    const k = (e) => {
      if (scrollY > innerHeight * 0.5 || e.target.closest?.('input,textarea')) return
      if (intro || challenge != null) return
      if (help) { if (e.key === 'Escape' || e.key === 'Enter') setHelp(false); return }
      if (['ArrowRight', 'd', 'D', 'Enter'].includes(e.key)) { e.preventDefault(); go(current + 1) }
      if (['ArrowLeft', 'q', 'Q', 'a', 'A'].includes(e.key)) { e.preventDefault(); go(current - 1) }
      if (e.key === 'h' || e.key === 'H') setHelp(true)
      if (e.key === 'm' || e.key === 'M') setMusic((m) => !m)
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  })

  return (
    <section className="game-hero" id="game">
      <Canvas className={`game-canvas ${isRotating ? 'grabbing' : ''}`} shadows camera={{ near: 0.1, far: 1000, fov: 75, position: [0, 0, 0] }} dpr={[1, 1.8]}>
        <Suspense fallback={<Loading />}>
          <directionalLight position={[6, 12, 6]} intensity={2.2} castShadow />
          <ambientLight intensity={0.6} />
          <hemisphereLight color="#b1e1ff" groundColor="#000000" intensity={1} />
          <SkyFollow isRotating={isRotating || travelling} />
          <Bird />
          <Island enabled={current === 0 && !travelling} position={[0, -6.5, -43]} scale={1} rotation={[0.1, 4.7, 0]}
            isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={() => {}} />
          <Plane isRotating={isRotating || travelling} scale={2} position={[4.2, -4.6, -11]} rotation={[0, 20, 0]} />
          <StartPad />
          {journey.slice(1).map((l, n) => (
            <Platform key={l.world} lv={l} i={n + 1} current={current} unlocked={unlocked} onPick={go} play={play} />
          ))}
          {journey.slice(0, -1).map((l, n) => (
            <Bridge key={n} a={l.pos} b={journey[n + 1].pos} lit={n < unlocked} />
          ))}
          <Rig startAt={startAt} current={current} travelling={travelling} setTravelling={setTravelling} onArrive={arrive} wide={wide} />
        </Suspense>
      </Canvas>

      {/* bannière de niveau */}
      <AnimatePresence>
        {banner > 0 && current > 0 && (
          <motion.div key={banner} className="lv-banner" style={{ '--c': lv.color }}
            initial={{ opacity: 0, scale: 1.5, filter: 'blur(8px)' }} animate={{ opacity: [0, 1, 1, 0], scale: [1.5, 1, 1, 0.96], filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'] }}
            transition={{ duration: 2, times: [0, 0.15, 0.75, 1] }}>
            <small>NIVEAU {String(current).padStart(2, '0')} · {lv.world}</small>
            <b>{lv.title}</b>
          </motion.div>
        )}
      </AnimatePresence>

      {/* écran d'accueil du jeu */}
      <AnimatePresence>
        {current === 0 && !travelling && !intro && (
          <motion.div className="start-bubble" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.2 }}>
            <img src={animePortrait()} alt="" />
            <p className="info-title">Prêt·e pour l'aventure ?</p>
            <p className="info-text">{journey.length - 1} îles, {journey.length - 1} obstacles. Avant chaque île, un problème à vaincre… avec le projet que j'ai construit pour le résoudre.</p>
            <div className="start-actions">
              <button className="neo-white" onClick={() => go(1)}><Ico n="play" /> Commencer le niveau 1</button>
              <button className="ghost" onClick={() => setHelp(true)}>❔ Comment jouer</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* fiche du niveau */}
      <AnimatePresence mode="wait">
        {current > 0 && !travelling && <LevelCard key={current} lv={lv} i={current} onNext={() => go(current + 1)} onRestart={() => go(0)} play={play} setPlay={setPlay} />}
      </AnimatePresence>

      {current === 0 && !travelling && !intro && <div className="island-help"><Ico n="mouse" /> Glissez pour faire tourner l'île · <b>→</b> pour commencer</div>}

      {/* barre de progression / carte */}
      <div className="track">
        {chapters.map((ch) => (
          <div key={ch} className="track-chapter">
            <small>{ch}</small>
            <div>
              {journey.map((l, n) => l.chapter !== ch ? null : (
                <button key={n} className={`${n === current ? 'on' : ''} ${n <= unlocked ? 'open' : ''}`} style={{ '--c': l.color }} onClick={() => go(n)} disabled={n > unlocked + 1}>
                  <span>{n === 0 ? <img className="track-me" src={photo} alt="Départ" /> : n <= unlocked + 1 ? <LevelIcon lv={l} size={16} /> : <Ico n="lock" size={13} />}</span>
                  <em>{n === 0 ? 'Départ' : `${n}. ${l.title}`}</em>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>



      <div className="lv-controls">
        <button className="neo-white" onClick={() => go(current - 1)} disabled={current === 0 || travelling}>←</button>
        <button className="neo-blue" onClick={() => go(current + 1)} disabled={current === LAST || travelling}>{current === 0 ? 'Niveau 1 →' : 'Suivant →'}</button>
      </div>

      <div className="corner">
        <button className="round" onClick={() => setMusic(!music)} aria-label="Musique" title="Musique (M)"><Ico n={music ? 'sound' : 'mute'} size={19} /></button>
        <button className="round" onClick={() => setHelp(true)} aria-label="Aide" title="Comment jouer (H)"><Ico n="help" size={20} /></button>
      </div>
      <a href="#about" className="island-scroll">Version CV classique ↓</a>

      <Help open={help} onClose={() => setHelp(false)} />
      <AnimatePresence>{intro && <Intro onDone={() => setIntro(false)} />}</AnimatePresence>
      <AnimatePresence>{challenge != null && <Encounter key={challenge} lv={journey[challenge]} index={challenge} onWin={win} />}</AnimatePresence>
    </section>
  )
}
