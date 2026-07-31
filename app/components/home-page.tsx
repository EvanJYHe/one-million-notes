"use client";

import { useState } from "react";
import { Hero } from "./hero";
import { IntroSplash } from "./intro-splash";
import { NoteDialog } from "./note-dialog";
import { NotesBoard } from "./notes-board";
import { SiteHeader } from "./site-header";
import type { StickyNoteData } from "../types/note";
import { useNotes } from "../hooks/use-notes";

type HomePageProps = {
  initialCount: number;
  initialNotes: StickyNoteData[];
};

export function HomePage({ initialCount, initialNotes }: HomePageProps) {
  const [selectedNote, setSelectedNote] = useState<StickyNoteData | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const { addNote, noteCount, notes } = useNotes({
    initialCount,
    initialNotes,
  });

  return (
    <>
      <IntroSplash />
      <SiteHeader onAddNote={() => setIsComposerOpen(true)} />

      <main>
        <div className="page-shell">
          <Hero noteCount={noteCount} />

          <section className="notes-section" id="notes">
            <NotesBoard notes={notes} onSelectNote={setSelectedNote} />
          </section>
        </div>
      </main>

      {(selectedNote || isComposerOpen) && (
        <NoteDialog
          note={selectedNote ?? undefined}
          onAddNote={addNote}
          onClose={() => {
            setSelectedNote(null);
            setIsComposerOpen(false);
          }}
        />
      )}
    </>
  );
}
