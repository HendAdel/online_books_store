import db from "../database";
import { orderDetails, orderDetailsModel } from './order_details';

export type order = {
    id?: number;
    o_date: Date;
    o_total: number;
    user_id: number;
}
 const orderDetailsM = new orderDetailsModel();

export class orderModel {

   

    async index(): Promise<order[]> {
        try {
        const conn = await db.connect();
        const sql = `select id, o_date, o_total, user_id from orders`;
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
        }
        catch(err)
        {
            throw new Error(`cannot get the orders ${err}`);
        }
    }

    async create(o: order): Promise<order> {
        try {
        const conn = await db.connect();
        const sql = `Insert into orders (o_date, o_total, user_id) 
        values( $1, $2, $3) returning id, o_date, o_total, user_id`;
        const result = await conn.query(sql, [o.o_date, o.o_total, o.user_id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot create the new order ${err}`);
        }
    }

    async showById(id: string): Promise<order> {
        try {
        const conn = await db.connect();
        const sql = `Select id, o_date, o_total, user_id from orders Where id = ($1)`;
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the order ${err}`);
        }
    }

    async updateById(o: order): Promise<order> {
        try {
        const conn = await db.connect();
        const sql = `Update orders set o_date = $2, o_total = $3, user_id = $4 Where id = ($1)
         returning id, o_date, o_total, user_id`;
         const result = await conn.query(sql, [o.id, o.o_date, o.o_total, o.user_id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot update the order ${err}`);
        }
    }    

    async create_o_d(order_id: number,
        b_count: number,
        book_id: number): Promise<orderDetails> {
        try {
            const conn = await db.connect();
            console.log('open connection to create_o_d');
            const sql = `Insert into orders_details (order_id, b_count, book_id) 
            values( $1, $2, $3) returning id, order_id, b_count, book_id`;
            console.log('sql statment: ' + sql);
            const result = await conn.query(sql, [order_id, b_count, book_id]);            
            console.log('execute the query, rowsCount:'  + result.rowCount);
            conn.release();
            return result.rows[0];
            }
            catch(err)
            {
                throw new Error(`cannot create the new order Details ${err}`);
            }
    }

    async deleteById(id: string): Promise<order[]> {
        try {
        const conn = await db.connect();
        console.log('delete orderD M orderId: ' + id);
        await orderDetailsM.deleteById(id);
        
        const sql = `Delete from orders Where id = ($1) returning id, o_date, o_total, user_id`;
        console.log('delete order H sql: ' + sql);
        const result = await conn.query(sql, [id]);
        console.log('deleted order H orderId: ' + result.rows[0].id);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot delete the order ${err}`);
        }
    }
}