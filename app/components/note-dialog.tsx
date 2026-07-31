"use client";

import {
  type FormEvent,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  MAX_NOTE_LENGTH,
  MIN_NOTE_LENGTH,
  type StickyNoteData,
} from "../types/note";
import { getNoteAppearance } from "../lib/note-appearance";

type NoteDialogProps = {
  note?: StickyNoteData;
  onAddNote: (note: string) => Promise<void>;
  onClose: () => void;
};

export function NoteDialog({ note, onAddNote, onClose }: NoteDialogProps) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const appearance = getNoteAppearance(note?.id ?? "new-note");
  const meaningfulLength = draft.replace(/\s/g, "").length;
  const canSubmit =
    meaningfulLength >= MIN_NOTE_LENGTH &&
    draft.length <= MAX_NOTE_LENGTH &&
    !isSubmitting;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (note) {
      closeButtonRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [note, onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onAddNote(draft.trim());
      onClose();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "The note could not be posted. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="note-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          "--dialog-color": appearance.color,
          "--dialog-font": appearance.font,
        } as React.CSSProperties}
      >
        <button
          ref={closeButtonRef}
          className="dialog-close"
          type="button"
          onClick={onClose}
          aria-label="Close note"
        >
          ×
        </button>

        {note ? (
          <>
            <p className="dialog-label">A note from the wall</p>
            <h2 id={titleId}>A little moment</h2>
            <p className="dialog-note-copy">{note.note}</p>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="dialog-label">Add to the wall</p>
            <h2 id={titleId}>Leave your note</h2>
            <p className="dialog-description">
              Share one honest thought, observation, or small moment.
            </p>

            <label className="sr-only" htmlFor="new-note">
              Your note
            </label>
            <textarea
              ref={textareaRef}
              id="new-note"
              value={draft}
              maxLength={MAX_NOTE_LENGTH}
              onChange={(event) => {
                setDraft(event.target.value);
                setError("");
              }}
              placeholder="Today I noticed…"
            />

            <div className="form-meta">
              <span>
                {meaningfulLength < MIN_NOTE_LENGTH
                  ? `${MIN_NOTE_LENGTH - meaningfulLength} characters to go`
                  : "Ready to share"}
              </span>
              <span>
                {draft.length}/{MAX_NOTE_LENGTH}
              </span>
            </div>

            <p className="form-error" role="alert" aria-live="polite">
              {error}
            </p>

            <div className="dialog-actions">
              <button className="cancel-button" type="button" onClick={onClose}>
                Cancel
              </button>
              <button
                className="submit-button"
                type="submit"
                disabled={!canSubmit}
              >
                {isSubmitting ? "Checking…" : "Post Note"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>,
    document.body,
  );
}
