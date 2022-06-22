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
    
    const users = await userM.index();
    res.json({data:users});
}

const show = async (req: Request, res: Response) => {
    
    const oneUser = await userM.showById(req.params.id as unknown as string);
    res.json({data:oneUser});
}

const edit = async (req: Request, res: Response) => {
    try {
              
        const updateduser = await userM.updateById(req.body);
        
        res.json({data:updateduser});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const user = await userM.deleteById(req.body.id);
        res.json({data:user});
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const login = async (req: Request, res: Response) => {
    try {
        const user = await userM.login_authenticate(req.body.email, req.body.u_password);
        if(user){
            const token = Jwt.sign({user}, config.token as unknown as string);
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