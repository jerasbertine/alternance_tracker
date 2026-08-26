"use client";

import { useEffect, useState } from "react";

const ENTREPRISES = [
  "Allegro Musique",
  "Ekimetrics",
  "Theodo",
  "Younited",
  "Sicara",
  "Malt",
];

const VITESSE_FRAPPE = 80;
const VITESSE_EFFACEMENT = 40;
const PAUSE_APRES_FRAPPE = 1500;

export function TypewriterEntreprise() {
  const [texte, setTexte] = useState("");
  const [index, setIndex] = useState(0);
  const [enSuppression, setEnSuppression] = useState(false);

  useEffect(() => {
    const entrepriseActuelle = ENTREPRISES[index];

    if (!enSuppression && texte === entrepriseActuelle) {
      const pause = setTimeout(() => setEnSuppression(true), PAUSE_APRES_FRAPPE);
      return () => clearTimeout(pause);
    }

    if (enSuppression && texte === "") {
      setEnSuppression(false);
      setIndex((i) => (i + 1) % ENTREPRISES.length);
      return;
    }

    const delai = enSuppression ? VITESSE_EFFACEMENT : VITESSE_FRAPPE;
    const timeout = setTimeout(() => {
      setTexte((t) =>
        enSuppression
          ? entrepriseActuelle.slice(0, t.length - 1)
          : entrepriseActuelle.slice(0, t.length + 1)
      );
    }, delai);

    return () => clearTimeout(timeout);
  }, [texte, enSuppression, index]);

  return (
    <span>
      {texte}
      <span className="animate-pulse">|</span>
    </span>
  );
}
