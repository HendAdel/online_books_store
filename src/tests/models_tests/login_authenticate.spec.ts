
import { user, userModel } from "../../models/user";
import db from "../../database";
// import { request } from "http";
import supertest from "supertest";
import app from "../../index";

const userM = new userModel();
const request = supertest(app);
let token = '';
const user = {u_name: 'Abd El-Rahman',
         email: 'test@bookstore.com',
          u_password: '123654'}as user

describe("User login authentication model test", ()=> {

    beforeAll(async () => {
        const createdUser = await userM.create(user);
        user.id = createdUser.id;
    });

    afterAll(async () => {
        const conn = await db.connect()
        const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await conn.query(sql);        
        conn.release();
    });

    it('Should have an login_authenticate method', ()=>{
        expect(userM.login_authenticate).toBeDefined();
    });

    it('login_authenticate should return authenticated user.', async() => {
        const result = await userM.login_authenticate(user.email, user.u_password);        
        expect(result?.u_name).toBe('Abd El-Rahman');
        expect(result?.email).toBe('test@bookstore.com');

        });    
  
    it('Should to be failed authenticat with wrong email', async() => {
        const result = await userM.login_authenticate('testwrong@bookstore.com','password456');
        expect(result).toBe(null);
    });
});