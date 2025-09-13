export default function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-brand/15 border border-brand/40 text-brand-foreground">
      <span className="size-2 rounded-full bg-brand" />
      {text}
    </span>
  );
}
