ALTER TYPE "public"."statut" ADD VALUE 'relance' BEFORE 'entretien';--> statement-breakpoint
ALTER TABLE "candidatures" ADD COLUMN "date_derniere_relance" timestamp;