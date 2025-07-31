import { cn } from "@/lib/utils";

interface MoonPhaseProps {
  phase: "new" | "crescent" | "half" | "gibbous" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function MoonPhase({ phase, size = "md", className }: MoonPhaseProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const baseClasses = "rounded-full relative overflow-hidden";
  
  if (phase === "full") {
    return (
      <div 
        className={cn(
          baseClasses, 
          sizeClasses[size], 
          "bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-lg shadow-yellow-400/20",
          className
        )}
      />
    );
  }

  if (phase === "new") {
    return (
      <div 
        className={cn(
          baseClasses,
          sizeClasses[size],
          "bg-gray-700 border border-gray-600",
          className
        )}
      />
    );
  }

  return (
    <div 
      className={cn(
        baseClasses,
        sizeClasses[size],
        "bg-gradient-to-br from-gray-300 to-gray-400",
        className
      )}
    >
      {phase === "crescent" && (
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 rounded-r-full" />
      )}
      {phase === "half" && (
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800" />
      )}
      {phase === "gibbous" && (
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gray-800 rounded-r-full" />
      )}
    </div>
  );
}

interface ProgressMoonProps {
  progress: number; // 0-100
  className?: string;
}

export function ProgressMoon({ progress, className }: ProgressMoonProps) {
  const getPhase = (progress: number) => {
    if (progress < 20) return "new";
    if (progress < 40) return "crescent";
    if (progress < 60) return "half";
    if (progress < 80) return "gibbous";
    return "full";
  };

  return <MoonPhase phase={getPhase(progress)} className={className} />;
}
