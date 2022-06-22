import { order, orderModel } from "../../models/order";
import db from "../../database";
import supertest from "supertest";
import app from "../../index";
import { category, categoryModel } from "../../models/category";
import { author, authorModel } from "../../models/author";
import { publisher, publisherModel } from "../../models/publisher";
import { book, bookModel } from "../../models/book";
import { user, userModel } from "../../models/user";

const bookM = new bookModel();
const category = new categoryModel();
const author = new authorModel();
const publisher = new publisherModel();
const user = new userModel();

const book = {
    title:'ANbiaa Allah',
    author_id: 1, 
    category_id: 1,
    publisher_id: 1, 
    published_year: '1999', 
    pages: 200, price: 100, 
    isbn: '30009771481037', 
    in_stock: 6
  } as book
const orderM = new orderModel();
const request = supertest(app);

const order = {
        o_date: new Date('1/1/2022'),
        o_total: 100,
        user_id: 1
    } as order

describe("order endpoints CRUD methods test", () => {

    beforeAll(async () => {
        await user.create({ u_name: 'Abd El-Rahman', email: 'aer@bookstore.com', u_password: '123654' });        
        await category.create({name:'literature'});
        await author.create({id: 1, name: "Ahmed Bahget"})
        await publisher.create({p_name: 'El-Shroq', p_address: 'Cairo', phone: '0245698712'});
        const createdbook = await bookM.create(book);
        book.id = createdbook.id;
        const createdorder = await orderM.create(order);
        order.id = createdorder.id;
    });

    afterAll(async () => {
        const conn = await db.connect();
        let sql = 'DELETE FROM orders_details; \nALTER SEQUENCE orders_details_id_seq RESTART WITH 1;';
        await conn.query(sql);
        sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        await conn.query(sql);
        sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
      await conn.query(sql);
      sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
      await conn.query(sql);
      sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;'; 
      await conn.query(sql);
         sql = 'DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        await conn.query(sql);
        sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await conn.query(sql);    
        conn.release();
    });

    it('Should create a new order', async () => {
        const result = await request
            .post('/orders')
            .set('Content-type', 'application/json')
            .send({
                o_date: new Date('6/6/2022'),
                o_total: 200,
                user_id: 1
            });
            expect(result.status).toBe(200);
            const { id, o_date, o_total, user_id } = result.body.data;
        expect(id).toBe(2);
        expect(o_total).toBe(200);
        expect(user_id).toBe(1);        
            
    });

    it('Should List all orders', async () => {
        const result = await request
            .get('/orders')
            .set('Content-type', 'application/json')   
        console.log("the order endpoint test result: " + result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBeGreaterThan(0);
    });

    it('Should return one order', async () => {
        const result = await request
            .get(`/orders/ ${order.id}`)
            .set('Content-type', 'application/json')  
        console.log("the order endpoint test result get order by ID: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, o_total, user_id } = result.body.data;
        expect(id).toBe(order.id);
        expect(o_total).toBe(100);
        expect(user_id).toBe(1);       
        
    });

    it('Should update order by Id', async () => {
        const result = await request
            .put(`/orders/ ${order.id}`)
            .set('Content-type', 'application/json') 
            .send({
                o_total: 150, id: order.id
            })
        console.log("the order endpoint test result update order: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, o_total } = result.body.data
        expect(id).toBe(order.id);
        expect(o_total).toBe(150);
    });    

    it('Should create a new order details', async () => {
        const result = await request
            .post(`/orders/ ${order.id}/books`)
            .set('Content-type', 'application/json')
            .send({
                order_id: 1,
                b_count: 1,
                book_id: 1
            });
            expect(result.status).toBe(200);
            const { id, order_id, b_count, book_id } = result.body.data;
        expect(id).toBe(1);
        expect(order_id).toBe(order.id);
        expect(b_count).toBe(1);
        expect(book_id).toBe(1);        
            
    }); 

    it('Should delete one order by Id', async () => {
        const result = await request
            .delete(`/orders/ ${order.id}`)
            .set('Content-type', 'application/json')
            .send({ id: order.id})
        console.log("the order endpoint test result delete order: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, o_total } = result.body.data
        expect(id).toBe(order.id);
        expect(o_total).toBe(150);
    });

});