"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, SignOutButton } from "@clerk/nextjs";

export function DashboardSidebar() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-sidebar text-sidebar-foreground px-4 py-3">
        <Link href="/" className="font-serif italic font-semibold text-lg">
          alternance<span className="text-sidebar-ring">tracker</span>
        </Link>
        <button
          onClick={() => setOuvert(true)}
          className="font-mono text-xs uppercase tracking-wider border border-sidebar-border rounded px-3 py-1.5"
        >
          Menu
        </button>
      </div>

      {ouvert && (
        <div
          onClick={() => setOuvert(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      <aside
        className={`
          w-56 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col justify-between p-6
          fixed inset-y-0 right-0 z-40 transition-transform
          ${ouvert ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0 md:static md:left-0
        `}
      >
        <div>
          <Link href="/" className="font-serif italic font-semibold text-lg block mb-10">
            alternance<span className="text-sidebar-ring">tracker</span>
          </Link>
          <nav className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/dashboard"
              onClick={() => setOuvert(false)}
              className="rounded px-3 py-2 bg-sidebar-primary text-sidebar-primary-foreground"
            >
              Tableau de bord
            </Link>
          </nav>
        </div>
        <div className="pt-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <UserButton />
            <span className="font-mono text-xs uppercase tracking-wider">Compte</span>
          </div>
          <SignOutButton redirectUrl="/">
            <button className="font-mono text-xs uppercase tracking-wider text-sidebar-foreground hover:text-sidebar-primary-foreground cursor-pointer">
              Déconnexion
            </button>
          </SignOutButton>
        </div>
      </aside>
    </>
  );
}
