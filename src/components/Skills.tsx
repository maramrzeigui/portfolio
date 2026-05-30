import {
  Code2,
  Server,
  Smartphone,
  Database,
  Boxes,
  Sparkles,
} from "lucide-react";
import { cvData } from "../data/cvData";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const icons = [Code2, Server, Smartphone, Database, Boxes, Sparkles];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28 bg-slate-900/40 border-y border-slate-800/60">
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle
          overline="Compétences"
          title="Stack & technologies"
          subtitle="Un éventail de technologies couvrant le développement web, mobile, backend et DevOps."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvData.skillGroups.map((group, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={group.title} delay={i * 0.07}>
                <div className="card-glass rounded-2xl p-6 h-full hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-teal-500/50 hover:text-teal-300 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
