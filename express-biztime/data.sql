\c biztime

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS company_industries;
DROP TABLE IF EXISTS industries;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE industries (
    code text PRIMARY KEY,
    industry text NOT NULL UNIQUE
);

CREATE TABLE company_industries (
  comp_code text REFERENCES companies(code) ON UPDATE CASCADE ON DELETE CASCADE,
  industry_code text REFERENCES industries(code) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT company_industries_pkey PRIMARY KEY (comp_code, industry_code)
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO industries
  VALUES ('tech', 'Technology'),
         ('finance', 'Finance'),
         ('healthcare', 'Healthcare');

INSERT INTO company_industries
  VALUES ('apple', 'tech'),
         ('ibm', 'tech');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);
