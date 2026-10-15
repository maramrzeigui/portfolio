import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { chibiFull } from '../anime/chibi'
import { useTypewriter } from './Story'
import { FileWarning, BookX, CreditCard, WifiOff, BatteryWarning, MicOff, PhoneCall, RefreshCcw, FileStack, Bug, Clock, MapPinX, GraduationCap, Lock, Briefcase } from 'lucide-react'

// icône réelle et parlante pour chaque problème
const PB = {
  MedAIChain: FileWarning, MentoraBall: BookX, 'Fraud Detection Pipeline': CreditCard, 'EcoGuide & EcoTracer': WifiOff,
  Volteo: BatteryWarning, 'Mag Studio': MicOff, 'Speranza Pizza': PhoneCall, 'Blazor temps réel': RefreshCcw,
  ViaItalia: FileStack, 'Student Management DevOps': Bug, Guesto: Clock, DiscoverWay: MapPinX,
  'Ingénieure en Informatique': GraduationCap, Inventaire: Lock,
}

/** Avant l'île : le problème, raconté simplement comme une case de BD. La solution, c'est l'île. */
export default function Encounter({ lv, index, onWin }) {
  const text = lv.easy?.problem ?? lv.obstacle?.text ?? ''
  const { shown, done, finish } = useTypewriter(text, 22)
  const [idea, setIdea] = useState(false)
  useEffect(() => { if (done) { const t = setTimeout(() => setIdea(true), 400); return () => clearTimeout(t) } }, [done])
  useEffect(() => {
    const h = (e) => {
      if (!['Enter', ' ', 'ArrowRight'].includes(e.key)) return
      e.preventDefault(); e.stopPropagation()
      done ? onWin() : finish()
    }
    addEventListener('keydown', h, true)
    return () => removeEventListener('keydown', h, true)
  })
  return (
    <motion.div className="enc-back" style={{ '--c': lv.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="comic" initial={{ y: 40, rotate: -1.5, scale: 0.95 }} animate={{ y: 0, rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
        <p className="comic-level">Niveau {index} · {lv.world}</p>

        <div className="comic-scene">
          {lv.photo ? (
            <motion.figure className="pb-photo" initial={{ rotate: -4, scale: 0.9, opacity: 0 }} animate={{ rotate: -2, scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
              <img src={lv.photo} alt="Illustration du problème" />
              <span className="pb-stamp">{(() => { const I = PB[lv.title] ?? Briefcase; return <I size={18} strokeWidth={2.4} /> })()} Problème</span>
              {lv.logo && <img className="alert-logo" src={lv.logo} alt={lv.title} />}
            </motion.figure>
          ) : (
            <div className="alert">
              <span className="alert-ring" /><span className="alert-ring r2" />
              <motion.span className="alert-emoji" animate={{ rotate: [0, -6, 6, -4, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
                {(() => { const I = PB[lv.title] ?? Briefcase; return <I size={56} strokeWidth={1.8} color="#dc2626" /> })()}
                {lv.logo && <img className="alert-logo" src={lv.logo} alt={lv.title} />}
              </motion.span>
              <b>Oh non… un problème !</b>
            </div>
          )}
          <div className="bubble">
            <small>Le problème</small>
            <p>{shown}{!done && <i className="caret" />}</p>
          </div>
        </div>

        <div className="comic-foot">
          <div className="thinker">
            <img src={chibiFull(idea ? 'attack' : 'idle')} alt="" />
            <motion.span className="thought" initial={false} animate={{ scale: 1, opacity: 1 }} key={idea ? 'i' : 'h'}>{idea ? 'J\'ai une idée !' : 'Hmm…'}</motion.span>
          </div>
          <motion.button className="neo-blue" onClick={() => (done ? onWin() : finish())} animate={idea ? { scale: [1, 1.06, 1] } : {}} transition={{ repeat: Infinity, duration: 1.4 }}>
            {done ? `Voir comment ${lv.title} le résout →` : 'Lire la suite →'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
