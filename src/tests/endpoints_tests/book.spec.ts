import { book, bookModel } from "../../models/book";
import db from "../../database";
import supertest from "supertest";
import app from "../../index";
import { category, categoryModel } from "../../models/category";
import { author, authorModel } from "../../models/author";
import { publisher, publisherModel } from "../../models/publisher";

const bookM = new bookModel();
const category = new categoryModel();
const author = new authorModel();
const publisher = new publisherModel();
const request = supertest(app);

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

describe("book endpoints CRUD methods test", () => {

    beforeAll(async () => {
        await category.create({name:'literature'});
        await author.create({id: 1, name: "Ahmed Bahget"})
        await publisher.create({p_name: 'El-Shroq', p_address: 'Cairo', phone: '0245698712'});
        const createdbook = await bookM.create(book);
        book.id = createdbook.id;
    });

    afterAll(async () => {
        const conn = await db.connect()
        let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        await conn.query(sql);
        sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
      await conn.query(sql);
      sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
      await conn.query(sql);
      sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;'; 
      await conn.query(sql);
        conn.release();
    });

    it('Should create a new book', async () => {
        const result = await request
            .post('/books')
            .set('Content-type', 'application/json')
            .send({
                title: 'test_book',
    author_id: 1, 
    category_id: 1,
    publisher_id: 1, 
    published_year: '2022', 
    pages: 200, price: 100, 
    isbn: '30009771481088', 
    in_stock: 20 
            })
        expect(result.status).toBe(200);
        const { id, title, author_id, category_id, publisher_id, published_year, pages, price, isbn, in_stock } = result.body.data
        expect(id).toBe(2);
        expect(title).toBe('test_book');
        expect(author_id).toBe(1);
        expect(category_id).toBe(1);
        expect(publisher_id).toBe(1);
        expect(published_year).toBe('2022');
        expect(pages).toBe(200);
        expect(price).toBe(100);
        expect(isbn).toBe('30009771481088');
        expect(in_stock).toBe(20);
    });

    it('Should List all books', async () => {
        const result = await request
            .get('/books')
            .set('Content-type', 'application/json')   
        console.log("the book endpoint test result: " + result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBeGreaterThan(0);
    });

    it('Should return one book', async () => {
        const result = await request
            .get(`/books/ ${book.id}`)
            .set('Content-type', 'application/json')  
        console.log("the book endpoint test result get book by ID: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, title, author_id, category_id, publisher_id, published_year, pages, price, isbn, in_stock } = result.body.data
        expect(id).toBe(book.id);
        expect(title).toBe('ANbiaa Allah');
        expect(author_id).toBe(1);
        expect(category_id).toBe(1);
        expect(publisher_id).toBe(1);
        expect(published_year).toBe('1999');
        expect(pages).toBe(200);
        expect(price).toBe(100);
        expect(isbn).toBe('30009771481037');
        expect(in_stock).toBe(6);
        
    });

    it('Should update book by Id', async () => {
        const result = await request
            .put(`/books/ ${book.id}`)
            .set('Content-type', 'application/json') 
            .send({
                title: 'test_update', id: book.id
            })
        console.log("the book endpoint test result update book: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, title } = result.body.data
        expect(id).toBe(book.id);
        expect(title).toBe('test_update');
    });

    it('Should delete one book by Id', async () => {
        const result = await request
            .delete(`/books/ ${book.id}`)
            .set('Content-type', 'application/json')
            .send({ id: book.id})
        console.log("the book endpoint test result delete book: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, title } = result.body.data
        expect(id).toBe(book.id);
        expect(title).toBe('test_update');
    });

});