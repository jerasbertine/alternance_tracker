import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { candidatures } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCandidature, deleteCandidature } from "./actions";
import { and, eq, asc, desc } from "drizzle-orm";
import { STATUTS } from "@/lib/statuts";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import Link from "next/link";

export default async function DashboardPage(props: PageProps<"/dashboard">) {
  const { userId } = await auth.protect();
  const { tri } = await props.searchParams;

  const toutes = await db
    .select()
    .from(candidatures)
    .where(eq(candidatures.userId, userId))
    .orderBy(tri === "asc" ? asc(candidatures.createdAt) : desc(candidatures.createdAt));

  const dossiersOuverts = toutes.filter((c) => c.statut !== "acceptee" && c.statut !== "refusee").length;
  const entretiens = toutes.filter((c) => c.statut === "entretien").length;
  const relancesDues = toutes.filter((c) => c.statut === "relance").length;
  const envoyees = toutes.filter((c) => c.statut !== "a_postuler").length;
  const reponses = toutes.filter((c) => ["entretien", "refusee", "acceptee"].includes(c.statut)).length;
  const tauxReponse = envoyees > 0 ? Math.round((reponses / envoyees) * 100) : 0;

  return (
    <div className="flex flex-1">
      <DashboardSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="font-serif italic text-2xl font-medium mb-1">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mb-8">
          {dossiersOuverts} dossier{dossiersOuverts !== 1 ? "s" : ""} actif{dossiersOuverts !== 1 ? "s" : ""} · {relancesDues} relance{relancesDues !== 1 ? "s" : ""} en attente
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="border border-border rounded p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Dossiers ouverts</p>
            <p className="font-serif italic text-3xl font-medium">{dossiersOuverts}</p>
          </div>
          <div className="border border-border rounded p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Taux de réponse</p>
            <p className="font-serif italic text-3xl font-medium">{tauxReponse}%</p>
          </div>
          <div className="border border-border rounded p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Entretiens</p>
            <p className="font-serif italic text-3xl font-medium">{entretiens}</p>
          </div>
          <div className="border border-border rounded p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Relances dues</p>
            <p className="font-serif italic text-3xl font-medium">{relancesDues}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Link href={`/dashboard?tri=desc`}><Button variant="ghost" size="sm">Plus récent</Button></Link>
          <Link href={`/dashboard?tri=asc`}><Button variant="ghost" size="sm">Plus ancien</Button></Link>
        </div>

        <form action={createCandidature} className="flex flex-wrap items-end gap-4 mb-10 border border-border rounded p-5">
          <div>
            <Label htmlFor="entreprise">Entreprise</Label>
            <Input id="entreprise" name="entreprise" required></Input>
          </div>
          <div>
            <Label htmlFor="poste">Poste</Label>
            <Input id="poste" name="poste" required></Input>
          </div>
          <div>
            <Label htmlFor="lienOffre">Lien de l'offre (optionnel)</Label>
            <Input id="lienOffre" name="lienOffre" type="url" placeholder="https://..." />
          </div>
          <div>
            <Label htmlFor="statut">Statut</Label>
            <select id="statut" name="statut" className="w-full border rounded-lg h-8 px-2.5 border-input bg-transparent text-base md:text-sm">
              {STATUTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <Button type="submit">+ Nouveau dossier</Button>
        </form>
        {toutes.length === 0 ? (
          <div className="border border-dashed border-border rounded p-10 text-center">
            <p className="font-serif italic text-lg font-medium mb-1">Aucun dossier pour l&apos;instant</p>
            <p className="text-sm text-muted-foreground">
              Ajoute ta première candidature avec le formulaire ci-dessus.
            </p>
          </div>
        ) : (
        <div className="grid md:grid-cols-5 gap-4">
          {STATUTS.map((colonne) => {
            const items = toutes.filter((c) => c.statut === colonne.value);
            return (
              <div key={colonne.value} className="bg-secondary border border-border rounded p-3 min-h-50">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                  {colonne.label} ({items.length})
                </p>
                <div className="flex flex-col gap-2">
                  {items.length === 0 && (<p className="text-xs text-muted-foreground italic">Vide</p>)}
                  {items.map((c) => (
                    <div key={c.id} className="bg-background border border-border rounded p-3">
                      <Link href={`/dashboard/${c.id}`}>
                        <p className="font-serif italic font-medium text-sm hover:underline">{c.entreprise}</p>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-2">{c.poste}</p>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/${c.id}/edit`}>
                          <Button variant="outline" size="sm">Modifier</Button>
                        </Link>
                        <form action={deleteCandidature}>
                          <input type="hidden" name="id" value={c.id}/>
                          <Button variant="destructive" size="sm" type="submit">Suppr.</Button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </main>
    </div>
  );
}
