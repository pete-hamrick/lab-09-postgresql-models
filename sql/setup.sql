DROP TABLE IF EXISTS films;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS starships;
-- DROP TABLE IF EXISTS vehicles;

CREATE TABLE films (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    release_date TEXT NOT NULL,
    episode_id TEXT,
    director TEXT NOT NULL
);

CREATE TABLE characters (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    height TEXT NOT NULL
);

CREATE TABLE planets (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    climate TEXT NOT NULL,
    terrain TEXT NOT NULL,
    population TEXT NOT NULL
);

CREATE TABLE starships (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    model TEXT NOT NULL,
    starship_class TEXT NOT NULL,
    passengers TEXT NOT NULL
);

-- CREATE TABLE vehichles (
--     id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     name TEXT NOT NULL,
--     model TEXT NOT NULL,
--     manufacturer TEXT NOT NULL,
--     passengers TEXT NOT NULL
-- );