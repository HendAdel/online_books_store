/* create orders table */
CREATE TABLE public.orders
(
    id serial primary key,
    o_date date,
    o_total integer,
    user_id integer REFERENCES users (id)
);