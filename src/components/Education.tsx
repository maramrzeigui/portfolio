import { GraduationCap, MapPin } from "lucide-react";
import { cvData } from "../data/cvData";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const Education = () => {
  return (
    <section id="education" className="py-20 md:py-28 bg-slate-900/40 border-y border-slate-800/60">
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle overline="Formation" title="Parcours académique" />

        <div className="grid sm:grid-cols-2 gap-6">
          {cvData.education.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 0.1}>
              <div className="card-glass rounded-2xl p-6 h-full hover:border-teal-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                    <GraduationCap size={22} />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-teal-400">
                      {edu.date}
                    </span>
                    <h3 className="font-display font-semibold text-white mt-1">
                      {edu.degree}
                    </h3>
                    <p className="text-slate-300 text-sm mt-1">{edu.school}</p>
                    <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                      <MapPin size={12} /> {edu.location}
                    </p>
                    {edu.focus && (
                      <p className="text-slate-400 text-sm mt-2">{edu.focus}</p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
