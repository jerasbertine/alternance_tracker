import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { candidatures } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCandidature, deleteCandidature } from "./actions";
import Link from "next/link";

export default async function DashboardPage() {
  await auth.protect();

  const résultats = await db.select().from(candidatures);

  return (
    <>
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
