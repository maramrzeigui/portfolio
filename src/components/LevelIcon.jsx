import { Compass, Layers, BriefcaseBusiness, Landmark, Workflow, GraduationCap } from 'lucide-react'

// icône premium pour les îles qui n'ont pas de logo réel
const BY_THEME = { start: Compass, forge: Layers, portal: BriefcaseBusiness, italia: Landmark, devops: Workflow, esprit: GraduationCap }

export default function LevelIcon({ lv, size = 22, color = 'currentColor', className }) {
  if (lv.logo) return <img className={className} src={lv.logo} alt="" />
  const I = BY_THEME[lv.theme] ?? (lv.kind === 'start' ? Compass : Layers)
  return <I size={size} color={color} strokeWidth={2} aria-hidden />
}
