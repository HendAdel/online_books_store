import db from "../database";

export type orderDetails = {
    id: number;
    order_id: number;
    b_count: number;
    book_id: number;
}

export class orderDetailsModel {
    async index(): Promise<orderDetails[]> {
        try {
        const conn = await db.connect();
        const sql = `select id, order_id, b_count, book_id from orders_details`;
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
        }
        catch(err)
        {
            throw new Error(`cannot get the orders Detailss {$err}`);
        }
    }

    async create(od: orderDetails): Promise<orderDetails[]> {
        try {
        const conn = await db.connect();
        const sql = `Insert into orders_details (order_id, b_count, book_id) 
        values( $2, $3, $4) returning id, order_id, b_count, book_id`;
        const result = await conn.query(sql, [od.id, od.order_id, od.b_count, od.book_id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot create the new order Details {$err}`);
        }
    }

    async showById(id: string): Promise<orderDetails[]> {
        try {
        const conn = await db.connect();
        const sql = `Select id, order_id, b_count, book_id from orders_detailss Where id = ($1)`;
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the order details {$err}`);
        }
    }

    async updateById(od: orderDetails): Promise<orderDetails[]> {
        try {
        const conn = await db.connect();
        const sql = `Update orders_detailss set order_id = $2, b_count = $3, book_id = $4 Where id = ($1)
         returning id, order_id, b_count, book_id`;
         const result = await conn.query(sql, [od.id, od.order_id, od.b_count, od.book_id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot update the order detailss {$err}`);
        }
    }

    async deleteById(id: string): Promise<orderDetails[]> {
        try {
        const conn = await db.connect();
        const sql = 'Delete from orders_detailss Where id = ($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the order detailss {$err}`);
        }
    }
}