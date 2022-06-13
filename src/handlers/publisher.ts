import express, { Request, Response } from "express";
import { publisher, publisherModel } from "../models/publisher";

const publisherM = new publisherModel();

const create = async (req: Request, res: Response) => {
    try {
        const publisherT: publisher = {
            p_name: req.body.p_name,
            p_address: req.body.p_address,
            phone: req.body.phone
        }
        const newpublisher = await publisherM.create(publisherT);
        res.json(newpublisher);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const publishers = await publisherM.index();
    res.json(publishers);
}

const show = async (req: Request, res: Response) => {
    const publisher = await publisherM.showById(req.body.id);
    res.json(publisher);
}

const edit = async (req: Request, res: Response) => {
    try {
        const publisherT: publisher = {
            id: req.body.id,
            p_name: req.body.p_name,
            p_address: req.body.p_address,
            phone: req.body.phone
        }
        const updatedpublisher = await publisherM.updateById(publisherT);
        res.json(updatedpublisher);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const publisher = await publisherM.deleteById(req.body.id);
        res.json(publisher);
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const publishersRoutes = (app: express.Application) => {
    app.post('/publishers', create);
    app.get('/publishers', index);
    app.get('/publishers/:id', show);
    app.put('/publishers/:id', edit);
    app.delete('/publishers/:id', remove);
}

export default publishersRoutes;