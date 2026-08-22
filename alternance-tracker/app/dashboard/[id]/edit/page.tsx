import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { candidatures } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCandidature } from "@/app/dashboard/actions";
import { STATUTS } from "@/lib/statuts";

export default async function EditCandidaturePage(
  props: PageProps<"/dashboard/[id]/edit">
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Non connecté");

  const { id } = await props.params;

  const [candidature] = await db
    .select()
    .from(candidatures)
    .where(and(eq(candidatures.id, id), eq(candidatures.userId, userId)));

  if (!candidature) {
    return <p>Candidature introuvable.</p>;
  }

  return (
    <form action={updateCandidature} className="flex flex-col gap-3 max-w-sm">
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
        <Label htmlFor="statut">Statut</Label>
        <select id="statut" name="statut" defaultValue={candidature.statut} className="w-full border rounded-md h-9 px-3">
          {STATUTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}
