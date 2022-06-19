import express, { Request, Response } from "express";
import { user, userModel } from "../models/user";
import { Router } from "express";
import Jwt from "jsonwebtoken";
import config from "../config";
import authentication from "../middleware/authentication.middleware";

const routes = Router();
// const jwt = 
const userM = new userModel();

const create = async (req: Request, res: Response) => {
    try {        
        const newuser = await userM.create(req.body);
        res.json({
            status: "success",
            data: { ...newuser },
            message: "User created successfully"
        });
        // res.send('this is the user create route');
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    console.log("Test show all users handler");
    const users = await userM.index();
    console.log("Test show all users handler after calling index method");
    console.log("Test show all users handler result" + users);
    // res.send('this is the user index route');
    res.json(users);
}

const show = async (req: Request, res: Response) => {
    console.log("Test show by id handler");
    const oneUser = await userM.showById(req.params.id as unknown as string);
    console.log("Test show by id after calling model method");
    console.log("Test show by id user: " + oneUser);
    res.json(oneUser);
}

const edit = async (req: Request, res: Response) => {
    try {
        console.log("Test Update by id handler");       
        const updateduser = await userM.updateById(req.body);
        console.log("Test update H by id after calling model method");
        console.log("Test update H by id user: " + updateduser);
        res.json(updateduser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const user = await userM.deleteById(req.body.id);
        res.json(user);
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const login = async (req: Request, res: Response) => {
    try {
        console.log("Test login handler"); 
        const user = await userM.login_authenticate(req.body.email, req.body.u_password);
        console.log("Test login handler get user" + user); 
        if(user){
            const token = Jwt.sign({user}, config.token as unknown as string);
        console.log("Test login handler make token: " + token); 
         return res.json({
            status:'Success',
            data: { ...user, token },
            message: 'You signed in successfully.'
        })
        }        
        if(!user){
            return res.status(401).json({
                status:'Error',
                message: 'User name or password not correct, please try again!'
            })
        }
       
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

// routes.route('/').post(create);
// routes.route('/users').get(index);

const usersRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', authentication, index);
    app.get('/users/:id', authentication, show);
    app.put('/users/:id', authentication, edit);
    app.delete('/users/:id', authentication, remove);
    app.post('/users/login', login);
}

export default usersRoutes; //routes;