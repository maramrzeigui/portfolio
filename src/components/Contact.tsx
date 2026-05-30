import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { cvData } from "../data/cvData";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const Contact = () => {
  const { email, phone, location, social } = cvData.personal;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const infos = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Téléphone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Localisation", value: location, href: undefined },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Ouvre le client mail avec le message pré-rempli (fonctionne sans serveur).
    const subject = encodeURIComponent(`Contact portfolio — ${form.name || "Nouveau message"}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\nEmail : ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <SectionTitle
          overline="Contact"
          title="Travaillons ensemble"
          subtitle="Une opportunité, une question ou un projet ? N'hésitez pas à me contacter."
        />

        <div className="grid md:grid-cols-5 gap-6">
          {/* Coordonnées */}
          <Reveal className="md:col-span-2">
            <div className="card-glass rounded-2xl p-7 h-full">
              <h3 className="font-display font-semibold text-white text-lg mb-6">
                Mes coordonnées
              </h3>
              <div className="space-y-5">
                {infos.map((info) => {
                  const content = (
                    <div className="flex items-center gap-4">
                      <span className="grid place-items-center w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                        <info.icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">{info.label}</p>
                        <p className="text-slate-200 text-sm font-medium break-words">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.label} href={info.href} className="block hover:opacity-80 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <div key={info.label}>{content}</div>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-slate-800">
                <a href={social.github} target="_blank" rel="noreferrer"
                  className="grid place-items-center w-11 h-11 rounded-xl bg-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 transition-colors">
                  <Github size={20} />
                </a>
                <a href={social.linkedin} target="_blank" rel="noreferrer"
                  className="grid place-items-center w-11 h-11 rounded-xl bg-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${email}`}
                  className="grid place-items-center w-11 h-11 rounded-xl bg-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={0.12} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-7 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Nom complet</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold py-3 rounded-xl transition-colors"
              >
                <Send size={18} /> Envoyer le message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
