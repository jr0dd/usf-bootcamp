DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE doctors
(
  id SERIAL PRIMARY KEY,
  last_name TEXT NOT NULL
);

CREATE TABLE patients
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE visits
(
  id SERIAL PRIMARY KEY,
  date TIMESTAMP NOT NULL,
  doctor INTEGER REFERENCES doctors,
  patient INTEGER REFERENCES patients,
  diseases TEXT[]
);

INSERT INTO doctors
  (last_name)
VALUES
  ('seus'),
  ('phil');

INSERT INTO patients
  (first_name, last_name)
VALUES
  ('joe', 'mama'),
  ('jim', 'bob');

INSERT INTO visits
  (date, doctor, patient, diseases)
VALUES
  ('2022-01-01', 1, 2, '{}'),
  ('2021-12-31', 2, 1, '{"sleep apnea", "anxiety disorder"}');
