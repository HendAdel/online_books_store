import express, { Request, Response } from "express";
import { category, categoryModel } from "../models/category";

const categoryM = new categoryModel();

const create = async (req: Request, res: Response) => {
    try {
        const categoryT: category = {
            name: req.body.name
        }
        const newcategory = await categoryM.create(categoryT);
        res.json(newcategory);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const categories = await categoryM.index();
    res.json(categories);
}

const show = async (req: Request, res: Response) => {
    const category = await categoryM.showById(req.body.id);
    res.json(category);
}

const edit = async (req: Request, res: Response) => {
    try {
        const categoryT: category = {
            id: req.body.id,
            name: req.body.name
        }
        const updatedcategory = await categoryM.updateById(categoryT);
        res.json(updatedcategory);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const category = await categoryM.deleteById(req.body.id);
        res.json(category);
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const categoriesRoutes = (app: express.Application) => {
    app.post('/categories', create);
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.put('/categories/:id', edit);
    app.delete('/categories/:id', remove);
}

export default categoriesRoutes;