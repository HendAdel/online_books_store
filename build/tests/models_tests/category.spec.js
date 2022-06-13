"use strict";
// import { category, categoryModel } from "../../models/category";
// import db from "../../database";
// const categoryM = new categoryModel();
// describe("category Model", ()=> {
//     const category = {
//         name: "literature"        
//     } as category
//     afterAll(async () => {
//         const conn = await db.connect()
//         let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         sql = 'DELETE FROM categories; \nALTER SEQUENCE categories_id_seq RESTART WITH 1;';
//         await conn.query(sql);
//         conn.release();
//     });
//     it('Should have an index method', ()=>{
//         expect(categoryM.index).toBeDefined();
//     });
//     it('create method should add new category', async() => {
//         const result = await categoryM.create({name:'literature'});
//         expect(result).toEqual({
//             id: 1,
//             name: "literature"
//         });
//     });
//     it('Index method should return a list of categorys', async() => {
//         const result = await categoryM.index();
//         expect(result).toEqual([{
//             id: 1,
//             name: "literature"
//         }]);
//     });
//     it('Index method should return one category with the same id', async() => {
//         const result = await categoryM.showById('1');
//         expect(result.id).toBe(1);
//         expect(result.name).toBe(category.name);
//     });
//     it('Index method should return one category with new data', async() => {
//         const result = await categoryM.updateById({... category, 
//         name: 'Literature',
//         id: 1});
//         expect(result.id).toBe(1);
//         expect(result.name).toBe('Literature');
//         });    
//     it('Index method should remove one category with the same id', async() => {
//         categoryM.deleteById('1');
//         const result = await categoryM.index();
//         expect(result).toEqual([]);
//     });
// });
