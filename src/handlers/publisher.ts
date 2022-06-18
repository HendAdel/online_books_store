import express, { Request, Response } from "express";
import { publisher, publisherModel } from "../models/publisher";

const publisherM = new publisherModel();

const create = async (req: Request, res: Response) => {
    try {
        
        const newpublisher = await publisherM.create(req.body);
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
    if (req.params.id) {
    const publisher = await publisherM.showById(req.params.id);
    res.json(publisher);
}
}

const edit = async (req: Request, res: Response) => {
    try {
        console.log("update handler" + req.body.p_name + " " + req.body.p_address + " " + req.body.phone + " " + req.body.id);
        const updatedpublisher = await publisherM.updateById(req.body);
        console.log("update handler req body: " + updatedpublisher);
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