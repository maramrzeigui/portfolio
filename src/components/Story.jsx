import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Ico from './Ico'
import realPhoto from '../assets/maram.png'
const animePortrait = () => realPhoto

/* ---------- machine à écrire ---------- */
export function useTypewriter(text, speed = 28, start = true) {
  const [n, setN] = useState(0)
  useEffect(() => { setN(0) }, [text])
  useEffect(() => {
    if (!start || n >= text.length) return
    const ch = text[n]
    const delay = /[.!?…]/.test(ch) ? speed * 9 : /[,:;]/.test(ch) ? speed * 4 : speed
    const t = setTimeout(() => setN((x) => x + 1), delay)
    return () => clearTimeout(t)
  }, [n, text, speed, start])
  return { shown: text.slice(0, n), done: n >= text.length, finish: () => setN(text.length) }
}

function Typed({ text, speed, className, onDone, start = true }) {
  const { shown, done } = useTypewriter(text, speed, start)
  const fired = useRef(false)
  useEffect(() => { if (done && !fired.current) { fired.current = true; onDone?.() } }, [done])
  return <span className={className}>{shown}{!done && <i className="caret" />}</span>
}

/* ---------- intro : Maram se présente ---------- */
const LINES = [
  { t: 'Bonjour ! Je m\'appelle Maram Rzeigui.', chip: null },
  { t: 'Je suis élève-ingénieure en informatique à ESPRIT, en Tunisie, promotion 2022 à 2027.', chip: { img: '/real/logos/esprit.svg', k: '2022 à 2027' } },
  { t: 'Ma spécialité : les Systèmes d\'Information Mobile et l\'Intelligence Artificielle.', chip: { ico: 'brain', k: 'Mobile & IA' } },
  { t: 'Ce que j\'aime ? Livrer des produits complets, de l\'idée jusqu\'à la mise en production.', chip: { logos: ['medaichain.png', 'volteo.png', 'ecoguide.png', 'guesto.png'], k: '12 projets livrés' } },
  { t: 'Je parle arabe, français, anglais… et un peu allemand.', chip: { flags: ['tn', 'fr', 'gb', 'de'], k: '4 langues' } },
  { t: 'Aujourd\'hui, je cherche un stage PFE de 6 mois en IA, Data ou développement mobile / full-stack.', chip: { ico: 'work', k: 'Stage PFE · 6 mois' } },
  { t: 'Alors… on explore mon parcours ensemble ? Chaque île cache un obstacle, et le projet que j\'ai construit pour le vaincre !', chip: null },
]

export function Intro({ onDone }) {
  const [k, setK] = useState(0)
  const { shown, done, finish } = useTypewriter(LINES[k].t, 26)
  const last = k === LINES.length - 1
  const chips = LINES.slice(0, k + 1).map((l) => l.chip).filter(Boolean)
  const next = () => { if (!done) return finish(); if (last) onDone(); else setK(k + 1) }

  useEffect(() => {
    const h = (e) => { if ([' ', 'Enter', 'ArrowRight'].includes(e.key)) { e.preventDefault(); e.stopPropagation(); next() } if (e.key === 'Escape') onDone() }
    addEventListener('keydown', h, true)
    return () => removeEventListener('keydown', h, true)
  })

  return (
    <motion.div className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6 } }} onClick={next}>
      <div className="intro-stage">
        <motion.div className="intro-hero" initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}>
          <div className="intro-portrait"><img src={animePortrait()} alt="Maram version anime" /></div>
          <div className="intro-chips">
            <AnimatePresence>
              {chips.map((c) => (
                <motion.span key={c.k} initial={{ opacity: 0, x: -20, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ type: 'spring' }}>
                  {c.img && <img className="chip-logo" src={c.img} alt="" />}
                  {c.ico && <Ico n={c.ico} size={16} />}
                  {c.logos && <span className="chip-stack">{c.logos.map((l) => <img key={l} src={`/real/logos/${l}`} alt="" />)}</span>}
                  {c.flags && <span className="chip-stack flags">{c.flags.map((f) => <img key={f} src={`/real/flags/${f}.svg`} alt={f} />)}</span>}
                  {c.k}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div className="dialog" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, type: 'spring', stiffness: 90 }}>
          <div className="dialog-name">Maram <small>Élève-ingénieure · ESPRIT</small></div>
          <p className="dialog-text">{shown}{!done && <i className="caret" />}</p>
          <div className="dialog-foot">
            <div className="dialog-dots">{LINES.map((_, n) => <i key={n} className={n === k ? 'on' : n < k ? 'past' : ''} />)}</div>
            {done && (
              last
                ? <motion.button className="neo-blue" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => { e.stopPropagation(); onDone() }}>Explorer mon parcours →</motion.button>
                : <span className="dialog-next">Cliquez ou Entrée ▼</span>
            )}
          </div>
        </motion.div>
      </div>
      <button className="intro-skip" onClick={(e) => { e.stopPropagation(); onDone() }}>Passer l'intro</button>
    </motion.div>
  )
}

/* ---------- combat : obstacle → solution ---------- */
export function Challenge({ lv, index, onWin }) {
  const [phase, setPhase] = useState('obstacle') // obstacle → attack → won
  const [typed, setTyped] = useState(false)
  const [hp, setHp] = useState(100)
  const [hits, setHits] = useState([])
  const timers = useRef([])
  const dmg = (lv.impact?.map((m) => m.v) ?? ['💥', '💥', '💥']).slice(0, 3)
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const attack = () => {
    if (phase !== 'obstacle') return
    setPhase('attack')
    const steps = [100 - 40, 100 - 75, 0]
    steps.forEach((v, n) => later(() => { setHp(v); setHits((h) => [...h, { id: n, label: dmg[n] ?? '💥' }]) }, 650 + n * 520))
    later(() => setPhase('won'), 650 + 3 * 520 + 250)
    later(onWin, 650 + 3 * 520 + 2300)
  }

  useEffect(() => {
    const h = (e) => {
      if (![' ', 'Enter', 'ArrowRight'].includes(e.key)) return
      e.preventDefault(); e.stopPropagation()
      if (phase === 'obstacle') attack()
      else if (phase === 'won') { timers.current.forEach(clearTimeout); onWin() }
    }
    addEventListener('keydown', h, true)
    return () => removeEventListener('keydown', h, true)
  })

  const o = lv.obstacle
  return (
    <motion.div className="challenge-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="challenge" style={{ '--c': lv.color }} initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
        <p className="ch-level">NIVEAU {String(index).padStart(2, '0')} · {lv.world}</p>

        <div className="arena">
          {/* boss */}
          <motion.div className={`boss ${phase === 'won' ? 'dead' : ''}`}
            animate={phase === 'attack' ? { x: [0, -10, 10, -6, 6, 0] } : phase === 'won' ? { scale: 0, rotate: 30, opacity: 0 } : { y: [0, -6, 0] }}
            transition={phase === 'obstacle' ? { repeat: Infinity, duration: 2 } : { duration: 0.45, repeat: phase === 'attack' ? 3 : 0 }}>
            <span className="boss-emoji">{o.emoji}</span>
            <b>{o.boss}</b>
            <div className="hp"><motion.i animate={{ width: `${hp}%` }} transition={{ duration: 0.3 }} /></div>
            <small>{hp} PV</small>
            <AnimatePresence>
              {hits.map((h) => (
                <motion.em key={h.id} className="dmg" initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -70, scale: 1.2 }} transition={{ duration: 1.1 }}>−{h.label}</motion.em>
              ))}
            </AnimatePresence>
          </motion.div>

          {phase === 'won' && (
            <motion.div className="ko" initial={{ scale: 3, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: -8 }} transition={{ type: 'spring', stiffness: 200 }}>K.O.!</motion.div>
          )}
          <div className="vs">VS</div>

          {/* héroïne + projet */}
          <motion.div className="hero-side" animate={phase === 'attack' ? { x: [0, 18, 0] } : {}} transition={{ duration: 0.5, repeat: phase === 'attack' ? 3 : 0 }}>
            <img src={animePortrait()} alt="" />
            <b>Maram</b>
            <span className="weapon">{lv.logo ? <img src={lv.logo} alt="" /> : lv.icon} {lv.title}</span>
          </motion.div>

          <AnimatePresence>
            {phase === 'attack' && hits.length < 3 && (
              <motion.span key={hits.length} className="projectile" initial={{ right: '18%', opacity: 1, scale: 0.6, rotate: 0 }} animate={{ right: '70%', scale: 1.3, rotate: 360 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: 'easeIn' }}>{lv.logo ? <img src={lv.logo} alt="" /> : lv.icon}</motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="ch-text">
          <p className="ch-label warn">⚠️ OBSTACLE</p>
          <p className="ch-obstacle"><Typed text={o.text} speed={18} onDone={() => setTyped(true)} /></p>

          <AnimatePresence>
            {phase !== 'obstacle' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <p className="ch-label ok">💡 MA SOLUTION · {lv.title}</p>
                <p className="ch-solution"><Typed text={lv.solution} speed={16} /></p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ch-actions">
          {phase === 'obstacle' && (
            <motion.button className="neo-blue attack" initial={{ opacity: 0, y: 10 }} animate={{ opacity: typed ? 1 : 0.5, y: 0 }} onClick={attack}>
              ⚔️ Déployer la solution
            </motion.button>
          )}
          {phase === 'attack' && <p className="ch-wait">Combat en cours…</p>}
          {phase === 'won' && (
            <motion.div className="ch-win" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
              <b>🏆 OBSTACLE VAINCU !</b>
              <button className="neo-white" onClick={() => { timers.current.forEach(clearTimeout); onWin() }}>Entrer sur l'île →</button>
            </motion.div>
          )}
        </div>
        <p className="ch-hint">Entrée / Espace pour continuer</p>
      </motion.div>
    </motion.div>
  )
}
