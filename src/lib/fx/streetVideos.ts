import type { SkyPalette } from "@/lib/fx/timeOfDay";
import { getLocalHour } from "@/lib/fx/timeOfDay";

export type StreetTimeSlot = "night" | "dawn" | "day" | "dusk";

export type StreetVideoClip = {
  src: string;
  label: string;
  credit: string;
  creditUrl: string;
};

/** Royalty-free NYC street clips (Coverr — free commercial use). */
export const STREET_VIDEO_CLIPS: Record<StreetTimeSlot, StreetVideoClip> = {
  night: {
    src: "/videos/nyc-traffic.mp4",
    label: "NYC traffic at night",
    credit: "Coverr",
    creditUrl: "https://coverr.co/videos/blurred-nyc-traffic-ixjl5p0zne",
  },
  dawn: {
    src: "/videos/nyc-sunset.mp4",
    label: "Manhattan at sunrise",
    credit: "Coverr",
    creditUrl: "https://coverr.co/videos/coverr-timelapse-of-manhattan-at-sunset-1213",
  },
  day: {
    src: "/videos/nyc-day.mp4",
    label: "Crosby Street, NYC",
    credit: "Coverr",
    creditUrl: "https://coverr.co/videos/crosby-street-in-new-york-nsiztyq3aa",
  },
  dusk: {
    src: "/videos/nyc-dusk.mp4",
    label: "Downtown NYC at sunset",
    credit: "Coverr",
    creditUrl: "https://coverr.co/videos/traffic-in-downtown-nyc-lxzezmug1m",
  },
};

export function timeSlotForHour(hour: number): StreetTimeSlot {
  const h = ((hour % 24) + 24) % 24;
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 20) return "dusk";
  return "night";
}

export function timeSlotForNow(date = new Date()): StreetTimeSlot {
  return timeSlotForHour(getLocalHour(date));
}

/** CSS filter overlays to blend clips toward the active palette. */
export function videoFilterForSlot(slot: StreetTimeSlot, palette: SkyPalette): string {
  const base =
    slot === "night"
      ? "brightness(0.55) saturate(0.85) contrast(1.08)"
      : slot === "dawn"
        ? "brightness(0.92) saturate(1.12) contrast(1.02) sepia(0.12)"
        : slot === "dusk"
          ? "brightness(0.78) saturate(1.15) contrast(1.05) sepia(0.18)"
          : "brightness(0.95) saturate(1.05)";

  const ambientBoost = palette.ambient < 0.35 ? " brightness(0.9)" : "";
  return `${base}${ambientBoost}`;
}
