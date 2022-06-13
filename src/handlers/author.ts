import express, { Request, Response } from "express";
import { author, authorModel } from "../models/author";

const authorM = new authorModel();

const create = async (req: Request, res: Response) => {
    try {
        const authorT: author = {
            name: req.body.name
        }
        const newAuthor = await authorM.create(authorT);
        res.json(newAuthor);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const authors = await authorM.index();
    res.json(authors);
}

const show = async (req: Request, res: Response) => {
    const author = await authorM.showById(req.body.id);
    res.json(author);
}

const edit = async (req: Request, res: Response) => {
    try {
        const authorT: author = {
            id: req.body.id,
            name: req.body.name
        }
        const updatedAuthor = await authorM.updateById(authorT);
        res.json(updatedAuthor);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const author = await authorM.deleteById(req.body.id);
        res.json(author);
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