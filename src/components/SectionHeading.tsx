const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="mb-8">
    {eyebrow && <p className="text-sm uppercase tracking-widest text-primary/80 mb-2">{eyebrow}</p>}
    <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
    {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl">{subtitle}</p>}
  </div>
);
export default SectionHeading;