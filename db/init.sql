
CREATE TABLE snippet(
    id SERIAL PRIMARY KEY,
    code TEXT,
    title TEXT,
    description TEXT,
    favorites INT DEFAULT 0,
    author TEXT,
    language TEXT
);
INSERT INTO snippet (id, code, title, description, language, author) 
VALUES (
    'const america = 1776', 
    'freedome',
    'I declared a const',
    'JavaScript',
    'Dandy'),
VALUES ('const america = 1776', 'freedome','I declared a const', 'JAVA', 'SCOTT'),
VALUES ('const america = 1776', 'freedome','I declared a const', 'C#', 'CJ'),
VALUES ('const america = 1776', 'freedome','I declared a const','BIRTHDAY BOY', 'ROB');
