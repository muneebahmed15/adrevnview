import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePerformanceTier } from "@/lib/performance";
import {
  CLASSICAL_MELODIES,
  DEFAULT_MELODY_ID,
  frequencyAt,
  getMelodyById,
  nextMelodyId,
  stepMelody,
  type Melody,
} from "./melodies";
import { playPianoNote, resumePianoContext, suspendPianoContext } from "./pianoEngine";

const ENABLED_KEY = "adrevnview-piano-music";
const MELODY_KEY = "adrevnview-piano-melody";

type MusicContextValue = {
  enabled: boolean;
  available: boolean;
  ready: boolean;
  melody: Melody;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
  cycleMelody: () => void;
};

const MusicContext = createContext<MusicContextValue>({
  enabled: false,
  available: false,
  ready: false,
  melody: CLASSICAL_MELODIES[0],
  setEnabled: () => undefined,
  toggle: () => undefined,
  cycleMelody: () => undefined,
});

function PianoInteractionLayer({ melodyId }: { melodyId: string }) {
  const lastMouseAt = useRef(0);
  const lastMouseX = useRef<number | null>(null);
  const lastScrollAt = useRef(0);
  const lastScrollY = useRef(0);
  const noteIndex = useRef(0);

  useEffect(() => {
    noteIndex.current = 0;
    lastScrollY.current = window.scrollY;
  }, [melodyId]);

  useEffect(() => {
    const playStep = (direction: 1 | -1) => {
      const melody = getMelodyById(melodyId);
      noteIndex.current = stepMelody(melody, noteIndex.current, direction);
      playPianoNote(frequencyAt(melody, noteIndex.current));
    };

    const onMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseAt.current < 90) return;
      if (lastMouseX.current !== null && Math.abs(event.clientX - lastMouseX.current) < 32) return;

      lastMouseAt.current = now;
      lastMouseX.current = event.clientX;
      playStep(1);
    };

    const onScroll = () => {
      const now = performance.now();
      if (now - lastScrollAt.current < 120) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) < 4) return;

      lastScrollAt.current = now;
      lastScrollY.current = currentY;
      playStep(delta > 0 ? 1 : -1);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [melodyId]);

  return null;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const { tier } = usePerformanceTier();
  const available = tier !== "basic";
  const [ready, setReady] = useState(false);
  const [enabled, setEnabledState] = useState(false);
  const [melodyId, setMelodyId] = useState(DEFAULT_MELODY_ID);

  useEffect(() => {
    const storedEnabled = localStorage.getItem(ENABLED_KEY) === "true";
    const storedMelody = localStorage.getItem(MELODY_KEY) ?? DEFAULT_MELODY_ID;
    setMelodyId(getMelodyById(storedMelody).id);

    if (storedEnabled && available) {
      void resumePianoContext().then(() => setEnabledState(true));
    } else {
      setEnabledState(false);
    }

    setReady(true);
  }, [available]);

  const setEnabled = useCallback(
    async (value: boolean) => {
      if (!available) {
        setEnabledState(false);
        localStorage.setItem(ENABLED_KEY, "false");
        suspendPianoContext();
        return;
      }

      if (value) {
        await resumePianoContext();
      } else {
        suspendPianoContext();
      }

      setEnabledState(value);
      localStorage.setItem(ENABLED_KEY, String(value));
    },
    [available],
  );

  const toggle = useCallback(() => {
    void setEnabled(!enabled);
  }, [enabled, setEnabled]);

  const cycleMelody = useCallback(() => {
    setMelodyId((current) => {
      const next = nextMelodyId(current);
      localStorage.setItem(MELODY_KEY, next);
      return next;
    });
  }, []);

  const melody = useMemo(() => getMelodyById(melodyId), [melodyId]);

  const value = useMemo(
    () => ({
      enabled: enabled && available,
      available,
      ready,
      melody,
      setEnabled,
      toggle,
      cycleMelody,
    }),
    [enabled, available, ready, melody, setEnabled, toggle, cycleMelody],
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {enabled && available ? <PianoInteractionLayer melodyId={melodyId} /> : null}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
