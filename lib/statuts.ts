import { statutEnum } from "@/db/schema";

type Statut = (typeof statutEnum.enumValues)[number];

const STATUT_LABELS: Record<Statut, string> = {
  a_postuler: "À postuler",
  envoyee: "Envoyée",
  relance: "Relance",
  entretien: "Entretien",
  refusee: "Refusée",
  acceptee: "Acceptée",
};

export const STATUTS = statutEnum.enumValues.map((value) => ({
  value,
  label: STATUT_LABELS[value],
}));
