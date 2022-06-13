import express, { Request, Response } from "express";
import { user, userModel } from "../models/user";

const userM = new userModel();

const create = async (req: Request, res: Response) => {
    try {
        const userT: user = {
            u_name: req.body.name,
            email: req.body.email,
            u_password: req.body.password
        }
        const newuser = await userM.create(userT);
        res.json(newuser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const users = await userM.index();
    res.json(users);
}

const show = async (req: Request, res: Response) => {
    const user = await userM.showById(req.body.id);
    res.json(user);
}

const edit = async (req: Request, res: Response) => {
    try {
        const userT: user = {
            id: req.body.id,
            u_name: req.body.name,
            email: req.body.email,
            u_password: req.body.password
        }
        const updateduser = await userM.updateById(userT);
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

const usersRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', index);
    app.get('/users/:id', show);
    app.put('/users/:id', edit);
    app.delete('/users/:id', remove);
}

export default usersRoutes;