import { author, authorModel } from "../../models/author";
import db from "../../database";
import supertest from "supertest";
import app from "../../index";

const authorM = new authorModel();
const request = supertest(app);

const author = {
    name: 'Stephen R. Covey'
} as author

describe("author endpoints CRUD methods test", () => {

    beforeAll(async () => {
        const createdauthor = await authorM.create(author);
        author.id = createdauthor.id;
    });

    afterAll(async () => {
        const conn = await db.connect();
        let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        await conn.query(sql);
        sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    });

    it('Should create a new author', async () => {
        const result = await request
            .post('/authors')
            .set('Content-type', 'application/json')
            .send({
                name: 'test_author'
            })
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(2);
        expect(name).toBe('test_author');
    });

    it('Should List all authors', async () => {
        const result = await request
            .get('/authors')
            .set('Content-type', 'application/json')   
        console.log("the author endpoint test result: " + result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBeGreaterThan(0);
    });

    it('Should return one author', async () => {
        const result = await request
            .get(`/authors/ ${author.id}`)
            .set('Content-type', 'application/json')  
        console.log("the author endpoint test result get author by ID: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(author.id);
        expect(name).toBe('Stephen R. Covey');
        
    });

    it('Should update author by Id', async () => {
        const result = await request
            .put(`/authors/ ${author.id}`)
            .set('Content-type', 'application/json') 
            .send({
                name: 'test_update', id: author.id
            })
        console.log("the Author endpoint test result update author: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(author.id);
        expect(name).toBe('test_update');
    });

    it('Should delete one author by Id', async () => {
        const result = await request
            .delete(`/authors/ ${author.id}`)
            .set('Content-type', 'application/json')
            .send({ id: author.id})
        console.log("the author endpoint test result delete author: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(author.id);
        expect(name).toBe('test_update');
    });   

});