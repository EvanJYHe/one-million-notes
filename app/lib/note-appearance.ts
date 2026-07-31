const referenceColors = [
  "#bd8be3",
  "#6fd0ee",
  "#f59bc0",
  "#ffd969",
  "#bd8be3",
  "#91e3c2",
  "#f59bc0",
  "#ffd969",
  "#91e3c2",
  "#bd8be3",
  "#ffd969",
  "#6fd0ee",
  "#f59bc0",
  "#91e3c2",
  "#f8c978",
  "#ffd969",
];

const fonts = [
  "\"Patrick Hand\", cursive",
  "\"Kalam\", cursive",
  "\"Schoolbell\", cursive",
  "\"Architects Daughter\", cursive",
  "\"Gloria Hallelujah\", cursive",
];

const radii = [
  "4px 6px 5px 3px",
  "7px 4px 6px 5px",
  "3px 7px 4px 6px",
  "6px 5px 7px 4px",
];

export type NoteAppearance = {
  color: string;
  font: string;
  height: number;
  offsetX: number;
  offsetY: number;
  radius: string;
  rotation: number;
  width: number;
  zIndex: number;
};

export function getNoteAppearance(
  id: string,
  displayIndex?: number,
): NoteAppearance {
  const seed = hashString(id);

  return {
    color:
      displayIndex === undefined
        ? referenceColors[pick(seed, 0, referenceColors.length)]
        : referenceColors[displayIndex % referenceColors.length],
    font: fonts[pick(seed, 1, fonts.length)],
    height: 78 + pick(seed, 2, 20),
    offsetX: pick(seed, 3, 27) - 13,
    offsetY: pick(seed, 4, 17) - 8,
    radius: radii[pick(seed, 5, radii.length)],
    rotation: pick(seed, 6, 11) - 5,
    width: 80 + pick(seed, 7, 25),
    zIndex: 1 + pick(seed, 9, 5),
  };
}

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function pick(seed: number, salt: number, range: number) {
  let value = seed + salt * 0x9e3779b9;
  value ^= value >>> 16;
  value = Math.imul(value, 0x21f0aaad);
  value ^= value >>> 15;

  return (value >>> 0) % range;
}
