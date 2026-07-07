import { Music2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { SpringButton } from "@/components/SpringButton";
import { useMusic } from "@/lib/audio";

export function MusicToggle() {
  const { enabled, available, ready, melody, toggle, cycleMelody } = useMusic();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !ready) {
    return <div className="w-9 h-9 rounded-full bg-secondary/50" aria-hidden />;
  }

  if (!available) return null;

  return (
    <div className="flex items-center rounded-full border border-border bg-card/80 overflow-hidden border-blink-once">
      <SpringButton
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggle}
        className={`rounded-none border-0 shadow-none ${
          enabled ? "text-sky-500" : "text-muted-foreground"
        }`}
        aria-label={enabled ? "Turn classical piano off" : "Turn classical piano on"}
        aria-pressed={enabled}
      >
        {enabled ? <Music2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </SpringButton>
      <button
        type="button"
        onClick={cycleMelody}
        className="hidden sm:inline-flex items-center px-2.5 h-9 border-l border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors max-w-[5.5rem] truncate"
        style={{ fontFamily: "Inter, sans-serif" }}
        title={`${melody.composer} — ${melody.name}. Click to change piece.`}
        aria-label={`Current piece: ${melody.composer}, ${melody.name}. Click to change.`}
      >
        {melody.shortName}
      </button>
    </div>
  );
}
