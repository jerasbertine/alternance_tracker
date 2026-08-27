import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function DashboardSidebar() {
  return (
    <aside className="w-56 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col justify-between p-6">
      <div>
        <Link href="/" className="font-serif italic font-semibold text-lg block mb-10">
          alternance<span className="text-sidebar-ring">tracker</span>
        </Link>
        <nav className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider">
          <Link href="/dashboard" className="rounded px-3 py-2 bg-sidebar-primary text-sidebar-primary-foreground">
            Tableau de bord
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3 pt-6 border-t border-sidebar-border">
        <UserButton />
        <span className="font-mono text-xs uppercase tracking-wider">Compte</span>
      </div>
    </aside>
  );
}