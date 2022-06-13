import express, { Request, Response } from "express";
import { order, orderModel } from "../models/order";

const orderM = new orderModel();

const create = async (req: Request, res: Response) => {
    try {
        const orderT: order = {
            o_date: req.body.date, 
            o_total: req.body.total, 
            user_id: req.body.user
        }
        const neworder = await orderM.create(orderT);
        res.json(neworder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const orders = await orderM.index();
    res.json(orders);
}

const show = async (req: Request, res: Response) => {
    const order = await orderM.showById(req.body.id);
    res.json(order);
}

const edit = async (req: Request, res: Response) => {
    try {
        const orderT: order = {
            id: req.body.id,
            o_date: req.body.date, 
            o_total: req.body.total, 
            user_id: req.body.user
        }
        const updatedorder = await orderM.updateById(orderT);
        res.json(updatedorder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const order = await orderM.deleteById(req.body.id);
        res.json(order);
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const ordersRoutes = (app: express.Application) => {
    app.post('/orders', create);
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.put('/orders/:id', edit);
    app.delete('/orders/:id', remove);
}

export default ordersRoutes;