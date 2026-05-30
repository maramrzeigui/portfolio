import { Briefcase, MapPin } from "lucide-react";
import { cvData } from "../data/cvData";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const Experience = () => {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle
          overline="Parcours"
          title="Expérience professionnelle"
          subtitle="Stages, missions freelance et collaborations sur des projets réels."
        />

        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/60 via-slate-700 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {cvData.experience.map((exp, i) => (
              <Reveal key={exp.role + exp.company} delay={i * 0.05}>
                <div
                  className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Point */}
                  <span className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-400 ring-4 ring-slate-950 z-10" />

                  <div
                    className={`card-glass rounded-2xl p-6 hover:border-teal-500/50 transition-colors ${
                      i % 2 === 0 ? "md:text-right md:mr-2" : "md:ml-2 md:col-start-2"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full mb-3">
                      <Briefcase size={13} /> {exp.date}
                    </span>
                    <h3 className="font-display font-semibold text-white text-lg">
                      {exp.role}
                    </h3>
                    <p className="text-teal-300 text-sm font-medium mt-0.5">
                      {exp.company}
                    </p>
                    <p
                      className={`text-slate-400 text-xs mt-1 flex items-center gap-1 ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <MapPin size={12} /> {exp.location}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed mt-3">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-1.5 mt-4 ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
