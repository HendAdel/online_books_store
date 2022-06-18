import db from "../database";
import bcrypt from "bcrypt";
import config from "../config";

export type user = {
    id?: number;
    u_name: string;
    email: string;
    u_password: string;
}



export class userModel {

    async login_authenticate(u_name: string, u_password: string): Promise<user | null> {

        try {
            const conn = await db.connect();
            const sql = `Select u_password from users Where u_name = ($1)`;
            const result = await conn.query(sql, [u_name]);
            if(result.rows.length != 0){
                const hashedPassword = result.rows[0];
                const is_validPassword = bcrypt.compareSync(u_password + config.pepper, hashedPassword);
                if(is_validPassword){
                    const user_object = await conn.query(`Select id, u_name, email, u_password from users Where u_name = ($1)`, [u_name]);
                }
            }
            conn.release();
            return null;
        }
        catch (err) {
            throw new Error(`cannot get the user ${err}`);
        }
    }

    async index(): Promise<user[]> {
        try {
            console.log("Test show all users");
            const conn = await db.connect();
            console.log("Test show all users connection open");
            const sql = `select id, u_name, email, u_password from users`;
            console.log("Test show all users sql: " + sql);
            const result = await conn.query(sql);
            console.log("Test show all users result: " + result.rows);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get the users ${err}`);
        }
    }

    async create(u: user): Promise<user> {
        try {
            const conn = await db.connect();
            const sql = `Insert into users (u_name, email, u_password) 
        values($1, $2, $3) returning id, u_name, email, u_password`;
            const hash = bcrypt.hashSync(u.u_password + config.pepper, parseInt(config.salt as string));
            const result = await conn.query(sql, [u.u_name, u.email, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot create the new user ${err}`);
        }
    }

    async showById(id: string): Promise<user> {
        try {
            console.log("Test show by id model");
            const conn = await db.connect();
            console.log("Test show by id conn open");
            const sql = `Select id, u_name, email, u_password from users Where id = ($1)`;
            console.log("Test show by id sql: " + sql);
            const result = await conn.query(sql, [id]);
            console.log("Test show by id result: " + result);
            conn.release();
            console.log("Test show by id after release conn");
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot get the user ${err}`);
        }
    }

    async updateById(u: user): Promise<user> {
        try {
            console.log("Test update user model by id ");
            const conn = await db.connect();
            const sql = `Update users set u_name = $1, email = $2, u_password = $3 Where id = ($4) 
        returning id, u_name, email, u_password`;
        console.log("Test update user by id sql: " + sql);
            const result = await conn.query(sql, [u.u_name, u.email, u.u_password, u.id]);
            console.log("Test update by id result: " + result);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot update the user ${err}`);
        }
    }

    async deleteById(id: string): Promise<user[]> {
        try {
            const conn = await db.connect();
            const sql = 'Delete from users Where id = ($1) returning id, u_name, email';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot delete the user ${err}`);
        }
    }
}
