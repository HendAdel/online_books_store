"use strict";
// import { user, userModel } from "../../models/user";
// import db from "../../database";
// const userM = new userModel();
// describe("user Model", ()=> {
//     const user = {u_name: 'Abd El-Rahman',
//          email: 'test@bookstore.com',
//           u_password: '123654'}as user
//     afterAll(async () => {
//         const conn = await db.connect()
//         let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM orders_details; \nALTER SEQUENCE orders_details_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
//         await conn.query(sql);        
//         sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
//         await conn.query(sql);        
//         conn.release();
//     });
//     it('Should have an index method', ()=>{
//         expect(userM.index).toBeDefined();
//     });
//     it('create method should add new user', async() => {
//         const createdUser = await userM.create({u_name: 'Abd El-Rahman',
//          email: 'test@bookstore.com',
//           u_password: '123654'}as user);
//         expect(createdUser).toEqual({
//             id: createdUser.id,
//             u_name: 'Abd El-Rahman', email: 'test@bookstore.com', u_password: '123654'
//         }as user);
//     });
//     it('Index method should return a list of users', async() => {
//         const result = await userM.index();
//         expect(result).toEqual([{
//             id: 1,
//             u_name: 'Abd El-Rahman', email: 'test@bookstore.com', u_password: '123654'
//         }]);
//     });
//     it('Index method should return one user with the same id', async() => {
//         const result = await userM.showById('1');
//         expect(result.id).toBe(1);
//         expect(result.u_name).toBe(user.u_name);
//         expect(result.email).toBe(user.email);
//     });
//     it('Index method should return one user with new data', async() => {
//         const result = await userM.updateById({... user, 
//         u_name: 'Abd El-Rahman Mostafa', 
//         email: 'a_mostafa@bookstore.com',
//         id: 1});
//         expect(result.id).toBe(1);
//         expect(result.u_name).toBe('Abd El-Rahman Mostafa');
//         expect(result.email).toBe('a_mostafa@bookstore.com');      
//         });    
//     it('Index method should remove one user with the same id', async() => {
//         userM.deleteById('1');
//         const result = await userM.index();
//         expect(result).toEqual([]);
//     });
// });
