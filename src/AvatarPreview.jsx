import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import AnimeGirl from './components/AnimeGirl'

// Vue de contrôle temporaire : /?avatar=idle|walk|run|wave
export default function AvatarPreview() {
  const q = new URLSearchParams(location.search)
  const mode = q.get('avatar') || 'idle'
  const close = q.has('close')
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(#bfe3ff,#fbe6ef)' }}>
      <Canvas camera={{ position: close ? [0, 1.5, 1.4] : [0, 1.0, 3.4], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={2.2} />
        <hemisphereLight color="#b1e1ff" groundColor="#e9d8a6" intensity={0.8} />
        <AnimeGirl anim={mode === 'wave' ? 'idle' : mode} wave={mode === 'wave'} />
        <OrbitControls target={close ? [0, 1.45, 0] : [0, 1.0, 0]} />
      </Canvas>
    </div>
  )
}
