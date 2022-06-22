import { publisher, publisherModel } from "../../models/publisher";
import db from "../../database";
import supertest from "supertest";
import app from "../../index";

const publisherM = new publisherModel();
const request = supertest(app);

const publisher = {
    p_name: 'El-Shroq', 
    p_address: 'Cairo', 
    phone: '0245698712'} as publisher

describe("publisher endpoints CRUD methods test", () => {

    beforeAll(async () => {
        const createdpublisher = await publisherM.create(publisher);
        publisher.id = createdpublisher.id;
    });

    afterAll(async () => {
        const conn = await db.connect();
        let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        await conn.query(sql);
        sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    });

    it('Should create a new publisher', async () => {
        const result = await request
            .post('/publishers')
            .set('Content-type', 'application/json')
            .send({
                p_name: 'test_publisher'
            })
        expect(result.status).toBe(200);
        const { id, p_name } = result.body.data
        expect(id).toBe(2);
        expect(p_name).toBe('test_publisher');
    });

    it('Should List all publishers', async () => {
        const result = await request
            .get('/publishers')
            .set('Content-type', 'application/json')   
        console.log("the publisher endpoint test result: " + result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBeGreaterThan(0);
    });

    it('Should return one publisher', async () => {
        const result = await request
            .get(`/publishers/ ${publisher.id}`)
            .set('Content-type', 'application/json')  
        console.log("the publisher endpoint test result get publisher by ID: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, p_name, p_address, phone } = result.body.data
        expect(id).toBe(publisher.id);
        expect(p_name).toBe(`El-Shroq`);
        expect(p_address).toBe('Cairo');
        expect(phone).toBe('0245698712');
        
    });

    it('Should update publisher by Id', async () => {
        const result = await request
            .put(`/publishers/ ${publisher.id}`)
            .set('Content-type', 'application/json') 
            .send({
                p_name: 'test_update', id: publisher.id
            })
        console.log("the publisher endpoint test result update publisher: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, p_name } = result.body.data
        expect(id).toBe(publisher.id);
        expect(p_name).toBe('test_update');
    });

    it('Should delete one publisher by Id', async () => {
        const result = await request
            .delete(`/publishers/ ${publisher.id}`)
            .set('Content-type', 'application/json')
            .send({ id: publisher.id})
        console.log("the publisher endpoint test result delete publisher: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, p_name } = result.body.data
        expect(id).toBe(publisher.id);
        expect(p_name).toBe('test_update');
    });   

});