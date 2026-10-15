import { useEffect, useRef, useState } from 'react'
import Ico from './components/Ico'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import GameWorld from './components/GameWorld'
import { player, stats, skillTree, worlds, achievements } from './data'
import { TechChip } from './components/TechIcon'
import { Brain, Smartphone, Server, LayoutTemplate, Cloud, Wallet } from 'lucide-react'

const BRANCH = { 'IA & Data': Brain, Mobile: Smartphone, Backend: Server, Frontend: LayoutTemplate, 'Cloud & DevOps': Cloud, 'Web3 & Paiements': Wallet }
import photo from './assets/maram.png'
import realPhoto from './assets/maram.png'
const animePortrait = () => realPhoto

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
const grads = ['blue', 'pink', 'green', 'orange', 'yellow', 'red', 'black', 'blue']

function Counter({ to, suffix }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{Number.isInteger(to) ? Math.round(v) : v.toFixed(1).replace('.', ',')}{suffix}</span>
}

function Boot({ onStart, onSkip }) {
  return (
    <motion.div className="boot" exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.7 }}>
      <motion.div className="boot-photo" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.2 }}>
        <img src={animePortrait()} alt="Maram version anime" />
      </motion.div>
      <motion.h1 className="head-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        L'aventure de <span className="blue-gradient_text">Maram</span>
      </motion.h1>
      <p className="boot-sub">Ingénieure IA · Mobile · Full-Stack, un portfolio que l'on joue.</p>
      <motion.button className="neo-blue start" onClick={onStart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        Commencer la partie →
      </motion.button>
      <button className="boot-skip" onClick={onSkip}>Pas le temps de jouer ? Voir directement le portfolio →</button>
      <p className="boot-keys">Intro · projets · démos interactives · environ 5 minutes</p>
    </motion.div>
  )
}

function Navbar({ game }) {
  return (
    <header className="nav">
      <nav>
        <a href="#about">À propos</a>
        <a href="#game">Jouer</a>
        <a href="#worlds">Projets</a>
        <a href="#contact">Contact</a>
        <a href={player.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="gh">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
        </a>
        <a href={player.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="gh">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>
        </a>
      </nav>
      <div className="nav-me"><img src={photo} alt="Maram Rzeigui" /><div><b>Maram Rzeigui</b><small>Ingénieure IA & Mobile</small></div></div>
    </header>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [skipGame, setSkipGame] = useState(false)
  const [game, setGame] = useState({ level: 0, xp: 0, pct: 0 })

  useEffect(() => { document.body.style.overflow = started ? '' : 'hidden' }, [started])

  return (
    <>
      <AnimatePresence>{!started && <Boot onStart={() => setStarted(true)} onSkip={() => { setSkipGame(true); setStarted(true); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 400) }} />}</AnimatePresence>
      {started && (
        <>
          <Navbar game={game} />
          <main id="top">
            <GameWorld onProgress={setGame} skipIntro={skipGame} />

            <section id="about" className="max">
              <motion.div {...fadeUp} className="about">
                <div>
                  <h2 className="head-text">Bonjour, je suis <span className="blue-gradient_text">Maram</span></h2>
                  <p className="text">{player.bio}</p>
                  <p className="text">Élève-ingénieure à <b>ESPRIT</b> (2022 à 2027), je recherche un <b>stage PFE de 6 mois</b> en IA, Data ou développement mobile / full-stack.</p>
                </div>
                <div className="player-card">
                  <img src={photo} alt="Maram Rzeigui" />
                  <div><b>{player.name}</b><span>Classe : Ingénieure IA & Mobile</span><span className="online">● Disponible · PFE</span></div>
                </div>
              </motion.div>
              <div className="stats">
                {stats.map((s, i) => (
                  <motion.div key={s.k} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="stat2">
                    <div className="stat2-logos">{s.logos.map((l) => <img key={l} src={`/real/logos/${l}`} alt="" />)}</div>
                    <b className="stat2-num"><Counter to={s.v} suffix={s.suffix} /></b>
                    <span className="stat2-k">{s.k}</span>
                    <small>{s.ctx}</small>
                  </motion.div>
                ))}
              </div>

              <h3 className="subhead-text">Mes compétences</h3>
              <div className="skills">
                {skillTree.map((b, i) => (
                  <motion.div key={b.branch} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }} className="skill">
                    <div className="block-container">
                      <div className={`btn-back btn-back-${b.grad}`} />
                      <div className="btn-front">{(() => { const I = BRANCH[b.branch]; return I ? <I size={28} strokeWidth={2} color="#fff" /> : b.icon })()}</div>
                    </div>
                    <div className="skill-body">
                      <h4>{b.branch}</h4>
                      <div className="chips">{b.items.map((t) => <TechChip key={t} name={t} />)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="worlds" className="max">
              <h2 className="head-text">Mes <span className="blue-gradient_text">projets</span></h2>
              <p className="text">Des mondes que j'ai construits de A à Z : IA, mobile, blockchain, DevOps. Chaque carte mène au code.</p>
              <div className="projects">
                {worlds.map((w, i) => (
                  <motion.a key={w.id} href={w.url} target="_blank" rel="noreferrer" {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }} className="project">
                    <div className="block-container">
                      <div className={`btn-back btn-back-${grads[i % grads.length]}`} />
                      <div className={`btn-front ${w.logo ? 'logo-front' : ''}`}>{w.logo ? <img src={w.logo} alt={`Logo ${w.name}`} /> : w.icon}</div>
                    </div>
                    <h4>{w.name}</h4>
                    {w.partner && <span className="partner"><small>avec</small><img src={w.partner.src} alt={w.partner.name} /></span>}
                    <p className="project-sub">{w.sub}</p>
                    <p className="text-sm">{w.desc}</p>
                    <div className="chips">{w.tags.map((t) => <TechChip key={t} name={t} />)}</div>
                    <span className="link">Voir sur GitHub →</span>
                  </motion.a>
                ))}
              </div>

              <h3 className="subhead-text">Diplôme & langues</h3>
              <p className="text" style={{ marginTop: -18, marginBottom: 24 }}>Ma formation d'ingénieure et les langues dans lesquelles je travaille au quotidien.</p>
              <div className="achv">
                {achievements.map((a, i) => (
                  <motion.div key={a.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }} className="achv-item">
                    <span>{a.img ? <img src={a.img} alt="" /> : a.icon}</span><div><b>{a.title}</b><p>{a.text}</p></div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="contact" className="max">
              <motion.div {...fadeUp} className="cta">
                <p className="cta-text">Un stage PFE ou un projet en tête ?<br className="br" /> Construisons-le <span className="blue-gradient_text">ensemble</span> !</p>
                <a className="btn" href={`mailto:${player.email}?subject=Opportunit%C3%A9%20PFE`}>Me contacter</a>
              </motion.div>
              <div className="contact-grid">
                <a href={`mailto:${player.email}`} className="neo-card"><span><Ico n="mail" /> Email</span>{player.email}</a>
                <a href={`tel:${player.phone.replace(/\s/g, '')}`} className="neo-card"><span><Ico n="phone" /> Téléphone</span>{player.phone}</a>
                <a href={player.linkedin} target="_blank" rel="noreferrer" className="neo-card"><span><Ico n="linkedin" /> LinkedIn</span>in/maram-rzeigui</a>
                <a href={player.github} target="_blank" rel="noreferrer" className="neo-card"><span><Ico n="github" /> GitHub</span>@maramrzeigui</a>
              </div>
            </section>

            <footer className="footer max">
              <hr />
              <div>
                <p>© 2026 <b>Maram Rzeigui</b>. Tous droits réservés.</p>
                <span className="foot-links"><a href={player.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={player.github} target="_blank" rel="noreferrer">GitHub</a></span>
              </div>
              <small>Modèles 3D : « Fox's Islands » par nimzu (CC-BY-4.0) · design inspiré de 3d_portfolio de Sanidhya Kumar Verma (MIT)</small>
            </footer>
          </main>
        </>
      )}
    </>
  )
}
