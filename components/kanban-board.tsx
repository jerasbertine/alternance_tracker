"use client";

import { useState } from "react";
import { DndContext, type DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { STATUTS } from "@/lib/statuts";
import { deleteCandidature, updateStatutCandidature } from "@/app/dashboard/actions";

type Candidature = {
  id: string;
  entreprise: string;
  poste: string;
  statut: string;
};

function CandidatureCard({ candidature }: { candidature: Candidature }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: candidature.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-background border border-border rounded p-3 touch-none cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-40 z-10 relative" : ""
      }`}
    >
      <Link href={`/dashboard/${candidature.id}`}>
        <p className="font-serif italic font-medium text-sm hover:underline">{candidature.entreprise}</p>
      </Link>
      <p className="text-xs text-muted-foreground mb-2">{candidature.poste}</p>
      <div className="flex gap-2">
        <Link href={`/dashboard/${candidature.id}/edit`}>
          <Button variant="outline" size="sm">Modifier</Button>
        </Link>
        <form action={deleteCandidature}>
          <input type="hidden" name="id" value={candidature.id} />
          <Button variant="destructive" size="sm" type="submit">Suppr.</Button>
        </form>
      </div>
    </div>
  );
}

function KanbanColumn({
  statut,
  label,
  items,
}: {
  statut: string;
  label: string;
  items: Candidature[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: statut });

  return (
    <div
      ref={setNodeRef}
      className={`bg-secondary border rounded p-3 min-h-50 ${isOver ? "border-accent" : "border-border"}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        {label} ({items.length})
      </p>
      <div className="flex flex-col gap-2">
        {items.length === 0 && <p className="text-xs text-muted-foreground italic">Vide</p>}
        {items.map((c) => (
          <CandidatureCard key={c.id} candidature={c} />
        ))}
      </div>
    </div>
  );
}

export function KanbanBoard({ candidatures }: { candidatures: Candidature[] }) {
  const [items, setItems] = useState(candidatures);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const id = active.id as string;
    const nouveauStatut = over.id as (typeof STATUTS)[number]["value"];

    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, statut: nouveauStatut } : c)));

    updateStatutCandidature(id, nouveauStatut);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STATUTS.map((colonne) => (
          <KanbanColumn
            key={colonne.value}
            statut={colonne.value}
            label={colonne.label}
            items={items.filter((c) => c.statut === colonne.value)}
          />
        ))}
      </div>
    </DndContext>
  );
}
