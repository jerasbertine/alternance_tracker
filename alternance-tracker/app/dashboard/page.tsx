import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { candidatures } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCandidature, deleteCandidature } from "./actions";
import { eq, asc, desc } from "drizzle-orm";

import Link from "next/link";

export default async function DashboardPage(
  props: PageProps<"/dashboard">
) {
  await auth.protect();

  const { statut, tri } = await props.searchParams;

  const résultats = await db
    .select()
    .from(candidatures)
    .where(typeof statut === "string" ? eq(candidatures.statut, statut as (typeof candidatures.statut.enumValues)[number]) : undefined)
    .orderBy(tri === "asc" ? asc(candidatures.createdAt) : desc(candidatures.createdAt));

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Link href="/dashboard"><Button variant="outline" size="sm">Tous</Button></Link>
        <Link href="/dashboard?statut=a_postuler"><Button variant="outline" size="sm">À postuler</Button></Link>
        <Link href="/dashboard?statut=envoyee"><Button variant="outline" size="sm">Envoyée</Button></Link>
        <Link href="/dashboard?statut=entretien"><Button variant="outline" size="sm">Entretien</Button></Link>
        <Link href="/dashboard?statut=refusee"><Button variant="outline" size="sm">Refusée</Button></Link>
        <Link href="/dashboard?statut=acceptee"><Button variant="outline" size="sm">Acceptée</Button></Link>
      </div>
      <div className="flex gap-2 mb-8">
        <Link href={`/dashboard${statut ? `?statut=${statut}&` : "?"}tri=desc`}><Button variant="ghost" size="sm">Plus récent</Button></Link>
        <Link href={`/dashboard${statut ? `?statut=${statut}&` : "?"}tri=asc`}><Button variant="ghost" size="sm">Plus ancien</Button></Link>
      </div>
        
      <form action={createCandidature} className="flex flex-col gap-3 max-w-sm mb-8">
        <div>
          <Label htmlFor="entreprise">Entreprise</Label>
          <Input id="entreprise" name="entreprise" required />
        </div>
        <div>
          <Label htmlFor="poste">Poste</Label>
          <Input id="poste" name="poste" required />
        </div>
        <div>
          <Label htmlFor="statut">Statut</Label>
          <select id="statut" name="statut" className="w-full border rounded-md h-9 px-3">
            <option value="a_postuler">À postuler</option>
            <option value="envoyee">Envoyée</option>
            <option value="entretien">Entretien</option>
            <option value="refusee">Refusée</option>
            <option value="acceptee">Acceptée</option>
          </select>
        </div>
        <Button type="submit">Ajouter</Button>
      </form>

      <ul>
        {résultats.map((c) => (
          <li key={c.id} className="flex items-center gap-3">
            <span>{c.entreprise} — {c.poste} — {c.statut}</span>
            <Link href={`/dashboard/${c.id}/edit`}>
              <Button variant="outline" size="sm">Modifier</Button>
            </Link>
            <form action={deleteCandidature}>
              <input type="hidden" name="id" value={c.id} />
              <Button variant="destructive" size="sm" type="submit">
                Supprimer
              </Button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
