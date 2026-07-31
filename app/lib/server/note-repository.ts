import "server-only";

import type { StickyNoteData } from "../../types/note";
import { getRuntimeEnv } from "./cloudflare";

type NoteRow = {
  id: string;
  note: string;
  order: number;
};

type CountRow = {
  value: number;
};

type PositionRow = {
  position: number;
};

const DEFAULT_PAGE_SIZE = 250;
const MAX_PAGE_SIZE = 500;

export async function listNotes({
  limit = DEFAULT_PAGE_SIZE,
}: {
  limit?: number;
} = {}) {
  const { DB } = await getRuntimeEnv();
  const pageSize = Math.min(Math.max(Math.floor(limit), 1), MAX_PAGE_SIZE);
  const [notesResult, countResult] = await DB.batch<NoteRow | CountRow>([
    DB.prepare(
      `SELECT id, body AS note, position AS "order"
       FROM (
         SELECT id, body, position
         FROM notes
         WHERE status = 'approved'
         ORDER BY position DESC
         LIMIT ?1
       )
       ORDER BY position ASC, id ASC`,
    ).bind(pageSize),
    DB.prepare(
      "SELECT value FROM counters WHERE name = 'approved_notes'",
    ),
  ]);
  const notes = notesResult.results.map((row) =>
    toStickyNote(row as NoteRow),
  );
  const countRow = countResult.results[0] as CountRow | undefined;

  return {
    count: Number(countRow?.value ?? notes.length),
    notes,
  };
}

export async function createNote(body: string) {
  const { DB } = await getRuntimeEnv();
  const id = crypto.randomUUID();
  const createdAt = Date.now();
  const randomKey = crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
  const [insertResult, countResult] = await DB.batch([
    DB.prepare(
      `INSERT INTO notes (id, body, created_at, random_key, status)
       VALUES (?1, ?2, ?3, ?4, 'approved')
       RETURNING position`,
    ).bind(id, body, createdAt, randomKey),
    DB.prepare(
      `UPDATE counters
       SET value = value + 1
       WHERE name = 'approved_notes'
       RETURNING value`,
    ),
  ]);
  const position = (
    insertResult.results[0] as PositionRow | undefined
  )?.position;
  const count = (countResult.results[0] as CountRow | undefined)?.value;

  if (!position || !count) {
    throw new Error("D1 did not return the inserted note metadata");
  }

  return {
    count: Number(count),
    note: {
      id,
      note: body,
      order: Number(position),
    } satisfies StickyNoteData,
  };
}

function toStickyNote(row: NoteRow): StickyNoteData {
  return {
    id: row.id,
    note: row.note,
    order: Number(row.order),
  };
}
