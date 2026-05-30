import { motion } from "framer-motion";
import { Briefcase, Code2, Languages as LangIcon, GraduationCap } from "lucide-react";
import { cvData } from "../data/cvData";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const stats = [
  { icon: Briefcase, value: "4+", label: "Expériences pro & freelance" },
  { icon: Code2, value: "6+", label: "Projets réalisés" },
  { icon: GraduationCap, value: "ESPRIT", label: "Cycle d'ingénieur" },
  { icon: LangIcon, value: "4", label: "Langues parlées" },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle overline="À propos" title="Qui suis-je ?" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Texte + stats */}
          <Reveal>
            <p className="text-slate-300 leading-relaxed text-lg">
              {cvData.personal.profile}
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              Je transforme des idées en produits concrets : du backend robuste
              aux applications mobiles soignées, en passant par l'intégration de
              paiements et de fonctionnalités d'intelligence artificielle.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="card-glass rounded-2xl p-5 hover:border-teal-500/50 transition-colors"
                >
                  <s.icon className="text-teal-400 mb-2" size={22} />
                  <div className="text-2xl font-bold font-display text-white">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Langues */}
          <Reveal delay={0.15}>
            <div className="card-glass rounded-2xl p-7">
              <h3 className="font-display font-semibold text-white text-lg mb-6 flex items-center gap-2">
                <LangIcon size={20} className="text-teal-400" /> Langues
              </h3>
              <div className="space-y-5">
                {cvData.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-200 font-medium">{lang.name}</span>
                      <span className="text-slate-400">{lang.level}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
