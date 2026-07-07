import { useState } from "react";
import { WebGLBackground } from "@/components/fx/WebGLBackground";
import { WebGPUBackground } from "@/components/fx/WebGPUBackground";

type FxBackgroundProps = {
  className?: string;
  variant?: "hero" | "subtle";
};

export function FxBackground({ className = "", variant = "hero" }: FxBackgroundProps) {
  const [useWebGL, setUseWebGL] = useState(false);
  const particleCount = variant === "hero" ? 90 : 48;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-cyan-400/5 to-background dark:from-sky-400/10 dark:via-cyan-500/5" />
      {!useWebGL ? (
        <WebGPUBackground onFallback={() => setUseWebGL(true)} />
      ) : (
        <WebGLBackground particleCount={particleCount} />
      )}
      <div className="absolute inset-0 border border-sky-400/10 border-blink opacity-40 rounded-none" />
    </div>
  );
}
