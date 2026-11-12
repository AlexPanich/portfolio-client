interface SectionHeaderProps {
  index: string;
  title: string;
  meta?: string;
  id: string;
}

export function SectionHeader({ index, title, meta, id }: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <span className="caption text-accent">{index}</span>
        <h2
          id={id}
          className="font-heading text-[40px] leading-none font-semibold tracking-[-0.03em] md:text-[56px]"
        >
          {title}
        </h2>
      </div>
      {meta && <span className="caption text-fg-muted">{meta}</span>}
    </header>
  );
}
