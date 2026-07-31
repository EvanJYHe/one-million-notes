import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(projectRoot, "data/seed-notes.json");
const outputPath = resolve(projectRoot, "migrations/0002_seed_notes.sql");
const exportedNotes = JSON.parse(await readFile(sourcePath, "utf8"));
const seedTimestamp = Date.UTC(2026, 0, 1);

const notes = exportedNotes
  .map(({ "Document ID": id, note, order }) => ({ id, note, order }))
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));

const statements = [
  "-- Generated from data/seed-notes.json by scripts/generate-d1-seed.mjs.",
  "-- Keep the JSON archive as the source of truth for the original wall data.",
  "",
  ...notes.map(
    ({ id, note }, index) =>
      [
        "INSERT OR IGNORE INTO notes",
        "  (id, body, created_at, random_key, status)",
        `VALUES ('${escapeSql(id)}', '${escapeSql(note)}', ${
          seedTimestamp + index
        }, ${randomKey(id)}, 'approved');`,
      ].join("\n"),
  ),
  "",
  "UPDATE counters",
  "SET value = (SELECT COUNT(*) FROM notes WHERE status = 'approved')",
  "WHERE name = 'approved_notes';",
  "",
];

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, statements.join("\n"));

console.log(`Generated ${notes.length} seed notes at ${outputPath}`);

function escapeSql(value) {
  return value.replaceAll("'", "''");
}

function randomKey(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return ((hash >>> 0) / 4294967296).toFixed(10);
}
