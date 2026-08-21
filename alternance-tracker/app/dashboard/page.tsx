import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { candidatures } from "@/db/schema";

export default async function DashboardPage() {
  await auth.protect();

  const résultats = await db.select().from(candidatures);

  return (
    <ul>
      {résultats.map((c) => (
        <li key={c.id}>
          {c.entreprise} — {c.poste} — {c.statut}
        </li>
      ))}
    </ul>
  );
}

