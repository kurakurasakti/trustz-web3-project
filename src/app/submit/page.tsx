"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import {
  DocumentTextIcon,
  XCircleIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function SubmitPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    undefined
  );
  const [githubUsername, setGithubUsername] = useState("");
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const [fileError, setFileError] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Redirect to /login if wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      router.push("/login");
    }
  }, [isConnected, router]);

  // Update wallet status when connection changes
  useEffect(() => {
    setWalletAddress(address);
  }, [address, isConnected]);

  // Handle file drop
  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileInfo({
        name: file.name,
        size: file.size,
      });
      setFileError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    multiple: false,
    onDropRejected: () => {
      setFileError("Please upload a PDF or TXT file only");
      setFileInfo(null);
    },
  });

  const removeFile = () => {
    setFileInfo(null);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");

    if (!isConnected) {
      setIsError(true);
      setErrorMessage("Please connect your wallet to submit");
      return;
    }

    if (!githubUsername && !fileInfo) {
      setIsError(true);
      setErrorMessage(
        "Please enter your GitHub username or upload a resume file."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const submissionData = {
        walletAddress: address,
        githubUsername,
        fileInfo: fileInfo
          ? {
              name: fileInfo.name,
              type: fileInfo.name.endsWith(".pdf")
                ? "application/pdf"
                : "text/plain",
              size: fileInfo.size,
            }
          : null,
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit data");
      }

      console.log("Submission successful:", result);
      setSubmissionSuccess(true);
      // Reset form
      setGithubUsername("");
      setFileInfo(null);
    } catch (error: unknown) {
      console.error("Submission error:", error);
      setIsError(true);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
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
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">
                  Submit Your Profile
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Connect your wallet and provide your information to get your
                  TrustScore
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={submitHandler} className="space-y-6">
                  {/* Wallet Connection */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="wallet" className="text-sm font-medium">
                        Wallet Connection
                      </Label>
                      {isConnected && walletAddress && (
                        <Badge
                          variant="outline"
                          className="text-primary bg-primary/10"
                        >
                          {formatWalletAddress(walletAddress)}
                        </Badge>
                      )}
                    </div>
                    <div className="w-full flex justify-center">
                      <ConnectButton
                        showBalance={false}
                        chainStatus="icon"
                        accountStatus={{
                          smallScreen: "avatar",
                          largeScreen: "full",
                        }}
                      />
                    </div>
                  </div>

                  {/* GitHub Username */}
                  <div className="space-y-2">
                    <Label htmlFor="github" className="text-sm font-medium">
                      GitHub Username
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Github className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        id="github"
                        placeholder="e.g., vitaliketh"
                        className="pl-10"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-primary/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        OR
                      </span>
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">
                      Upload Resume (Optional)
                    </label>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 transition-all 
                        ${
                          isDragActive
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 hover:border-blue-500"
                        } 
                        cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <input {...getInputProps()} />
                      <div className="text-center">
                        {fileInfo ? (
                          <div className="flex flex-col items-center">
                            <div className="flex items-center justify-between w-full p-2 bg-gray-50 rounded mb-2">
                              <div className="flex items-center">
                                <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                                <span className="truncate max-w-xs">
                                  {fileInfo.name}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                  ({formatFileSize(fileInfo.size)})
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile();
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500">
                              Click or drag to replace
                            </p>
                          </div>
                        ) : (
                          <div>
                            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                              {isDragActive
                                ? "Drop the file here"
                                : "Drag and drop a file here, or click to select a file"}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              PDF or TXT up to 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {fileError && (
                      <p className="mt-2 text-sm text-red-600">{fileError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 w-full"
                    disabled={
                      isSubmitting ||
                      (!githubUsername && !fileInfo) ||
                      !isConnected
                    }
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>

                  {isError && (
                    <div className="rounded-md bg-red-50 p-4 mt-4">
                      <div className="flex">
                        <div className="text-sm text-red-700">
                          {errorMessage}
                        </div>
                      </div>
                    </div>
                  )}

                  {submissionSuccess && (
                    <div className="rounded-md bg-green-50 p-4 mt-4">
                      <div className="flex">
                        <div className="text-sm text-green-700">
                          Submission successful! We&apos;ve received your
                          information.
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>

              <CardFooter>{/* Removed duplicate submit button */}</CardFooter>
            </Card>
          </motion.div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Your data will be encrypted and only used for scoring purposes.
            </p>
            <p>
              You&apos;ll retain full control of your credentials through your
              DID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
