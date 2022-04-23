import db from "../database";

export type user = {
    id: number;
    u_name: string;
    email: number;
    u_password: string;
}

export class userModel {
    async index(): Promise<user[]> {
        try {
        const conn = await db.connect();
        const sql = `select id, u_name, email, u_password from users`;
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
        }
        catch(err)
        {
            throw new Error(`cannot get the users {$err}`);
        }
    }

    async create(u: user): Promise<user[]> {
        try {
        const conn = await db.connect();
        const sql = `Insert into users (u_name, email, u_password) 
        values($2, $3, $4) returning id, u_name, email, u_password`;
        const result = await conn.query(sql, [u.id, u.u_name, u.email, u.u_password]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot create the new user {$err}`);
        }
    }

    async showById(id: string): Promise<user[]> {
        try {
        const conn = await db.connect();
        const sql = `Select id, u_name, email, u_password from users Where id = ($1)`;
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot get the user {$err}`);
        }
    }

    async updateById(u: user): Promise<user[]> {
        try {
        const conn = await db.connect();
        const sql = `Update users set u_name = $2, email = $3, u_password = $4 Where id = ($1) 
        returning id, u_name, email, u_password`;
         const result = await conn.query(sql, [u.id, u.u_name, u.email, u.u_password]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot update the user {$err}`);
        }
    }

    async deleteById(id: string): Promise<user[]> {
        try {
        const conn = await db.connect();
        const sql = 'Delete from users Where id = ($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
        }
        catch(err)
        {
            throw new Error(`cannot delete the user {$err}`);
        }
    }
}