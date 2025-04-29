"use client";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-provider";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BadgeCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TrustScore</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/verify"
              className="text-sm hover:text-primary transition-colors"
            >
              Verify
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/login"
              className="text-sm hover:text-primary transition-colors"
            >
              Login
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
