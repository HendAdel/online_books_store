/* Create books table */
CREATE TABLE public.books
(
    id serial primary key,
    title varchar(100),
    author_id integer REFERENCES authors (id),
    category_id integer REFERENCES categories (id),
    publisher_id integer REFERENCES publishers (id),
    published_year varchar(4),
    pages integer,
    price integer,
    isbn varchar(14),
    in_stock integer
);