"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/components/i18n-provider";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#architecture", key: "nav.architecture" },
  { href: "#features", key: "nav.features" },
  { href: "#technology", key: "nav.technology" },
  { href: "#demo", key: "nav.demo" },
  { href: "#use-cases", key: "nav.use_cases" },
  { href: "#about", key: "nav.about" },
] as const;

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Image src="/logo.svg" alt="CRAI DB" width={32} height={32} priority />
            <span className="font-semibold text-lg text-foreground">CRAI DB</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/15 hover:-translate-y-px rounded-md px-2 py-1 -mx-2"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />
            <Link href="/auth/login">
              <Button size="sm">{t("nav.sign_in")}</Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/15 rounded-md px-2 py-1 -mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center justify-between rounded-md border border-border bg-secondary px-3 py-2">
                  <span className="text-sm text-muted-foreground">{t("nav.theme")}</span>
                  <ThemeToggle variant="outline" />
                </div>
                <div className="flex items-center justify-between rounded-md border border-border bg-secondary px-3 py-2">
                  <span className="text-sm text-muted-foreground">{t("nav.language")}</span>
                  <LanguageToggle variant="outline" />
                </div>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full justify-start">
                    {t("nav.sign_in")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
