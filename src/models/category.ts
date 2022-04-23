import db from "../database";

export type category = {
    id: number;
    name: string;
}

export class categoryModel {
    async index(): Promise<category[]> {
        try {
        const conn = await db.connect();
        const sql = `select id, name from categories`;
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
        }
        catch(err)
        {
            throw new Error(`cannot get the categories {$err}`);
        }
    }

    async create(c: category): Promise<category[]> {
        try {
        const conn = await db.connect();
        const sql = `Insert into categories (name) values($2) returning id, name`;
        const result = await conn.query(sql, [c.id, c.name]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot create the new category {$err}`);
        }
    }

    async showById(id: string): Promise<category[]> {
        try {
        const conn = await db.connect();
        const sql = `Select id, name from categories Where id = ($1)`;
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the category {$err}`);
        }
    }

    async updateById(c: category): Promise<category[]> {
        try {
        const conn = await db.connect();
        const sql = `Update categories set name = $2 Where id = ($1) returning id, name`;
         const result = await conn.query(sql, [c.id, c.name]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot update the category {$err}`);
        }
    }

    async deleteById(id: string): Promise<category[]> {
        try {
        const conn = await db.connect();
        const sql = 'Delete from categories Where id = ($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot delete the category {$err}`);
        }
    }
}