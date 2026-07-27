-- v81 schema: per-mode rows. Running this DROPS all existing scores (the launch wipe).
DROP TABLE IF EXISTS scores;
CREATE TABLE scores (board TEXT NOT NULL, handle TEXT NOT NULL, day INTEGER NOT NULL DEFAULT 0, mode TEXT NOT NULL DEFAULT '', year INTEGER NOT NULL, hills INTEGER NOT NULL DEFAULT 0, flo INTEGER NOT NULL DEFAULT 0, glyphs TEXT NOT NULL DEFAULT '', ts INTEGER NOT NULL, PRIMARY KEY (board, handle, day, mode));
