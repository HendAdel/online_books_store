import { user, userModel } from "../../models/user";
import db from "../../database";
import supertest from "supertest";
import app from "../../index";

const userM = new userModel();
const request = supertest(app);
let save_token = '';
const user = {
    u_name: 'Abd El-Rahman',
    email: 'test@bookstore.com',
    u_password: '123654'
} as user

describe("user endpoints login authentication test", () => {

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

    it('It should logain and get token with right email', async () => {
        const result = await request
            .post('/users/login')
            .set('Content-type', 'application/json')
            .send({
                email: 'test@bookstore.com',
                u_password: '123654'
            })
        console.log("the login endpoint test result: " + result.body.data.token);
        expect(result.status).toBe(200);
        const { id, u_name, email, token: token } = result.body.data
        expect(id).toBe(1);
        expect(u_name).toBe('Abd El-Rahman');
        expect(email).toBe('test@bookstore.com');
        expect(token).toBe(token);
        save_token = token;
    });

    it('Should to be failed authenticat with wrong email', async () => {
        const result = await request
            .post('/users/login')
            .set('Content-type', 'application/json')
            .send({
                email: 'testwrong@bookstore.com',
                u_password: 'password456'
            })
        expect(result.status).toBe(401);
    });
});


describe("user endpoints CRUD methods test", () => {

    it('Should create a new user', async () => {
        const result = await request
            .post('/users')
            .set('Content-type', 'application/json')
            .send({
                u_name: 'test_user', email: 'test@bookstore.com',
                u_password: '123654'
            })
        console.log("the login endpoint test result: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, u_name, email } = result.body.data
        expect(id).toBe(user.id);
        expect(u_name).toBe('test_user');
        expect(email).toBe('test@bookstore.com');
    });

    it('Should List all users', async () => {
        console.log(`Insex endpoint the token is: ${save_token}`);
        const result = await request
            .get('/users')
            // .set('Content-type', 'application/json')            
        .set('Authorization', `Bearer ${save_token}`)
        console.log("the login endpoint test result: " + result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBeGreaterThan(0);
    });

    it('Should return one user', async () => {
        const result = await request
            .get(`/users/ ${user.id}`)
            .set('Content-type', 'application/json')                     
        .set('Authorization', `Bearer ${save_token}`)
        console.log("the login endpoint test result get user by ID: " + result.body.data);
        expect(result.status).toBe(200);
        const { u_name, email } = result.body.data
        expect(u_name).toBe('test_user');
        expect(email).toBe('test@bookstore.com');
    });

    it('Should update user by Id', async () => {
        const result = await request
            .put(`/users/ ${user.id}`)
            .set('Content-type', 'application/json')         
            .set('Authorization', `Bearer ${save_token}`)
            .send({
                u_name: 'test_update', email: 'test@bookstore.com',
                u_password: '123654', id: user.id
            })
        console.log("the login endpoint test result update user: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, u_name, email } = result.body.data
        expect(id).toBe(user.id);
        expect(u_name).toBe('test_update');
        expect(email).toBe('test@bookstore.com');
    });

    it('Should delete one user by Id', async () => {
        const result = await request
            .delete(`/users/ ${user.id}`)
            .set('Content-type', 'application/json')         
            .set('Authorization', `Bearer ${save_token}`)
            .send({ id: user.id})
        console.log("the login endpoint test result delete user: " + result.body.data);
        expect(result.status).toBe(200);
        const { id, u_name, email } = result.body.data
        expect(id).toBe(user.id);
        expect(u_name).toBe('test_update');
        expect(email).toBe('test@bookstore.com');
    });

   

});