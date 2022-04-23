import db from "../database";

export type publisher = {
    id: number;
    p_name: string;
    p_address: string;
    phone: string;
}

export class publisherModel {
    async index(): Promise<publisher[]> {
        try {
        const conn = await db.connect();
        const sql = `select id, p_name, p_address, phone from publishers`;
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
        }
        catch(err)
        {
            throw new Error(`cannot get the publishers {$err}`);
        }
    }

    async create(p: publisher): Promise<publisher[]> {
        try {
        const conn = await db.connect();
        const sql = `Insert into publishers (p_name, p_address, phone) 
        values($2, $3, $4) returning id, p_name, p_address, phone`;
        const result = await conn.query(sql, [p.id, p.p_name, p.p_address, p.phone]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot create the new publisher {$err}`);
        }
    }

    async showById(id: string): Promise<publisher[]> {
        try {
        const conn = await db.connect();
        const sql = `Select id, p_name, p_address, phone from publishers Where id = ($1)`;
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the publisher {$err}`);
        }
    }

    async updateById(p: publisher): Promise<publisher[]> {
        try {
        const conn = await db.connect();
        const sql = `Update publishers set p_name = $2, p_address = $3, phone = $4 Where id = ($1)
         returning id, title, p_address, phone`;
         const result = await conn.query(sql, [p.id, p.p_name, p.p_address, p.phone]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot update the publisher {$err}`);
        }
    }

    async deleteById(id: string): Promise<publisher[]> {
        try {
        const conn = await db.connect();
        const sql = 'Delete from publishers Where id = ($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot delete the publisher {$err}`);
        }
    }
}