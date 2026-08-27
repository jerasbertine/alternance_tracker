import { STATUTS } from "@/lib/statuts";
import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  a_postuler: "border-border text-muted-foreground bg-transparent",
  envoyee: "border-border text-muted-foreground bg-transparent",
  relance: "border-status-amber text-status-amber bg-status-amber-bg",
  entretien: "border-status-blue text-status-blue bg-status-blue-bg",
  refusee: "border-destructive text-destructive bg-transparent",
  acceptee: "border-status-green text-status-green bg-status-green-bg",
};

export function StatusBadge({ statut }: { statut: string }) {
  const label = STATUTS.find((s) => s.value === statut)?.label ?? statut;

  return (
    <span
      className={cn(
        "inline-block font-mono text-[10px] uppercase tracking-wider border rounded px-2 py-0.5",
        STYLES[statut]
      )}
    >
      {label}
    </span>
  );
}
