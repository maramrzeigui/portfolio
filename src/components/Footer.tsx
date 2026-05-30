import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { cvData } from "../data/cvData";

const Footer = () => {
  const { name, social, email } = cvData.personal;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <a href="#hero" className="font-display font-semibold text-white">
            {name}
          </a>
          <p className="text-slate-500 text-sm mt-1">
            © {year} — Conçu et développé avec React & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub"
            className="text-slate-400 hover:text-teal-400 transition-colors">
            <Github size={20} />
          </a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="text-slate-400 hover:text-teal-400 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${email}`} aria-label="Email"
            className="text-slate-400 hover:text-teal-400 transition-colors">
            <Mail size={20} />
          </a>
          <a href="#hero"
            className="grid place-items-center w-9 h-9 rounded-lg bg-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 transition-colors ml-2">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
