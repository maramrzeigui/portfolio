import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Download, ArrowDown } from "lucide-react";
import { cvData } from "../data/cvData";
import Avatar from "./Avatar";

const Hero = () => {
  const { name, title, profile, location, social, cv, email } = cvData.personal;

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-40 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.06),transparent_60%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-5 gap-10 items-center">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-3 text-center md:text-left order-2 md:order-1"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-teal-400 mb-4">
            {title}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
            Bonjour, je suis <br className="hidden sm:block" />
            <span className="text-gradient">{name}</span>
          </h1>
          <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
            {profile}
          </p>

          <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm">
            <MapPin size={16} className="text-teal-400" /> {location}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Mail size={18} /> Me contacter
            </a>
            <a
              href={cv}
              download
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-teal-400 hover:text-teal-400 text-slate-200 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Download size={18} /> Télécharger mon CV
            </a>
          </div>

          {/* Réseaux */}
          <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
            <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="text-slate-400 hover:text-teal-400 transition-colors">
              <Github size={22} />
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="text-slate-400 hover:text-teal-400 transition-colors">
              <Linkedin size={22} />
            </a>
            <a href={`mailto:${email}`} aria-label="Email"
              className="text-slate-400 hover:text-teal-400 transition-colors">
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-2 flex justify-center order-1 md:order-2 mt-6 md:mt-16"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/30 to-emerald-500/20 rounded-full blur-2xl" />
            <Avatar className="relative w-52 h-52 md:w-72 md:h-72 rounded-full border-4 border-slate-800 shadow-2xl" />
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center text-slate-500 hover:text-teal-400 transition-colors"
      >
        <span className="text-xs mb-1">Découvrir</span>
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
