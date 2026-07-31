"use client";

import AutoSizer from "react-virtualized-auto-sizer";
import {
  FixedSizeGrid as Grid,
  type GridChildComponentProps,
} from "react-window";
import type { StickyNoteData } from "../types/note";
import { NoteCard } from "./note-card";

type NotesBoardProps = {
  notes: StickyNoteData[];
  onSelectNote: (note: StickyNoteData) => void;
};

type GridData = NotesBoardProps & {
  columnCount: number;
};

function BoardCell({
  columnIndex,
  rowIndex,
  style,
  data,
}: GridChildComponentProps<GridData>) {
  const noteIndex = rowIndex * data.columnCount + columnIndex;
  const note = data.notes[noteIndex];

  if (!note) {
    return null;
  }

  return (
    <div className="wall-cell" style={style}>
      <NoteCard
        displayIndex={noteIndex}
        note={note}
        onClick={() => data.onSelectNote(note)}
      />
    </div>
  );
}

export function NotesBoard({ notes, onSelectNote }: NotesBoardProps) {
  return (
    <div className="board-frame">
      <div className="corkboard">
        <AutoSizer>
          {({ width, height }) => {
            const columnCount = getColumnCount(width);
            const columnWidth = width / columnCount;
            const rowHeight = getRowHeight(width);
            const rowCount = Math.ceil(notes.length / columnCount);

            return (
              <Grid
                className="note-grid"
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={height}
                itemData={{ columnCount, notes, onSelectNote }}
                overscanRowCount={2}
                rowCount={rowCount}
                rowHeight={rowHeight}
                width={width}
              >
                {BoardCell}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
}

function getColumnCount(width: number) {
  if (width < 460) {
    return 2;
  }

  if (width < 760) {
    return 3;
  }

  if (width < 1100) {
    return 5;
  }

  if (width < 1320) {
    return 6;
  }

  return 7;
}

function getRowHeight(width: number) {
  if (width < 460) {
    return 152;
  }

  if (width < 760) {
    return 156;
  }

  return 158;
}
