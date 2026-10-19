import type { ReactNode } from "react";

export function SectionHead({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="rds-head">
      <div className="rds-head-left">
        <p className="rds-label">{label}</p>
        <h2 className="rds-display-2">{title}</h2>
      </div>
      {lead ? (
        <div className="rds-head-right">
          <p>{lead}</p>
        </div>
      ) : null}
    </header>
  );
}

export function SectionNote({ children }: { children: ReactNode }) {
  return <div className="rds-note">{children}</div>;
}
