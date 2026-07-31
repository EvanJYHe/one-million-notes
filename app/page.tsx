import { HomePage } from "./components/home-page";
import { listNotes } from "./lib/server/note-repository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { count, notes } = await listNotes();

  return <HomePage initialCount={count} initialNotes={notes} />;
}
