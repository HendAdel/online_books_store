/* CREATE TABLE orders_details */
CREATE TABLE orders_details
(
    id serial primary key,
    order_id integer REFERENCES orders (id),
    b_count integer,
    book_id integer REFERENCES books (id)
);