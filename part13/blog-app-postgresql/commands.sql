CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    author text,
    url text NOT NULL,
    likes integer,
    date time
);

insert into blogs (title, author, url, likes) values ('How to Meditate?', 'Mahdi Smith', 'http://mhdi.co.uk/meditate', 0);
insert into blogs (title, author, url, likes) values ('Why Coding is Awesome and Coders are intelligent beings', 'Big Smoke', 'http://mhdi.co.uk/coders', 0);