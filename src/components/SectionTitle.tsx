import Reveal from "./Reveal";

type SectionTitleProps = {
  overline: string;
  title: string;
  subtitle?: string;
};

const SectionTitle = ({ overline, title, subtitle }: SectionTitleProps) => (
  <Reveal className="text-center max-w-2xl mx-auto mb-14">
    <p className="text-teal-400 font-semibold tracking-[0.2em] uppercase text-xs mb-3">
      {overline}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 mt-4 leading-relaxed">{subtitle}</p>}
    <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400" />
  </Reveal>
);

export default SectionTitle;
