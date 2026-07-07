import { useEffect, useRef, useState } from "react";
import { paletteForNow } from "@/lib/fx/timeOfDay";
import {
  STREET_VIDEO_CLIPS,
  timeSlotForNow,
  videoFilterForSlot,
  type StreetTimeSlot,
} from "@/lib/fx/streetVideos";

type VideoStreetBackgroundProps = {
  className?: string;
  /** When false, show a paused frame (basic tier / reduced motion). */
  autoplay?: boolean;
};

const ALL_SLOTS: StreetTimeSlot[] = ["night", "dawn", "day", "dusk"];

export function VideoStreetBackground({ className = "", autoplay = true }: VideoStreetBackgroundProps) {
  const [slot, setSlot] = useState<StreetTimeSlot>(() => timeSlotForNow());
  const [palette, setPalette] = useState(() => paletteForNow());
  const videoRefs = useRef<Partial<Record<StreetTimeSlot, HTMLVideoElement | null>>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const syncClock = () => {
      setSlot(timeSlotForNow());
      setPalette(paletteForNow());
    };

    syncClock();
    const interval = window.setInterval(syncClock, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    for (const key of ALL_SLOTS) {
      const el = videoRefs.current[key];
      if (!el) continue;

      if (key === slot && autoplay) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    }
  }, [slot, autoplay]);

  const filter = videoFilterForSlot(slot, palette);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {ALL_SLOTS.map((key) => {
        const clip = STREET_VIDEO_CLIPS[key];
        const active = key === slot;

        return (
          <video
            key={key}
            ref={(el) => {
              videoRefs.current[key] = el;
            }}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out"
            style={{
              opacity: active ? 1 : 0,
              filter: active ? filter : undefined,
            }}
            src={clip.src}
            muted
            loop
            playsInline
            autoPlay={autoplay && active}
            preload={active ? "auto" : "metadata"}
            onLoadedData={() => {
              if (active) setReady(true);
            }}
          />
        );
      })}

      {/* Sky tint from local time */}
      <div
        className="absolute inset-0 mix-blend-soft-light transition-colors duration-[2000ms]"
        style={{
          background: `linear-gradient(to bottom, ${palette.skyTop}55, ${palette.horizon}33, transparent 55%)`,
        }}
      />

      {/* Readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/10 to-background/85" />

      {!ready ? (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-b from-sky-950/40 to-background"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
