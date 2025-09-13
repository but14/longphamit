export default function Section({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        {subtitle && <p className="text-neutral-400 mt-1">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
