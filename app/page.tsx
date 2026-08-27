import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TypewriterEntreprise } from "@/components/typewriter-entreprise";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <nav className="flex items-center justify-between px-4 md:px-8 py-5">
        <span className="font-serif italic font-semibold text-2xl">
          alternance<span className="text-accent">tracker</span>
        </span>
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="outline" size="lg">Connexion</Button>
          </Link>
          <Link href="/sign-up">
            <Button size="lg">S'inscrire</Button>
          </Link>
        </div>
      </nav>

      <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
            Suivi de candidatures
          </p>
          <h1 className="font-serif italic text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Chaque candidature mérite un dossier.
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Centralise tes candidatures d'alternance, relance au bon moment et
            garde une vue claire sur ton pipeline de l'envoi jusqu'à la
            signature.
          </p>
          <div className="flex gap-3">
            <Link href="/sign-up">
              <Button>Créer mon premier dossier</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline">Connexion</Button>
            </Link>
          </div>
        </div>
        <div className="bg-secondary border border-border rounded p-6" style={{ boxShadow: "6px 6px 0 var(--border)" }}>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            Dossier N° 2026-0042
          </p>
          <p className="font-serif italic text-xl font-medium mb-1"><TypewriterEntreprise /></p>
          <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-status-amber bg-status-amber-bg border border-status-amber rounded px-2 py-0.5 mb-4">
            Relance
          </span>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Poste : Développeur fullstack</p>
            <p>Envoyé le : 04.08.2026</p>
            <p>Dernière relance : 15.08.2026</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 md:gap-0 px-4 md:px-8 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="border border-border p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">01</p>
          <h3 className="font-serif italic text-xl font-medium mb-2">Pipeline</h3>
          <p className="text-muted-foreground text-sm">
            Garde une vision claire sur toutes tes candidatures, de l'envoi jusqu'a la signature.
          </p>
        </div>
        <div className="border border-border p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">02</p>
          <h3 className="font-serif italic text-xl font-medium mb-2">Relance</h3>
          <p className="text-muted-foreground text-sm">
            Ne rate plus une relance: les cnaidatures sans réponse depuis un moment ressortent clairement.
          </p>
        </div>
        <div className="border border-border p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">03</p>
          <h3 className="font-serif italic text-xl font-medium mb-2">Simplicité</h3>
          <p className="text-muted-foreground text-sm">
            Un seul endroit pour centralier toute tes candidatures d'alternance.
          </p>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground text-center px-4 md:px-8 py-12 md:py-20">
        <h2 className="font-serif italic text-3xl font-medium mb-6 max-w-lg mx-auto">
          Ton prochain contrat commence par un dossier bien tenu.
        </h2>
        <Link href="/sign-up">
          <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Ouvrir un dossier
          </Button>
        </Link>

      </section>
    </div>
  );
}