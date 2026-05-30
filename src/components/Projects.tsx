import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, FolderGit2, Calendar } from "lucide-react";
import { cvData } from "../data/cvData";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

/** Image de couverture d'un projet, avec repli sur une icône si l'image manque. */
const ProjectImage = ({ src, alt, category }: { src?: string; alt: string; category: string }) => {
  const [failed, setFailed] = useState(!src);
  return (
    <div className="relative h-44 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.18),transparent_60%)]" />
          <FolderGit2
            size={42}
            className="text-slate-600 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-500 relative z-10"
          />
        </div>
      )}
      {/* Dégradé bas pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      <span className="absolute top-3 left-3 text-[11px] font-semibold text-teal-300 bg-slate-950/70 border border-teal-500/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
        {category}
      </span>
    </div>
  );
};

const Projects = () => {
  const categories = useMemo(() => {
    const set = new Set(cvData.projects.map((p) => p.category));
    return ["Tous", ...Array.from(set)];
  }, []);

  const [filter, setFilter] = useState("Tous");
  const projects = cvData.projects.filter(
    (p) => filter === "Tous" || p.category === filter
  );

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle
          overline="Réalisations"
          title="Mes projets"
          subtitle="Une sélection de projets académiques et professionnels, du web au mobile."
        />

        {/* Filtres */}
        <Reveal className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-teal-500 text-slate-950"
                  : "bg-slate-800/70 text-slate-300 border border-slate-700 hover:border-teal-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Grille */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group card-glass rounded-2xl overflow-hidden flex flex-col hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Bandeau */}
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  category={project.category}
                />

                {/* Contenu */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <Calendar size={13} /> {project.date}
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-slate-800">
                      {project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-teal-400 transition-colors"
                        >
                          <Github size={15} /> {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
