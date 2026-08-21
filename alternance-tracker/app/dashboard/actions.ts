"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { candidatures } from "@/db/schema";

const candidatureSchema = z.object({
    entreprise: z.string().min(1, "L'entreprise est requise"),
    poste: z.string().min(1, "Le poste est requis"),
    statut: z.enum(["a_postuler", "envoyee", "entretien", "refusee", "acceptee"]),
})

export async function createCandidature(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Non connecté");

    const données = candidatureSchema.parse({
        entreprise: formData.get("entreprise"),
        poste: formData.get("poste"),
        statut: formData.get("statut"),
    });
    
    await db.insert(candidatures).values({
        userId,
        ...données,
    });

    revalidatePath("/dashboard");
}