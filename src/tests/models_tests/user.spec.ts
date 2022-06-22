import { user, userModel } from "../../models/user";
import db from "../../database";
// import { request } from "http";
import supertest from "supertest";
import app from "../../index";

const userM = new userModel();
const request = supertest(app);
let token = '';
const user = {u_name: 'test_m_user',
         email: 'test_model@bookstore.com',
          u_password: 'pass123654'}as user

describe("user Model", ()=> {
    beforeAll(async () => {
        const createdUser = await userM.create(user);
        user.id = createdUser.id;
    });

    afterAll(async () => {
        const conn = await db.connect()
        // let sql = 'DELETE FROM books; \nALTER SEQUENCE books_id_seq RESTART WITH 1;';
        // await conn.query(sql);
        // sql = 'DELETE FROM orders_details; \nALTER SEQUENCE orders_details_id_seq RESTART WITH 1;';
        // await conn.query(sql);
        // sql = 'DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        // await conn.query(sql);        
        const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await conn.query(sql);        
        conn.release();
    });

    it('Should have an index method', ()=>{
        expect(userM.index).toBeDefined();
    });
    it('create method should add new user', async() => {
        const createdUser = await userM.create({u_name: 'test_m_user2',
         email: 'test_m_Create@bookstore.com',
          u_password: '123654'}as user);
          const {id, u_name, email} = createdUser;
          expect(id).toBe(createdUser.id);
        expect(u_name).toBe('test_m_user2');
        expect(email).toBe('test_m_Create@bookstore.com');
        
        // expect(createdUser).toEqual({
        //     id: createdUser.id,
        //     u_name: 'Abd El-Rahman', email: 'test@bookstore.com'
        // }as user);
    });
    it('Index method should return a list of users', async() => {
        const result = await userM.index();
        expect(result.length).toBe(2);
        //     [{
        //     // id: 1,
        //     // u_name: 'Abd El-Rahman', email: 'test@bookstore.com', u_password: '123654'
        // }]);
    });

    it('showById method should return one user with the same id', async() => {
        const result = await userM.showById('1');
        expect(result.id).toBe(user.id);
        expect(result.u_name).toBe(user.u_name);
        expect(result.email).toBe(user.email);
    });
  
    it('updateById method should return one user with new data', async() => {
        const result = await userM.updateById({... user, 
        u_name: 'Abd El-Rahman Mostafa', 
        email: 'test_model@bookstore.com',
        id: 1});
        expect(result.id).toBe(1);
        expect(result.u_name).toBe('Abd El-Rahman Mostafa');
        expect(result.email).toBe('test_model@bookstore.com');      
        });    
  
    it('deleteById method should remove one user with the same id', async() => {
        userM.deleteById('1');
        const result = await userM.index();
        expect(result.length).toBeGreaterThan(0);
    });
});
