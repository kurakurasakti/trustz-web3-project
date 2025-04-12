import * as React from "react";
import { cn } from "@/lib/utils";

interface TrustScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  label?: string;
  colorThreshold?: {
    low: number;
    medium: number;
    high: number;
  };
}

export function TrustScore({
  value,
  max = 100,
  size = "md",
  showValue = true,
  label,
  colorThreshold = { low: 40, medium: 70, high: 100 },
  className,
  ...props
}: TrustScoreProps) {
  const percentage = (value / max) * 100;

  // Determine color based on percentage value
  const getColor = () => {
    if (percentage <= colorThreshold.low)
      return "text-destructive border-destructive";
    if (percentage <= colorThreshold.medium)
      return "text-amber-500 border-amber-500";
    return "text-accent border-accent";
  };

  // Determine size class
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-xl h-14 w-14";
      case "lg":
        return "text-4xl h-28 w-28";
      default:
        return "text-2xl h-20 w-20";
    }
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-2", className)}
      {...props}
    >
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center font-semibold border-4 bg-background",
          getSizeClass(),
          getColor()
        )}
      >
        {showValue && (
          <>
            <span>{value}</span>
            {max !== 100 && (
              <span className="text-xs text-muted-foreground">/{max}</span>
            )}
          </>
        )}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted opacity-20"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <circle
            className={cn("transition-all duration-500 ease-out", getColor())}
            strokeWidth="8"
            strokeDasharray={264}
            strokeDashoffset={264 - (percentage * 264) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
      </div>

      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}
