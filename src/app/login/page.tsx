"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [email, setEmail] = useState("");

  // Redirect to /submit if wallet is already connected
  useEffect(() => {
    if (isConnected) {
      router.push("/submit");
    }
  }, [isConnected, router]);

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email signup with:", email);
    // This would typically validate and send to an API
    alert(`Email signup requested for: ${email}`);
  };

  const handleGoogleSignup = () => {
    console.log("Google signup requested");
    // This would typically redirect to Google OAuth
    alert("Google sign-up would redirect to Google");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card className="bg-card/30 backdrop-blur-sm border border-primary/10">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <BadgeCheck className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                Welcome to TrustScore
              </CardTitle>
              <CardDescription>
                Connect your wallet to get your TrustScore
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  Connecting your wallet establishes your decentralized identity
                  (DID) and allows us to issue verifiable credentials.
                </p>

                <div className="flex justify-center [&_button]:hover:opacity-90 [&_button]:border-primary/20 [&_button]:hover:border-primary/30 [&_button]:dark:text-primary-foreground [&_button:hover]:dark:text-primary-foreground">
                  <ConnectButton
                    showBalance={false}
                    chainStatus="icon"
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full",
                    }}
                    label="Connect Wallet"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign up using email
                  </span>
                </div>
              </div>

              <form onSubmit={handleEmailSignup} className="space-y-4">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary/5 border-primary/10"
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground dark:hover:bg-primary/80 dark:hover:text-primary-foreground"
                >
                  Continue with Email
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 border-primary/20 hover:bg-primary/10 hover:text-foreground dark:hover:text-white dark:border-primary/30 dark:hover:border-primary/50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Continue with Google
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                <p>
                  Your data will be encrypted and only used for scoring
                  purposes.
                </p>
                <p>
                  You&apos;ll retain full control of your credentials through
                  your DID.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
