-- Messages sent through the portfolio contact form (Cloudflare D1 / SQLite).
CREATE TABLE IF NOT EXISTS contact_messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  name        TEXT    NOT NULL CHECK (length(name) BETWEEN 2 AND 100),
  email       TEXT    NOT NULL CHECK (length(email) <= 254),
  phone       TEXT    NOT NULL CHECK (length(phone) <= 30),
  message     TEXT    NOT NULL CHECK (length(message) BETWEEN 10 AND 2000),
  ip_address  TEXT,
  emailed     INTEGER NOT NULL DEFAULT 0,
  handled     INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages (created_at DESC);
