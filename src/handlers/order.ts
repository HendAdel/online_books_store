import express, { Request, Response } from "express";
import { order, orderModel } from "../models/order";

const orderM = new orderModel();

const create = async (req: Request, res: Response) => {
    try {
        // const orderT: order = {
        //     o_date: req.body.date, 
        //     o_total: req.body.total, 
        //     user_id: req.body.user
        // }
        const neworder = await orderM.create(req.body);
        res.json({data: neworder});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const orders = await orderM.index();
    res.json({data: orders});
}

const show = async (req: Request, res: Response) => {
    const order = await orderM.showById(req.params.id);
    res.json({data: order});
}

const edit = async (req: Request, res: Response) => {
    try {
        // const orderT: order = {
        //     id: req.body.id,
        //     o_date: req.body.date, 
        //     o_total: req.body.total, 
        //     user_id: req.body.user
        // }
        const updatedorder = await orderM.updateById(req.body);
        res.json({data: updatedorder});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const order = await orderM.deleteById(req.body.id);
        
        res.json({data: order});
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const create_o_d = async (req: Request, res: Response) => {

    const orderId = parseInt(req.body.order_id);
    const count = req.body.b_count;
    const bookId = req.body.book_id;
    try {
        const neworder = await orderM.create_o_d(orderId, count, bookId);
        res.json({data: neworder});
    }
    catch (error) {
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
    app.post('/orders/:id/books', create_o_d);
}

export default ordersRoutes;