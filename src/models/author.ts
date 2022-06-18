import { query } from "express";
import db from "../database";

export type author = {
  id?: number;
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
    catch (err) {
      throw new Error(`cannot get the authors ${err}`);
    }
  }

  // create new author
  async create(a: author): Promise<author> {
    try {
      console.log('test create author model');
      const conn = await db.connect()
      console.log('open connection');
      const sql = `Insert into authors (name) values ($1) returning id, name`
      console.log('qurey string');
      const result = await conn.query(sql, [
        a.name
      ])
      console.log('execute the query');
      conn.release()
      console.log('release connection');
      console.log(result.rows[0]);
      return result.rows[0]

    } catch (error) {
      throw new Error(
        `Unable to create (${a.name}): ${(error as Error).message}`
      )
    }
  }

  async showById(id: string): Promise<author> {
    try {
      const conn = await db.connect();
      const sql = `Select id, name from authors Where id = ($1)`;
      console.log("The showById query: "+ sql);
      const result = await conn.query(sql, [id]);
      console.log("The showById result: " + result);
      conn.release();
      return result.rows[0];
    }
    catch (err) {
      throw new Error(`cannot get the author ${err}`);
    }
  }

  async updateById(a: author): Promise<author> {
    try {
      console.log('test update author model');
      const conn = await db.connect();
      console.log('open connection');
      const sql = `Update authors set name = $2 Where id = ($1) returning id, name`;
      console.log('qurey string');
      const result = await conn.query(sql, [a.id, a.name]);
      console.log('execute the query');
      conn.release();
      return result.rows[0];
    }
    catch (err) {
      throw new Error(`Cannot update the author ${err}`);
    }
  }

  async deleteById(id: string): Promise<author> {
    try {
      console.log('test update author model');
      const conn = await db.connect();
      console.log('open connection');
      const sql = 'Delete from authors Where id = ($1) returning id, name';
      console.log('qurey string');
      const result = await conn.query(sql, [id]);
      console.log('execute the query');
      conn.release();
      return result.rows[0];
    }
    catch (err) {
      throw new Error(`cannot delete the author ${err}`);
    }
  }
}
