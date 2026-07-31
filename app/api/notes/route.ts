import { NextResponse } from "next/server";
import { getRuntimeEnv } from "../../lib/server/cloudflare";
import { createNote, listNotes } from "../../lib/server/note-repository";
import {
  ensureNoteIsSafe,
  NoteSubmissionError,
  validateNoteText,
} from "../../lib/server/moderation";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? "250");

  try {
    const result = await listNotes({
      limit: Number.isFinite(limit) ? limit : undefined,
    });

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Unable to read notes", error);

    return NextResponse.json(
      { error: "The note wall is temporarily unavailable." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const text = validateNoteText(body?.text);
    const env = await getRuntimeEnv();

    await ensureNoteIsSafe({
      apiKey: env.GEMINI_API_KEY,
      model: env.GEMINI_MODEL,
      text,
    });

    const result = await createNote(text);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof NoteSubmissionError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    console.error("Unable to save note", error);

    return NextResponse.json(
      { error: "The note could not be saved. Please try again." },
      { status: 503 },
    );
  }
}

async function readJson(request: Request) {
  try {
    return (await request.json()) as { text?: unknown };
  } catch {
    return null;
  }
}
