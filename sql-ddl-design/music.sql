-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE SEQUENCE albums_id_seq
  start with 101
  minvalue 101;

CREATE TABLE albums
(
  id INTEGER NOT NULL DEFAULT nextval('albums_id_seq') PRIMARY KEY,
  name TEXT NOT NULL,
  artist TEXT NOT NULL
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  artists TEXT[] NOT NULL,
  album_id INTEGER REFERENCES albums,
  producers TEXT[] NOT NULL
);

INSERT INTO artists
  (name)
VALUES
  ('Hanson'),
  ('Queen'),
  ('Mariah Carey'),
  ('Lady Gaga'),
  ('Nickleback'),
  ('Jay Z'),
  ('Katie Perry'),
  ('Maroon 5'),
  ('Avril Levigne'),
  ('Destiny''s Child');

INSERT INTO albums
  (name, artist)
VALUES
  ('Middle of Nowhere', 1),
  ('A Night at the Opera', 2),
  ('Daydream', 3),
  ('A Star Is Born', 4),
  ('Silver Side Up', 5),
  ('The Blueprint 3', 6),
  ('Prism', 7),
  ('Hands All Over', 8),
  ('Let Go', 9),
  ('The Writing''s on the Wall', 10);

INSERT INTO songs
  (title, duration_in_seconds, release_date, artists, album_id, producers)
VALUES
  ('MMMBop', 238, '04-15-1997', '{"Hanson"}', 101, '{"Dust Brothers", "Stephen Lironi"}'),
  ('Bohemian Rhapsody', 355, '10-31-1975', '{"Queen"}', 102, '{"Roy Thomas Baker"}'),
  ('One Sweet Day', 282, '11-14-1995', '{"Mariah Cary", "Boyz II Men"}', 103, '{"Walter Afanasieff"}'),
  ('Shallow', 216, '09-27-2018', '{"Lady Gaga", "Bradley Cooper"}', 104, '{"Benjamin Rice"}'),
  ('How You Remind Me', 223, '08-21-2001', '{"Nickelback"}', 105, '{"Rick Parashar"}'),
  ('New York State of Mind', 276, '10-20-2009', '{"Jay Z", "Alicia Keys"}', 106, '{"Al Shux"}'),
  ('Dark Horse', 215, '12-17-2013', '{"Katy Perry", "Juicy J"}', 107, '{"Max Martin", "Cirkut"}'),
  ('Moves Like Jagger', 201, '06-21-2011', '{"Maroon 5", "Christina Aguilera"}', 108, '{"Shellback", "Benny Blanco"}'),
  ('Complicated', 244, '05-14-2002', '{"Avril Lavigne"}', 109, '{"The Matrix"}'),
  ('Say My Name', 240, '11-07-1999', '{"Destiny''s Child"}', 110, '{"Darkchild"}');
