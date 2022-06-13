// import { order, orderModel } from "../../models/order";
// import { user, userModel } from "../../models/user";
// import { book, bookModel } from "../../models/book";
// import { category, categoryModel } from "../../models/category";
// import { author, authorModel } from "../../models/author";
// import { publisher, publisherModel } from "../../models/publisher";
// import db from "../../database";

// const category = new categoryModel();
// const author = new authorModel();
// const publisher = new publisherModel();
// const orderM = new orderModel();
// const user = new userModel();
// const book = new bookModel();

// describe("order Model", () => {
//     const order = {
//         id: 1,
//         o_date: new Date('1/1/2022'),
//         o_total: 100,
//         user_id: 1
//     } as order

//     beforeAll(async () => {
//         await user.create({ u_name: 'Abd El-Rahman', email: 'aer@bookstore.com', u_password: '123654' });
//         await category.create({ name: 'literature' });
//         await author.create({ id: 1, name: "Ahmed Bahget" })
//         await publisher.create({ p_name: 'El-Shroq', p_address: 'Cairo', phone: '0245698712' });
//         await book.create({
//             title: 'ANbiaa Allah',
//             author_id: 1,
//             category_id: 1,
//             publisher_id: 1,
//             published_year: '1999',
//             pages: 200, price: 100,
//             isbn: '12304567891024',
//             in_stock: 6
//         })
//     });

//     afterAll(async () => {
//         const conn = await db.connect()
//         let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
//         await conn.query(sql);    
       
//         conn.release();
//     });
//     it('Should have an index method', () => {
//         expect(orderM.index).toBeDefined();
//     });
//     it('Should have an create method', () => {
//         expect(orderM.create).toBeDefined();
//     });
//     it('Should have an showById method', () => {
//         expect(orderM.showById).toBeDefined();
//     });
//     it('Should have an updateById method', () => {
//         expect(orderM.updateById).toBeDefined();
//     });
//     it('Should have an deleteById method', () => {
//         expect(orderM.deleteById).toBeDefined();
//     });
//     it('create method should add new order', async () => {
//         const result = await orderM.create({
//             id: 1,
//             o_date: new Date('1/1/2022'),
//             o_total: 100,
//             user_id: 1
//         });
//         expect(result).toEqual({
//             id: 1,
//             o_date: new Date('1/1/2022'),
//             o_total: 100,
//             user_id: 1
//         });
//     });
//     it('Index method should return a list of orders', async () => {
//         const result = await orderM.index();
//         expect(result).toEqual([{
//             id: 1,
//             o_date: new Date('1/1/2022'),
//             o_total: 100,
//             user_id: 1
//         }]);
//     });

//     it('Index method should return one order with the same id', async () => {
//         const result = await orderM.showById('1');
//         expect(result).toEqual({
//             id: 1,
//             o_date: new Date('1/1/2022'),
//             o_total: 100,
//             user_id: 1
//         });
//     });

//     it('Index method should return one order with new data', async () => {
//         const result = await orderM.updateById({
//             ...order,
//             o_date: new Date('2/2/2022'),
//             o_total: 90,
//             id: 1
//         });
//         expect(result.id).toBe(1);
//         expect(result.o_date).toBe(new Date('2/2/2022'));
//         expect(result.o_total).toBe(90);
//     });

//     it('Index method should remove one order with the same id', async () => {
//         orderM.deleteById('1');
//         const result = await orderM.deleteById('1');
//         expect(result).toEqual([]);
//     });
// });