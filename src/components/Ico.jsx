import {
  Camera, Target, Wrench, TrendingUp, Backpack, Languages, Lightbulb, Bot, Award, Map, Swords, MousePointer2,
  Zap, Play, LockKeyhole, TriangleAlert, Layers, BadgeCheck, Sparkles, Volume2, VolumeX, HelpCircle, Mail, Phone, Linkedin, Github, Smartphone, Brain, Rocket, Briefcase, GraduationCap,
} from 'lucide-react'

const SET = {
  shots: Camera, mission: Target, built: Wrench, impact: TrendingUp, gear: Backpack, langs: Languages, idea: BadgeCheck,
  ai: Sparkles, award: Award, map: Map, fight: Swords, mouse: MousePointer2, xp: Zap, sound: Volume2, mute: VolumeX,
  help: HelpCircle, play: Play, lock: LockKeyhole, alert: TriangleAlert, layers: Layers, mail: Mail, phone: Phone, linkedin: Linkedin, github: Github, mobile: Smartphone, brain: Brain,
  rocket: Rocket, work: Briefcase, school: GraduationCap,
}

/** Icône vectorielle cohérente (remplace les emojis). */
export default function Ico({ n, size = 15, color = 'currentColor', stroke = 2.2, style }) {
  const I = SET[n]
  return I ? <I size={size} color={color} strokeWidth={stroke} style={{ verticalAlign: '-3px', flex: 'none', ...style }} aria-hidden /> : null
}
