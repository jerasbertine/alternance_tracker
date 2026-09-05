"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { candidatures, statutEnum } from "@/db/schema";
import { and, eq} from "drizzle-orm";

const candidatureSchema = z.object({
    entreprise: z.string().min(1, "L'entreprise est requise"),
    poste: z.string().min(1, "Le poste est requis"),
    statut: z.enum(statutEnum.enumValues),
    lienOffre: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
    dateCandidature: z.string().nullable().optional(),
})

export async function createCandidature(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Non connecté");

    const res = candidatureSchema.safeParse({
        entreprise: formData.get("entreprise"),
        poste: formData.get("poste"),
        statut: formData.get("statut"),
        lienOffre: formData.get("lienOffre"),
        notes: formData.get("notes"),
        dateCandidature: formData.get("dateCandidature"),
    });

    if (!res.success) {
        return;
    }
    const données = res.data

    await db.insert(candidatures).values({
        userId,
        ...données,
        lienOffre: données.lienOffre || null,
        notes: données.notes || null,
        dateCandidature: données.dateCandidature ? new Date(données.dateCandidature) : null,
    });

    revalidatePath("/dashboard");
}

export async function deleteCandidature(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Non connecté");

    const id = formData.get("id") as string;

    await db
        .delete(candidatures)
        .where(and(eq(candidatures.id, id), eq(candidatures.userId, userId)));

    revalidatePath("/dashboard");
}

export async function updateCandidature(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Non connecté");

    const id = formData.get("id") as string;
    const res = candidatureSchema.safeParse({
        entreprise: formData.get("entreprise"),
        poste: formData.get("poste"),
        statut: formData.get("statut"),
        lienOffre: formData.get("lienOffre"),
        notes: formData.get("notes"),
        dateCandidature: formData.get("dateCandidature"),
    });

    if (!res.success) {
        return;
    }
    const données = res.data

    await db
        .update(candidatures)
        .set({
            ...données,
            lienOffre: données.lienOffre || null,
            notes: données.notes || null,
            dateCandidature: données.dateCandidature ? new Date(données.dateCandidature) : null,
        })
        .where(and(eq(candidatures.id, id), eq(candidatures.userId, userId)));

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function updateStatutCandidature(
    id: string,
    statut: (typeof statutEnum.enumValues)[number]
) {
    const { userId } = await auth();
    if (!userId) throw new Error("Non connecté");

    await db
        .update(candidatures)
        .set({ statut })
        .where(and(eq(candidatures.id, id), eq(candidatures.userId, userId)));

    revalidatePath("/dashboard");
}
