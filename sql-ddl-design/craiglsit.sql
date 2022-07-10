DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_region_id INTEGER REFERENCES regions
);

CREATE TABLE posts
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  location TEXT NOT NULL,
  user_id INTEGER REFERENCES users,
  region_id INTEGER REFERENCES regions,
  category_id INTEGER REFERENCES categories
);

INSERT INTO regions
  (name)
VALUES
  ('Tampa Bay Area'),
  ('South Florida');

INSERT INTO categories
  (name)
VALUES
  ('Electronics'),
  ('Tools');

INSERT INTO users
  (username, password, email, preferred_region_id)
VALUES
  ('joe_mama', 'jnaskjnask', 'joemama@compuserv.com', 1),
  ('joe_daddy', 'jksdnbkjwafnl', 'joedaddy@aol.com', 2);

INSERT INTO posts
  (title, text, location, user_id, region_id, category_id)
VALUES
  ('Used MacBook', 'buy my macbook', 'home', 2, 1, 1),
  ('Lawnmower', 'Buy my lawn mower', 'right near the beach', 1, 2, 2);
