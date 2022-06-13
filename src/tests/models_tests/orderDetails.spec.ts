// import { orderDetails, orderDetailsModel } from "../../models/order_details";
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

// const order_detailsM = new orderDetailsModel();

// describe("order_details Model", () => {
//     const orderD = {
//         order_id: 1,
//         b_count: 1,
//         book_id: 1
//     } as orderDetails

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
//         });
//         await orderM.create({
//             id: 1,
//             o_date: new Date('1/1/2022'),
//             o_total: 100,
//             user_id: 1
//         });
//     });

//     afterAll(async () => {
//         const conn = await db.connect();

//         // sql = 'DELETE FROM authors; \nALTER SEQUENCE authors_id_seq RESTART WITH 1;';
//         // await conn.query(sql);
//         // sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
//         // await conn.query(sql);
//         // sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
//         // await conn.query(sql);
//         let sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM orders_details; \nALTER SEQUENCE orders_details_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         conn.release();
//     });

//     it('Should have an create method', () => {
//         expect(order_detailsM.create).toBeDefined();
//     });
//     it('Should have an showById method', () => {
//         expect(order_detailsM.showByOrderId).toBeDefined();
//     });
//     it('Should have an updateById method', () => {
//         expect(order_detailsM.updateById).toBeDefined();
//     });
//     it('Should have an deleteById method', () => {
//         expect(order_detailsM.deleteById).toBeDefined();
//     });
//     it('create method should add new order_details', async () => {
//         const result = await order_detailsM.create({
//             order_id: 1,
//             b_count: 1,
//             book_id: 1
//         });
//         expect(result).toEqual({
//             order_id: 1,
//             b_count: 1,
//             book_id: 1
//         });
//     });

//     it('Index method should return one order_details with the same id', async () => {
//         const result = await order_detailsM.showByOrderId('1');
//         expect(result).toEqual([{
//             id: 1,
//             order_id: 1,
//             b_count: 1,
//             book_id: 1
//         }]);
//     });

//     it('Index method should return one order with new data', async () => {
//         const result = await order_detailsM.updateById({
//             ...orderD,
//             b_count: 2,
//             id: 1
//         });
//         expect(result.id).toBe(1);
//         expect(result.b_count).toBe(2);
//     });

//     it('Index method should remove one order_details with the same id', async () => {
//         order_detailsM.deleteById('1');
//         const result = await order_detailsM.deleteById('1');
//         expect(result).toEqual([]);
//     });
// });