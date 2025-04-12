"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustScore } from "@/components/ui/trust-score";
import { ThemeToggle } from "@/components/theme-provider";
import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  BadgeCheck,
  Wallet,
  Github,
  FileBadge,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={fadeIn}
    className="flex flex-col items-center text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
  >
    <div className="p-3 rounded-full bg-primary/10 mb-4">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

// Icon or component type for the step card
type IconComponent = LucideIcon | React.ComponentType<{ className?: string }>;

// Step Card Component
const StepCard = ({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number;
  icon: IconComponent;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={fadeIn}
    className="flex items-start gap-4 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300"
  >
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
      {number}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TrustScore</span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
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
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <Badge variant="trust" className="mb-6">
                  Web3 Identity Solution
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                AI-Powered TrustScore for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Web3 Professionals
                </span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-xl text-muted-foreground mb-8 max-w-2xl"
              >
                Prove your credibility with AI-driven scoring and Verifiable
                Credentials. Establish trust in the decentralized ecosystem.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" asChild>
                  <Link href="/submit">
                    Get My TrustScore <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-16 relative">
                <div className="relative bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 w-full max-w-2xl mx-auto">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <TrustScore
                      value={92}
                      size="lg"
                      label="Example TrustScore"
                    />
                  </div>
                  <div className="h-32" />
                  <div className="grid grid-cols-3 gap-4 text-center pt-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground">
                        Technical
                      </h4>
                      <p className="text-xl font-semibold text-primary">94%</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">
                        Reputation
                      </h4>
                      <p className="text-xl font-semibold text-primary">89%</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">
                        Activity
                      </h4>
                      <p className="text-xl font-semibold text-primary">95%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4">
                Key Features
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                TrustScore combines AI-powered analysis with blockchain
                technology to create verifiable credentials you can trust.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <FeatureCard
                icon={Brain}
                title="AI Analysis"
                description="Our advanced AI evaluates technical skills, project consistency, and contributions from your GitHub and resume."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Decentralized Identity"
                description="Built on DID protocols to give you full control of your identity and credentials without central authorities."
              />
              <FeatureCard
                icon={BadgeCheck}
                title="Verifiable Credentials"
                description="Receive a tamper-proof credential that can be verified by anyone without revealing your personal data."
              />
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-b from-background to-background/80"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-4">
                How It Works
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                Get your TrustScore in four simple steps and start building
                trust in the Web3 ecosystem.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-6 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <StepCard
                number={1}
                icon={Wallet}
                title="Connect Wallet"
                description="Connect your wallet to establish your decentralized identity (DID) for secure verification."
              />
              <StepCard
                number={2}
                icon={Github}
                title="Submit GitHub/Resume"
                description="Link your GitHub profile or upload your resume for our AI to analyze your skills and contributions."
              />
              <motion.div
                variants={fadeIn}
                className="flex items-start gap-4 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Get TrustScore</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Receive a comprehensive TrustScore ranging from 1-100 with
                    detailed feedback on your strengths.
                  </p>
                </div>
              </motion.div>
              <StepCard
                number={4}
                icon={FileBadge}
                title="Issue Verifiable Credential"
                description="Your TrustScore is issued as a W3C Verifiable Credential tied to your DID, shareable and verifiable."
              />
            </motion.div>

            <motion.div
              className="mt-16 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Button size="lg" asChild>
                <Link href="/submit">
                  Get Started Now <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card/30 backdrop-blur-sm border-y border-primary/10">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-6">
                Ready to Build Trust in Web3?
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-muted-foreground mb-8"
              >
                Join the growing community of professionals using TrustScore to
                verify their skills and build credibility in the decentralized
                ecosystem.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  <Link href="/submit">Get Your TrustScore</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  );
}
