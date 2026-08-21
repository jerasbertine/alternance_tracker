import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const statutEnum = pgEnum("statut", [
    "a_postuler",
    "envoyee",
    "entretien",
    "refusee",
    "acceptee",
]);

export const candidatures = pgTable("candidatures", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  entreprise: text("entreprise").notNull(),
  poste: text("poste").notNull(),
  statut: statutEnum("statut").notNull().default("a_postuler"),
  dateCandidature: timestamp("date_candidature", { mode: "date" }),
  lienOffre: text("lien_offre"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});