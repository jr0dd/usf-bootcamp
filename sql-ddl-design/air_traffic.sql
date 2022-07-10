-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE airlines
(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE countries
(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE cities
(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline TEXT REFERENCES airlines,
  from_city TEXT REFERENCES cities,
  from_country TEXT REFERENCES countries,
  to_city TEXT REFERENCES cities,
  to_country TEXT REFERENCES countries
);

INSERT INTO airlines
  (id, name)
VALUES
  ('UA', 'United'),
  ('BA', 'British Airways'),
  ('DL', 'Delta'),
  ('OR', 'TUI Fly Belgium'),
  ('CA', 'Air China'),
  ('AA', 'American Airlines'),
  ('O6', 'Avianca Brasil');

INSERT INTO countries
  (id, name)
VALUES
  ('USA', 'United States'),
  ('JPN', 'Japan'),
  ('MEX', 'Mexico'),
  ('GBR', 'United Kingdom'),
  ('CHN', 'China'),
  ('MAR', 'Morocco'),
  ('BRA', 'Brazil'),
  ('CHL', 'Chile'),
  ('FRA', 'France'),
  ('UAE', 'United Arab Emirites');

INSERT INTO cities
  (id, name)
VALUES
  ('CAS', 'Casablanca'),
  ('SEA', 'Seattle'),
  ('TYO', 'Tokyo'),
  ('MEX', 'Mexico City'),
  ('LAX', 'Los Angeles'),
  ('JFK', 'New York'),
  ('PAR', 'Paris'),
  ('DXB', 'Dubai'),
  ('CHI', 'Chicago'),
  ('CLT', 'Charlotte'),
  ('CID', 'Cedar Rapids'),
  ('SAO', 'Sao Paolo'),
  ('SCL', 'Santiago'),
  ('PEK', 'Beijing'),
  ('MSY', 'New Orleans'),
  ('LHR', 'London'),
  ('LAS', 'Las Vegas'),
  ('BWI', 'Washington DC');

INSERT INTO tickets
  (first_name, last_name, seat, departure, arrival, airline, from_city, from_country, to_city, to_country)
VALUES
  ('Jennifer', 'Finch', '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 'UA', 'BWI', 'USA', 'SEA', 'USA'),
  ('Thadeus', 'Gathercoal', '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 'BA', 'TYO', 'JPN', 'LHR', 'GBR'),
  ('Sonja', 'Pauley', '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 'DL', 'LAX', 'USA', 'LAS', 'USA'),
  ('Jennifer', 'Finch', '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 'DL', 'SEA', 'USA', 'MEX', 'MEX'),
  ('Waneta', 'Skeleton', '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 'OR', 'PAR', 'FRA', 'CAS', 'MAR'),
  ('Thadeus', 'Gathercoal', '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 'CA', 'DXB', 'UAE', 'PEK', 'CHN'),
  ('Berkie', 'Wycliff', '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 'UA', 'JFK', 'USA', 'CLT', 'USA'),
  ('Alvin', 'Leathes', '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 'AA', 'CID', 'USA', 'CHI', 'USA'),
  ('Berkie', 'Wycliff', '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 'AA', 'CLT', 'USA', 'MSY', 'USA'),
  ('Cory', 'Squibbes', '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 'O6', 'SAO', 'BRA', 'SCL', 'CHL');
