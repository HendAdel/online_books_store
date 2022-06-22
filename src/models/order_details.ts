import db from "../database";

export type orderDetails = {
    id?: number;
    order_id: number;
    b_count: number;
    book_id: number;
}

export class orderDetailsModel {
    async create(od: orderDetails): Promise<orderDetails> {
        try {
        const conn = await db.connect();
        const sql = `Insert into orders_details (order_id, b_count, book_id) 
        values( $1, $2, $3) returning id, order_id, b_count, book_id`;
        const result = await conn.query(sql, [ od.order_id, od.b_count, od.book_id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot create the new order Details ${err}`);
        }
    }

    async showByOrderId(order_id: string): Promise<orderDetails[]> {
        try {
        const conn = await db.connect();
        const sql = `Select id, order_id, b_count, book_id from orders_details Where order_id = ($1)`;
        const result = await conn.query(sql, [order_id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the order details ${err}`);
        }
    }

    async updateById(od: orderDetails): Promise<orderDetails> {
        try {
        const conn = await db.connect();
        const sql = `Update orders_details set order_id = $1, b_count = $2, book_id = $3 Where id = ($1)
         returning id, order_id, b_count, book_id`;
         const result = await conn.query(sql, [od.id, od.order_id, od.b_count, od.book_id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot update the order details ${err}`);
        }
    }

    async deleteById(id: string): Promise<orderDetails[]> {
        try {
        const conn = await db.connect();
        const sql = 'Delete from orders_details Where order_id = ($1)';
        console.log('delete order H sql: ' + sql);
        
        // const sql = 'Delete from orders_details Where id = ($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the order details ${err}`);
        }
    }
}