import Link from "next/link"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 grid md:grid-cols-2">
      <div className="flex flex-col justify-between p-6 md:p-10 bg-background">
        <Link href="/" className="font-serif italic font-semibold text-xl">
          alternance<span className="text-accent">tracker</span>
        </Link>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
            Accès à ton espace
          </p>
          <h1 className="font-serif italic text-3xl font-medium mb-4">
            Reprends là où tu t'es arrêté.
          </h1>
          <p className="text-muted-foreground">
            Tes dossiers t'attendent, avec peut-être quelques relances dues.
          </p>
        </div>
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          Session sécurisée
        </p>
      </div>
      <div className="flex items-center justify-center bg-secondary p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}