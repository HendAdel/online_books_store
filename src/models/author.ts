import db from "../database";

export type author = {
    id: number;
    name: string;
    }

export class authorModel {
    async index(): Promise<author[]> {
        try {
        const conn = await db.connect();
        const sql = `select id, name from authors`;
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
        }
        catch(err)
        {
            throw new Error(`cannot get the authors {$err}`);
        }
    }

    async create(a: author): Promise<author[]> {
        try {
        const conn = await db.connect();
        const sql = `Insert into authors (name) values($2) returning id, name`;
        const result = await conn.query(sql, [a.id, a.name]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot create the new author {$err}`);
        }
    }

    async showById(id: string): Promise<author[]> {
        try {
        const conn = await db.connect();
        const sql = `Select id, name from authors Where id = ($1)`;
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the author {$err}`);
        }
    }

    async updateById(a: author): Promise<author[]> {
        try {
        const conn = await db.connect();
        const sql = `Update authors set name = $2 Where id = ($1) returning id, name`;
         const result = await conn.query(sql, [a.id, a.name]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot update the author {$err}`);
        }
    }

    async deleteById(id: string): Promise<author[]> {
        try {
        const conn = await db.connect();
        const sql = 'Delete from authors Where id = ($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot delete the author {$err}`);
        }
    }
}