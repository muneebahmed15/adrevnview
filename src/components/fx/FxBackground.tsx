import { Suspense, lazy } from "react";
import { StaticBackground } from "@/components/fx/StaticBackground";
import { VideoStreetBackground } from "@/components/fx/VideoStreetBackground";
import { usePerformanceTier } from "@/lib/performance";

const GpuFxLayer = lazy(() =>
  import("@/components/fx/GpuFxLayer").then((m) => ({ default: m.GpuFxLayer })),
);

type FxBackgroundProps = {
  className?: string;
  variant?: "hero" | "subtle" | "streetview";
};

export function FxBackground({ className = "", variant = "hero" }: FxBackgroundProps) {
  const { gpuFx, ready, tier, cssMotion } = usePerformanceTier();

  if (variant === "streetview") {
    const autoplay = tier !== "basic" && cssMotion;
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <VideoStreetBackground autoplay={autoplay} />
      </div>
    );
  }

  if (!gpuFx) {
    return <StaticBackground className={className} variant={variant} />;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <StaticBackground variant={variant} />
      {ready ? (
        <Suspense fallback={null}>
          <GpuFxLayer variant={variant} />
        </Suspense>
      ) : null}
    </div>
  );
}
