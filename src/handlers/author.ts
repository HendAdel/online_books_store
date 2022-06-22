import express, { Request, Response } from "express";
import { author, authorModel } from "../models/author";

const authorM = new authorModel();

const create = async (req: Request, res: Response) => {
    try {       
        const newAuthor = await authorM.create(req.body);;
        res.json({data: newAuthor});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const authors = await authorM.index();
        res.json({data: authors});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }   
}

const show = async (req: Request, res: Response) => {
    if (req.params.id) {
        const author = await authorM.showById(req.params.id);
        res.json({data: author});
    }

}

const edit = async (req: Request, res: Response) => {
    try {
        
        const updatedAuthor = await authorM.updateById(req.body);
        res.json({data: updatedAuthor});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const author = await authorM.deleteById(req.body.id);
        res.json({data: author});
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const authorsRoutes = (app: express.Application) => {
    app.post('/authors', create);
    app.get('/authors', index);
    app.get('/authors/:id', show);
    app.put('/authors/:id', edit);
    app.delete('/authors/:id', remove);
}

export default authorsRoutes;