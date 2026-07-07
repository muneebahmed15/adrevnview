export type Melody = {
  id: string;
  name: string;
  shortName: string;
  composer: string;
  /** Frequencies in Hz — public-domain themes, simplified monophonic lines */
  notes: number[];
};

function midi(note: number): number {
  return 440 * 2 ** ((note - 69) / 12);
}

function seq(...notes: number[]): number[] {
  return notes.map(midi);
}

/** Beethoven — Symphony No. 9, "Ode to Joy" (opening theme) */
const odeToJoy = seq(
  64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 64, 62, 62,
  64, 64, 65, 67, 67, 65, 64, 62, 60, 60, 62, 64, 62, 60, 60,
  62, 62, 64, 60, 64, 65, 64, 62, 60,
);

/** Beethoven — Für Elise (well-known opening) */
const furElise = seq(
  76, 75, 76, 75, 76, 71, 74, 72, 69,
  60, 64, 69, 71, 60, 64, 69, 71, 69, 68, 69, 64, 72, 76,
  71, 69, 71, 64, 76, 75, 76, 75, 76, 71, 74, 72, 69,
);

/** Mozart — Eine kleine Nachtmusik, K.525 (Allegro opening) */
const eineKleineNachtmusik = seq(
  67, 67, 67, 62, 67, 72, 67, 67, 67, 67, 62, 67, 72,
  67, 67, 67, 67, 62, 67, 77, 82, 77, 82, 86, 82, 77, 74, 72, 67,
);

/** Liszt — Liebestraum No. 3 (dream theme, simplified) */
const liebestraum = seq(
  56, 68, 75, 80, 75, 80, 75, 68, 80, 75, 68, 56, 68, 75, 80,
  84, 80, 75, 68, 75, 80, 84, 87, 84, 80, 75, 68, 63, 68, 75, 80,
);

export const CLASSICAL_MELODIES: Melody[] = [
  {
    id: "ode-to-joy",
    name: "Ode to Joy",
    shortName: "Symphony 9",
    composer: "Beethoven",
    notes: odeToJoy,
  },
  {
    id: "fur-elise",
    name: "Für Elise",
    shortName: "Für Elise",
    composer: "Beethoven",
    notes: furElise,
  },
  {
    id: "eine-kleine-nachtmusik",
    name: "Eine kleine Nachtmusik",
    shortName: "Mozart",
    composer: "Mozart",
    notes: eineKleineNachtmusik,
  },
  {
    id: "liebestraum",
    name: "Liebestraum No. 3",
    shortName: "Liszt",
    composer: "Liszt",
    notes: liebestraum,
  },
];

export const DEFAULT_MELODY_ID = CLASSICAL_MELODIES[0].id;

export function getMelodyById(id: string): Melody {
  return CLASSICAL_MELODIES.find((m) => m.id === id) ?? CLASSICAL_MELODIES[0];
}

export function nextMelodyId(currentId: string): string {
  const index = CLASSICAL_MELODIES.findIndex((m) => m.id === currentId);
  const next = (index + 1) % CLASSICAL_MELODIES.length;
  return CLASSICAL_MELODIES[next]?.id ?? DEFAULT_MELODY_ID;
}

export function stepMelody(melody: Melody, index: number, direction: 1 | -1): number {
  const len = melody.notes.length;
  const next = (index + direction + len) % len;
  return next;
}

export function frequencyAt(melody: Melody, index: number): number {
  return melody.notes[index] ?? melody.notes[0];
}
