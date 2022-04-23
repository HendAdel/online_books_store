/* create orders table */
CREATE TABLE IF NOT EXISTS public.orders
(
    id serial primary key,
    o_date date,
    o_total integer,
    user_id integer REFERENCES users (id)
);