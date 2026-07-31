CREATE TABLE notes (
  position INTEGER PRIMARY KEY AUTOINCREMENT,
  id TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL CHECK (length(body) BETWEEN 1 AND 300),
  created_at INTEGER NOT NULL,
  random_key REAL NOT NULL CHECK (random_key >= 0 AND random_key < 1),
  status TEXT NOT NULL DEFAULT 'approved'
    CHECK (status IN ('approved', 'hidden'))
);

CREATE INDEX notes_by_position
  ON notes(status, position DESC);

CREATE INDEX notes_by_random_key
  ON notes(status, random_key);

CREATE TABLE counters (
  name TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0 CHECK (value >= 0)
);

INSERT INTO counters (name, value)
VALUES ('approved_notes', 0);
