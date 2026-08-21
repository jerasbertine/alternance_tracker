CREATE TYPE "public"."statut" AS ENUM('a_postuler', 'envoyee', 'entretien', 'refusee', 'acceptee');--> statement-breakpoint
CREATE TABLE "candidatures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"entreprise" text NOT NULL,
	"poste" text NOT NULL,
	"statut" "statut" DEFAULT 'a_postuler' NOT NULL,
	"date_candidature" timestamp,
	"lien_offre" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
