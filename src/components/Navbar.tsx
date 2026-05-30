import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { cvData } from "../data/cvData";

const links = [
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Expérience", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 font-extrabold font-display">
              MR
            </span>
            <span className="font-display font-semibold text-white hidden sm:block">
              Maram Rzeigui
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-300 hover:text-teal-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={cvData.personal.cv}
              download
              className="inline-flex items-center gap-2 text-sm font-medium bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={16} /> CV
            </a>
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden text-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800">
          <div className="px-5 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-slate-300 hover:text-teal-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={cvData.personal.cv}
              download
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium bg-teal-500 text-slate-950 px-4 py-2 rounded-lg"
            >
              <Download size={16} /> Télécharger le CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
