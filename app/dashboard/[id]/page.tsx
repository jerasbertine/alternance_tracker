import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { candidatures } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { StatusBadge } from "@/components/status-badge";
import { deleteCandidature } from "../actions";

export default async function FicheDossierPage(
  props: PageProps<"/dashboard/[id]">
) {
  const { userId } = await auth.protect();
  const { id } = await props.params;

  const [candidature] = await db
    .select()
    .from(candidatures)
    .where(and(eq(candidatures.id, id), eq(candidatures.userId, userId)))

    if (!candidature) {
      return <p>Candidature introuvable.</p>
    }

    return (
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Link href="/dashboard" className="text-sm text-muted-foreground font-mono uppercase tracking-wider mb-6 inline-block">
            ← Retour au tableau
          </Link>

          <div className="max-w-lg border border-border rounded p-6" style={{ boxShadow: "6px 6px 0 var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-serif italic text-2xl font-medium">{candidature.entreprise}</p>
              <StatusBadge statut={candidature.statut} />
            </div>

            <div className="text-sm space-y-2 mb-6">
            <p><span className="text-muted-foreground">Poste : </span>{candidature.poste}</p>
            <p>
              <span className="text-muted-foreground">Envoyé le : </span>
              {candidature.dateCandidature ? candidature.dateCandidature.toLocaleDateString("fr-FR") : "-"}            
            </p>
            <p>
              <span className="text-muted-foreground">Dernière relance : </span>
              {candidature.dateDerniereRelance ? candidature.dateDerniereRelance.toLocaleDateString("fr-FR") : "-"}            
            </p>
            {candidature.lienOffre && (
              <p>
                <span className="text-muted-foreground">Offre : </span>
                <a href={candidature.lienOffre} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  Voir l'annonce
                </a>
              </p>
            )}
            </div>

            {candidature.notes && (
            <div className="mb-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Notes</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{candidature.notes}</p>
            </div>
            )}

            <div className="flex gap-2">
              <Link href={`/dashboard/${candidature.id}/edit`}>
                <Button variant="outline" size="sm">Modifier</Button>
              </Link>
              <form action={deleteCandidature}>
                <input type="hidden" name="id" value={candidature.id} />
                <Button variant="destructive" size="sm" type="submit">Supprimer</Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
}