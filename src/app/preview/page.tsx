"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrustScore } from "@/components/ui/trust-score";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ScoreBreakdown = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <Progress value={value} className={`h-2 ${color}`} />
  </div>
);

export default function PreviewPage() {
  // This would normally come from an API or state management
  const score = {
    overall: 92,
    technical: 94,
    reputation: 89,
    activity: 95,
  };

  const [isCreating, setIsCreating] = useState(false);

  const handleIssueCredential = () => {
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      alert("Verifiable Credential has been issued!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="mb-8">
            <Badge variant="outline" className="px-4 py-2 mb-2">
              <ArrowRight className="mr-1 h-3 w-3 rotate-180" /> Back to Home
            </Badge>
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="w-full max-w-xl"
          >
            <Card className="bg-card/30 backdrop-blur-sm border border-primary/10">
              <CardHeader className="text-center pb-2">
                <Badge className="mb-4 mx-auto">Result</Badge>
                <CardTitle className="text-3xl font-bold">
                  Your TrustScore
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Based on your GitHub activity and submitted information
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col items-center space-y-8 pt-4">
                {/* Main Score */}
                <div className="py-4">
                  <TrustScore
                    value={score.overall}
                    size="lg"
                    label="Overall Trust Score"
                  />
                </div>

                {/* Score Breakdown */}
                <div className="w-full space-y-6 bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-center mb-4">
                    Score Breakdown
                  </h3>

                  <ScoreBreakdown
                    label="Technical Skills"
                    value={score.technical}
                    color="bg-emerald-500"
                  />

                  <ScoreBreakdown
                    label="Reputation"
                    value={score.reputation}
                    color="bg-blue-500"
                  />

                  <ScoreBreakdown
                    label="Activity"
                    value={score.activity}
                    color="bg-violet-500"
                  />

                  <p className="text-xs text-muted-foreground text-center pt-4">
                    TrustScore uses AI to analyze your contributions, skills,
                    and community engagement.
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 pt-4">
                <Button
                  onClick={handleIssueCredential}
                  disabled={isCreating}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {isCreating ? (
                    "Creating Credential..."
                  ) : (
                    <>
                      <FileCheck className="mr-2 h-4 w-4" /> Issue Verifiable
                      Credential
                    </>
                  )}
                </Button>

                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Back to Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <div className="mt-8 text-center text-sm text-muted-foreground max-w-xl">
            <p className="mb-2">
              <strong>What is a Verifiable Credential?</strong>
            </p>
            <p>
              A Verifiable Credential is a tamper-proof digital certificate that
              proves your TrustScore. It&apos;s secured by blockchain technology
              and can be shared with anyone without revealing your personal
              data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
