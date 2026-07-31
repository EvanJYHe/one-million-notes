import type { CSSProperties } from "react";
import type { StickyNoteData } from "../types/note";
import { getNoteAppearance } from "../lib/note-appearance";

type NoteCardProps = {
  displayIndex: number;
  note: StickyNoteData;
  onClick: () => void;
};

export function NoteCard({ displayIndex, note, onClick }: NoteCardProps) {
  const appearance = getNoteAppearance(note.id, displayIndex);
  const style = {
    "--note-color": appearance.color,
    "--note-font": appearance.font,
    "--note-height": `${appearance.height}%`,
    "--note-depth": appearance.zIndex,
    "--note-radius": appearance.radius,
    "--note-text-size": getTextSize(note.note),
    "--note-rotation": `${appearance.rotation}deg`,
    "--note-width": `${appearance.width}%`,
    "--note-x": `${appearance.offsetX}px`,
    "--note-y": `${appearance.offsetY}px`,
  } as CSSProperties;

  return (
    <button
      className="wall-note"
      type="button"
      onClick={onClick}
      style={style}
      aria-label="Open note"
    >
      <span>{note.note}</span>
    </button>
  );
}

function getTextSize(note: string) {
  if (note.length <= 32) {
    return "clamp(0.86rem, 1.05vw, 1.04rem)";
  }

  if (note.length <= 82) {
    return "clamp(0.76rem, 0.92vw, 0.94rem)";
  }

  return "clamp(0.66rem, 0.78vw, 0.8rem)";
}
