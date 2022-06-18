import db from "../database";

export type book = {
    id?: number;
    title: string;
    author_id: number;
    category_id: number;
    publisher_id: number;
    published_year: string;
    pages: number;
    price: number;
    isbn: string;
    in_stock: number;
}

export class bookModel {
    async index(): Promise<book[]> {
        try {
            const conn = await db.connect();
            const sql = `select id, title, author_id, category_id,
        publisher_id, published_year, pages, price, isbn, in_stock from books`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get the books ${err}`);
        }
    }

    async create(b: book): Promise<book> {
        try {

            const sql = `Insert into books (title, author_id, category_id,
        publisher_id, published_year, pages, price, isbn, in_stock) 
        values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id, title, author_id, category_id,
        publisher_id, published_year, pages, price, isbn, in_stock`;
            const conn = await db.connect();
            const result = await conn.query(sql, [b.title, b.author_id, b.category_id,
            b.publisher_id, b.published_year, b.pages, b.price, b.isbn, b.in_stock]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            throw new Error(`cannot create the new book ${err}`);
        }
    }

    async showById(id: string): Promise<book> {
        try {
            const conn = await db.connect();
            const sql = `Select id, title, author_id, category_id,
        publisher_id, published_year, pages, price, isbn, in_stock from books Where id = ($1)`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot get the book ${err}`);
        }
    }

    async updateById(b: book): Promise<book> {
        try {
            const conn = await db.connect();
            const sql = `Update books set title = $2, author_id = $3, category_id = $4,
        publisher_id = $5, published_year = $6, pages = $7, price = $8, isbn = $9,
         in_stock = $10 Where id = ($1) returning id, title, author_id, category_id,
         publisher_id, published_year, pages, price, isbn, in_stock`;
            const result = await conn.query(sql, [b.id, b.title, b.author_id, b.category_id,
            b.publisher_id, b.published_year, b.pages, b.price, b.isbn, b.in_stock]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot update the book ${err}`);
        }
    }

    async deleteById(id: string): Promise<book[]> {
        try {
            console.log('test update book model');
            const conn = await db.connect();
            console.log('open connection');
            const sql = `Delete from books Where id = ($1) returning id, title, author_id, category_id, 
        publisher_id, published_year, pages, price, isbn, in_stock`;
            console.log('qurey string');
            const result = await conn.query(sql, [id]);
            console.log('execute the query');
            conn.release();
            console.log("The deleted ID: " + result.rows[0].id)
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot delete the book ${err}`);
        }
    }
}