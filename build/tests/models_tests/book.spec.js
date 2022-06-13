"use strict";
// import { book, bookModel } from "../../models/book";
// import { category, categoryModel } from "../../models/category";
// import { author, authorModel } from "../../models/author";
// import { publisher, publisherModel } from "../../models/publisher";
// import db from "../../database";
// const bookM = new bookModel();
// const category = new categoryModel();
// const author = new authorModel();
// const publisher = new publisherModel();
// describe("book Model", ()=> {
//     const book = {
//         title:'ANbiaa Allah',
//         author_id: 1, 
//         category_id: 1,
//         publisher_id: 1, 
//         published_year: '1999', 
//         pages: 200, price: 100, 
//         isbn: '30009771481037', 
//         in_stock: 6
//       } as book
//     beforeAll(async() => {
//         await category.create({name:'literature'});
//         await author.create({id: 1, name: "Ahmed Bahget"})
//         await publisher.create({p_name: 'El-Shroq', p_address: 'Cairo', phone: '0245698712'});        
//     });
//     afterAll(async() => {
//         const conn = await db.connect()
//       let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
//       await conn.query(sql);
//       sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
//       await conn.query(sql);
//       sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
//       await conn.query(sql);
//       sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;'; 
//       await conn.query(sql);
//       conn.release();      
//     });
//     it('Should have an index method', ()=>{
//         expect(bookM.index).toBeDefined();
//     });
//     it('Should have an create method', ()=>{
//         expect(bookM.create).toBeDefined();
//     });
//     it('Should have an showById method', ()=>{
//         expect(bookM.showById).toBeDefined();
//     });
//     it('Should have an updateById method', ()=>{
//         expect(bookM.updateById).toBeDefined();
//     });
//     it('Should have an deleteById method', ()=>{
//         expect(bookM.deleteById).toBeDefined();
//     });
//     it('create method should add new book', async() => {
//         const result = await bookM.create({
//         title:'ANbiaa Allah',
//         author_id: 1, 
//         category_id: 1,
//         publisher_id: 1, 
//         published_year: '1999', 
//         pages: 200, price: 100, 
//         isbn: '30009771481037', 
//         in_stock: 6});
//         expect(result).toEqual({
//             id: 1,
//             title:'ANbiaa Allah',
//         author_id: 1, 
//         category_id: 1,
//         publisher_id: 1, 
//         published_year: '1999', 
//         pages: 200, price: 100, 
//         isbn: '30009771481037', 
//         in_stock: 6
//         });
//     });
//     it('Index method should return a list of books', async() => {
//         const result = await bookM.index();
//         expect(result).toEqual([{id: 1,
//         title:'ANbiaa Allah',
//         author_id: 1, 
//         category_id: 1,
//         publisher_id: 1, 
//         published_year: '1999', 
//         pages: 200, price: 100, 
//         isbn: '30009771481037', 
//         in_stock: 6
//         }]);
//     });
//     it('showById method should return one book with the same id', async() => {
//         const result = await bookM.showById('1');
//         expect(result.id).toBe(1);
//         expect(result.title).toBe(book.title);
//         expect(result.author_id).toBe(book.author_id);
//         expect(result.category_id).toBe(book.category_id);
//         expect(result.publisher_id).toBe(book.publisher_id);
//         expect(result.published_year).toBe(book.published_year);
//         expect(result.pages).toBe(book.pages);
//         expect(result.price).toBe(book.price);
//         expect(result.isbn).toBe(book.isbn);
//         expect(result.in_stock).toBe(book.in_stock); 
//     });
//     it('updateById method should return one book with new data', async() => {
//         const result = await bookM.updateById({... book, 
//         title: 'Anbiaa Allah',        
//         published_year: '1972',
//         pages: 478,
//         in_stock: 5,
//         id: 1});
//         expect(result.id).toBe(1);
//         expect(result.title).toBe('Anbiaa Allah');
//         expect(result.author_id).toBe(book.author_id);
//         expect(result.category_id).toBe(book.category_id);
//         expect(result.publisher_id).toBe(book.publisher_id);
//         expect(result.published_year).toBe('1972');
//         expect(result.pages).toBe(478);
//         expect(result.price).toBe(book.price);
//         expect(result.isbn).toBe(book.isbn);
//         expect(result.in_stock).toBe(5);            
//         });    
//     it('Delete method should remove one book with the same id', async() => {        
//         bookM.deleteById('1');
//         const result = await bookM.index();
//         expect(result).toEqual([]);
//     });
// });
