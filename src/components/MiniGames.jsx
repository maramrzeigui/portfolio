import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ---------- Guesto : commander un repas ---------- */
const MENU = [
  { id: 'cafe', e: '☕', n: 'Café crème', p: 3.5 },
  { id: 'croissant', e: '🥐', n: 'Croissant', p: 2.5 },
  { id: 'pizza', e: '🍕', n: 'Pizza margherita', p: 14 },
  { id: 'salade', e: '🥗', n: 'Salade fraîcheur', p: 9 },
  { id: 'cheesecake', e: '🍰', n: 'Cheesecake', p: 8 },
  { id: 'citronnade', e: '🍋', n: 'Citronnade', p: 4 },
]
const FLOW = [
  { e: '📱', t: 'QR code scanné à la table 7', tech: 'App client · Next.js' },
  { e: '🧾', t: 'Commande envoyée au restaurant', tech: 'Supabase · temps réel' },
  { e: '🔔', t: 'Le serveur reçoit une notification', tech: 'App serveur Flutter · OneSignal' },
  { e: '👨‍🍳', t: 'En préparation en cuisine', tech: 'Statut mis à jour en direct' },
  { e: '🍽️', t: 'Servi à table !', tech: 'Suivi backoffice' },
  { e: '⭐', t: 'Le client note l\'ambiance', tech: 'Avis · fidélisation' },
]

export function RestaurantGame({ play, setPlay, color }) {
  const [cart, setCart] = useState({})
  const step = play.order ?? -1
  const timer = useRef()
  const total = MENU.reduce((s, m) => s + (cart[m.id] || 0) * m.p, 0)
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const add = (id, d) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + d) }))

  useEffect(() => () => clearInterval(timer.current), [])
  const order = () => {
    let k = 0
    setPlay((p) => ({ ...p, order: 0 }))
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      k += 1
      setPlay((p) => ({ ...p, order: k }))
      if (k >= FLOW.length - 1) clearInterval(timer.current)
    }, 1300)
  }
  const reset = () => { clearInterval(timer.current); setCart({}); setPlay((p) => ({ ...p, order: -1 })) }

  return (
    <div className="mini" style={{ '--c': color }}>
      <p className="mini-title">À vous de jouer : commandez un repas</p>
      {step < 0 ? (
        <>
          <div className="menu">
            {MENU.map((m) => (
              <div key={m.id} className={cart[m.id] ? 'in' : ''}>
                <span className="dish">{m.e}</span>
                <p><b>{m.n}</b><small>{m.p.toFixed(1)} DT</small></p>
                <span className="qty">
                  {cart[m.id] > 0 && <button onClick={() => add(m.id, -1)} aria-label={`Retirer ${m.n}`}>−</button>}
                  {cart[m.id] > 0 && <em>{cart[m.id]}</em>}
                  <button onClick={() => add(m.id, 1)} aria-label={`Ajouter ${m.n}`}>+</button>
                </span>
              </div>
            ))}
          </div>
          <button className="mini-cta" disabled={!count} onClick={order}>
            {count ? `🛎️ Commander · ${count} article${count > 1 ? 's' : ''} · ${total.toFixed(1)} DT` : 'Ajoutez un plat au panier'}
          </button>
        </>
      ) : (
        <>
          <ol className="flow">
            {FLOW.map((f, k) => (
              <motion.li key={f.t} className={k < step ? 'done' : k === step ? 'now' : ''} initial={{ opacity: 0, x: -8 }} animate={{ opacity: k <= step ? 1 : 0.35, x: 0 }}>
                <span>{k < step ? '✓' : f.e}</span>
                <p><b>{f.t}</b><small>{f.tech}</small></p>
              </motion.li>
            ))}
          </ol>
          {step >= FLOW.length - 1 && (
            <motion.div className="mini-win" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              🎉 Commande servie en 6 étapes, sans attendre le serveur. C'est ça, Guesto !
              <button onClick={reset}>Recommander</button>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

/* ---------- Mag Studio : piano ---------- */
const NOTES = [
  { n: 'Do', f: 261.63 }, { n: 'Ré', f: 293.66 }, { n: 'Mi', f: 329.63 }, { n: 'Fa', f: 349.23 },
  { n: 'Sol', f: 392.0 }, { n: 'La', f: 440.0 }, { n: 'Si', f: 493.88 }, { n: 'Do', f: 523.25 },
]
// « Au clair de la lune »
const SONG = [0, 0, 0, 1, 2, 1, 0, 2, 1, 1, 0]
let audioCtx
function tone(f) {
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)()
    const t = audioCtx.currentTime
    const o = audioCtx.createOscillator(), o2 = audioCtx.createOscillator(), g = audioCtx.createGain()
    o.type = 'triangle'; o.frequency.value = f
    o2.type = 'sine'; o2.frequency.value = f * 2
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1)
    o.connect(g); o2.connect(g); g.connect(audioCtx.destination)
    o.start(t); o2.start(t); o.stop(t + 1.2); o2.stop(t + 1.2)
  } catch { /* audio indisponible */ }
}

export function PianoGame({ setPlay, color }) {
  const [active, setActive] = useState(null)
  const [played, setPlayed] = useState(0)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const hit = (i) => {
    tone(NOTES[i].f)
    setActive(i)
    setPlayed((p) => p + 1)
    setPlay((p) => ({ ...p, note: { i, at: performance.now() } }))
    timers.current.push(setTimeout(() => setActive((a) => (a === i ? null : a)), 200))
  }
  const song = () => SONG.forEach((i, k) => timers.current.push(setTimeout(() => hit(i), k * 420)))
  return (
    <div className="mini" style={{ '--c': color }}>
      <p className="mini-title">À vous de jouer : touchez le piano</p>
      <div className="piano">
        {NOTES.map((nt, i) => (
          <button key={i} className={active === i ? 'on' : ''} onPointerDown={() => hit(i)} aria-label={`Note ${nt.n}`}><span>{nt.n}</span></button>
        ))}
      </div>
      <div className="mini-row">
        <button className="mini-cta small" onClick={song}>Jouer « Au clair de la lune »</button>
        <span className="mini-count">{played} note{played > 1 ? 's' : ''} jouée{played > 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}

/* ---------- DiscoverWay : réserver un voyage ---------- */
const DEST = [
  { n: 'Kenya', img: 'kenya' }, { n: 'Thaïlande', img: 'thailande' }, { n: 'Laos', img: 'laos' },
  { n: 'Philippines', img: 'philippines' }, { n: 'Rwanda', img: 'rwanda' }, { n: 'Zambie', img: 'zambie' },
]
export function TravelGame({ play, setPlay, color }) {
  const [pick, setPick] = useState(null)
  const [seats, setSeats] = useState(1)
  const trip = play.trip
  const ref = useBookingRef()
  return (
    <div className="mini" style={{ '--c': color }}>
      <p className="mini-title">À vous de jouer : réservez un voyage</p>
      <AnimatePresence mode="wait">
        {!trip ? (
          <motion.div key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="dest">
              {DEST.map((d) => (
                <button key={d.n} className={pick === d.n ? 'on' : ''} onClick={() => setPick(d.n)}><img src={`/real/countries/${d.img}.jpg`} alt={d.n} /><span className="dest-name">{d.n}</span></button>
              ))}
            </div>
            <div className="mini-row">
              <span className="seats">Places :
                <button onClick={() => setSeats((s) => Math.max(1, s - 1))} aria-label="Moins de places">−</button><b>{seats}</b>
                <button onClick={() => setSeats((s) => Math.min(6, s + 1))} aria-label="Plus de places">+</button>
              </span>
              <button className="mini-cta small" disabled={!pick} onClick={() => setPlay((p) => ({ ...p, trip: pick, seats }))}>Réserver</button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ticket" className="ticket" initial={{ opacity: 0, y: 20, rotateX: 40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0 }}>
            <div className="ticket-top"><b>DiscoverWay</b><span>CARTE D'EMBARQUEMENT</span></div>
            <div className="ticket-route"><div><small>DÉPART</small><b>TUN</b><span>Tunis</span></div><i>✈</i><div><small>ARRIVÉE</small><b>{trip.slice(0, 3).toUpperCase()}</b><span>{trip}</span></div></div>
            <div className="ticket-meta"><span>Passager <b>Vous</b></span><span>Places <b>{play.seats}</b></span><span>Réf. <b>{ref}</b></span></div>
            <p className="ticket-pdf">📄 Réservation enregistrée · billet PDF généré (FPDF)</p>
            <button className="replay" onClick={() => setPlay((p) => ({ ...p, trip: null }))}>Choisir une autre destination</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
function useBookingRef() {
  const [r] = useState(() => 'DW-' + Math.random().toString(36).slice(2, 6).toUpperCase())
  return r
}
