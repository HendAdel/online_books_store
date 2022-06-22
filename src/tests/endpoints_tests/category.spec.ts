import { category, categoryModel } from "../../models/category";
import db from "../../database";
import supertest from "supertest";
import app from "../../index";

const categoryM = new categoryModel();
const request = supertest(app);

const category = {
    name: 'Sciences'
} as category

describe("category endpoints CRUD methods test", () => {

    beforeAll(async () => {
        const createdcategory = await categoryM.create(category);
        category.id = createdcategory.id;
    });

    afterAll(async () => {
        const conn = await db.connect();
        let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        await conn.query(sql);
        sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    });

    it('Should create a new category', async () => {
        const result = await request
            .post('/categories')
            .set('Content-type', 'application/json')
            .send({
                name: 'test_category'
            })
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(2);
        expect(name).toBe('test_category');
    });

    it('Should List all categories', async () => {
        const result = await request
            .get('/categories')
            .set('Content-type', 'application/json')   
        console.log("the category endpoint test result: " + result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBeGreaterThan(0);
    });

    it('Should return one category', async () => {
        const result = await request
            .get(`/categories/ ${category.id}`)
            .set('Content-type', 'application/json')  
        console.log("the category endpoint test result get category by ID: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(category.id);
        expect(name).toBe('Sciences');
        
    });

    it('Should update category by Id', async () => {
        const result = await request
            .put(`/categories/ ${category.id}`)
            .set('Content-type', 'application/json') 
            .send({
                name: 'test_update', id: category.id
            })
        console.log("the category endpoint test result update category: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(category.id);
        expect(name).toBe('test_update');
    });

    it('Should delete one category by Id', async () => {
        const result = await request
            .delete(`/categories/ ${category.id}`)
            .set('Content-type', 'application/json')
            .send({ id: category.id})
        console.log("the category endpoint test result delete category: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, name } = result.body.data
        expect(id).toBe(category.id);
        expect(name).toBe('test_update');
    });   

});