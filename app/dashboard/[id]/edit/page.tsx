import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { candidatures } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCandidature } from "@/app/dashboard/actions";
import { STATUTS } from "@/lib/statuts";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Textarea } from "@/components/ui/textarea";

export default async function EditCandidaturePage(
  props: PageProps<"/dashboard/[id]/edit">
) {
  const { userId } = await auth.protect();

  const { id } = await props.params;

  const [candidature] = await db
    .select()
    .from(candidatures)
    .where(and(eq(candidatures.id, id), eq(candidatures.userId, userId)));

  if (!candidature) {
    return <p>Candidature introuvable.</p>;
  }

  return (
    <div className="flex flex-1">
      <DashboardSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Link
          href={`/dashboard/${candidature.id}`}
          className="text-sm text-muted-foreground font-mono uppercase tracking-wider mb-6 inline-block"
        >
          ← Retour au dossier
        </Link>

        <div
          className="max-w-sm border border-border rounded p-6"
          style={{ boxShadow: "6px 6px 0 var(--border)" }}
        >
          <h1 className="font-serif italic text-xl font-medium mb-6">Modifier le dossier</h1>

          <form action={updateCandidature} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={candidature.id} />
            <div>
              <Label htmlFor="entreprise">Entreprise</Label>
              <Input id="entreprise" name="entreprise" defaultValue={candidature.entreprise} required />
            </div>
            <div>
              <Label htmlFor="poste">Poste</Label>
              <Input id="poste" name="poste" defaultValue={candidature.poste} required />
            </div>
            <div>
              <Label htmlFor="lienOffre">Lien de l&apos;offre (optionnel)</Label>
              <Input id="lienOffre" name="lienOffre" type="url" placeholder="https://..." defaultValue={candidature.lienOffre ?? ""} />
            </div>
            <div>
              <Label htmlFor="dateCandidature">Date d&apos;envoi (optionnel)</Label>
              <Input
                id="dateCandidature"
                name="dateCandidature"
                type="date"
                defaultValue={candidature.dateCandidature ? candidature.dateCandidature.toISOString().slice(0, 10) : ""}
              />
            </div>
            <div>
              <Label htmlFor="statut">Statut</Label>
              <select
                id="statut"
                name="statut"
                defaultValue={candidature.statut}
                className="w-full border rounded-lg h-8 px-2.5 border-input bg-transparent text-base md:text-sm"
              >
                {STATUTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={candidature.notes ?? ""}
                rows={4}
              />
            </div>
            <Button type="submit">Enregistrer</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
