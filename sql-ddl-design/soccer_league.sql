DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE players
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  team_id INTEGER REFERENCES teams
);

CREATE TABLE matches
(
  id SERIAL PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  team1_id INTEGER NOT NULL REFERENCES teams,
  team2_id INTEGER NOT NULL REFERENCES teams CHECK (team2_id != team1_id),
  referee TEXT NOT NULL
);

CREATE TABLE goals
(
  game_id INTEGER REFERENCES matches,
  player_id INTEGER REFERENCES players
);

CREATE TABLE seasons
(
  id SERIAL PRIMARY KEY,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL
);

INSERT INTO teams
  (name)
VALUES
  ('The Yankees'),
  ('Da Bears'),
  ('The Lightning');

INSERT INTO players
  (first_name, last_name, team_id)
VALUES
  ('joe', 'mama', 3),
  ('jim', 'bob', 2),
  ('albert', 'smith', 1),
  ('donnie', 'drump', 2),
  ('sleepy', 'joe', 3),
  ('elon', 'musk', 1);

INSERT INTO matches
  (date, team1_id, team2_id, referee)
VALUES
  ('2022-02-01', 2, 3, 'Lazy Guy'),
  ('2022-02-02', 3, 1, 'Joe Dirt'),
  ('2022-02-12', 2, 1, 'James Smith'),
  ('2022-02-13', 3, 2, 'Alex Jones');

INSERT INTO goals
  (game_id, player_id)
VALUES
  (1, 2),
  (1, 1),
  (1, 5),
  (2, 6),
  (3, 2),
  (3, 4),
  (4, 4),
  (4, 5);

INSERT INTO seasons
  (start_date, end_date)
VALUES
  ('2022-02-01', '2022-04-30'),
  ('2022-06-01', '2022-08-31'),
  ('2022-10-01', '2022-12-31');