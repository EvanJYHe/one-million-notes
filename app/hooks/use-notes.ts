"use client";

import { useCallback, useState } from "react";
import type { StickyNoteData } from "../types/note";

type CreateNoteResponse = {
  count: number;
  note: StickyNoteData;
};

type ErrorResponse = {
  error?: string;
};

export function useNotes({
  initialCount,
  initialNotes,
}: {
  initialCount: number;
  initialNotes: StickyNoteData[];
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [noteCount, setNoteCount] = useState(initialCount);

  const addNote = useCallback(async (text: string) => {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const result = (await response.json()) as CreateNoteResponse & ErrorResponse;

    if (!response.ok) {
      throw new Error(result.error ?? "The note could not be saved.");
    }

    setNotes((currentNotes) => [...currentNotes, result.note]);
    setNoteCount(result.count);
  }, []);

  return {
    addNote,
    noteCount,
    notes,
  };
}
