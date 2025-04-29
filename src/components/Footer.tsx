"use client";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-primary" />
            <span className="font-semibold">Built for Dorahacks by Roy</span>
          </div>

          <div className="flex gap-8">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/verify"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Verify
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TrustScore
          </div>
        </div>
      </div>
    </footer>
  );
}
