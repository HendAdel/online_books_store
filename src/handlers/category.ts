import express, { Request, Response } from "express";
import { category, categoryModel } from "../models/category";

const categoryM = new categoryModel();

const create = async (req: Request, res: Response) => {
    try {        
        const newcategory = await categoryM.create(req.body);
        res.json({data: newcategory});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const categories = await categoryM.index();
    res.json({data: categories});
}

const show = async (req: Request, res: Response) => {
    const category = await categoryM.showById(req.params.id);
    res.json({data: category});
}

const edit = async (req: Request, res: Response) => {
    try {        
        const updatedcategory = await categoryM.updateById( req.body);
        res.json({data: updatedcategory});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const category = await categoryM.deleteById(req.body.id);
        res.json({data: category});
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