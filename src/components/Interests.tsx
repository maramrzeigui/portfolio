import { Users, Sprout } from "lucide-react";
import { cvData } from "../data/cvData";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const icons = [Users, Sprout];

const Interests = () => {
  return (
    <section id="interests" className="py-20 md:py-28 bg-slate-900/40 border-y border-slate-800/60">
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle overline="Centres d'intérêt" title="Au-delà du code" />

        <div className="grid sm:grid-cols-2 gap-6">
          {cvData.interests.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="card-glass rounded-2xl p-6 h-full hover:border-teal-500/50 transition-colors">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 mb-4">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Interests;
