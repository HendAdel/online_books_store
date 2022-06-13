"use strict";
// import { publisher, publisherModel } from "../../models/publisher";
// import db from "../../database";
// const publisherM = new publisherModel();
// describe("publisher Model", ()=> {
//     const publisher = {
//         p_name: 'El-Shroq', 
//         p_address: 'Cairo', 
//         phone: '0245698712'} as publisher
//     afterAll(async () => {
//         const conn = await db.connect()
//         // sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
//         // await conn.query(sql);
//         let sql = 'DELETE FROM publishers; \nALTER SEQUENCE publishers_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         conn.release();
//     });
//     it('Should have an index method', ()=>{
//         expect(publisherM.index).toBeDefined();
//     });
//     it('create method should add new publisher', async() => {
//         const result = await publisherM.create({
//         p_name: 'El-Shroq', 
//         p_address: 'Cairo', 
//         phone: '0245698712'});
//         expect(result).toEqual({
//             id: 1,
//             p_name: 'El-Shroq', p_address: 'Cairo', phone: '0245698712'
//         });
//     });
//     it('Index method should return a list of publishers', async() => {
//         const result = await publisherM.index();
//         expect(result).toEqual([{
//             id: 1,
//             p_name: 'El-Shroq', p_address: 'Cairo', phone: '0245698712'
//         }]);
//     });
//     it('Index method should return one publisher with the same id', async() => {
//         const result = await publisherM.showById('1');
//         expect(result.id).toBe(1);
//         expect(result.p_name).toBe(publisher.p_name);
//     });
//     it('Index method should return one publisher with new data', async() => {
//         const result = await publisherM.updateById({... publisher,            
//                 p_address: 'Gizaa', 
//         id: 1});
//         expect(result.id).toBe(1);
//         expect(result.p_name).toBe(publisher.p_name);
//         expect(result.p_address).toBe('Gizaa');
//         expect(result.phone).toBe(publisher.phone);
//         });    
//     it('Index method should remove one publisher with the same id', async() => {
//         publisherM.deleteById('1');
//         const result = await publisherM.index();
//         expect(result).toEqual([]);
//     });
// });
