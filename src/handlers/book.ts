import express, { Request, Response } from "express";
import { book, bookModel } from "../models/book";
import authentication from "../middleware/authentication.middleware";

const bookM = new bookModel();

const create = async (req: Request, res: Response) => {
    try {
        // const bookT: book = {
        //     title: req.body.title,
        //     author_id: req.body.author,
        //     category_id: req.body.category,
        //     publisher_id: req.body.publisher,
        //     published_year: req.body.published_year,
        //     pages: req.body.pages,
        //     price: req.body.price,
        //     isbn: req.body.isbn,
        //     in_stock: req.body.instock
        // }
        const newbook = await bookM.create(req.body);
        res.json({data: newbook});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const index = async (_req: Request, res: Response) => {
    const books = await bookM.index();
    res.json({data: books});
}

const show = async (req: Request, res: Response) => {
    if (req.params.id) {
    const book = await bookM.showById(req.params.id);
    res.json({data: book});
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        // const bookT: book = {
        //     id: req.body.id,
        //     title: req.body.title,
        //     author_id: req.body.author,
        //     category_id: req.body.category,
        //     publisher_id: req.body.publisher,
        //     published_year: req.body.published_year,
        //     pages: req.body.pages,
        //     price: req.body.price,
        //     isbn: req.body.isbn,
        //     in_stock: req.body.instock
        // }
        const updatedbook = await bookM.updateById(req.body);
        res.json({data: updatedbook});
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const book = await bookM.deleteById(req.body.id);
        res.json({data: book});
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}


const booksRoutes = (app: express.Application) => {
    app.post('/books', create);
    app.get('/books', index);
    app.get('/books/:id', show);
    app.put('/books/:id', edit);
    app.delete('/books/:id', remove);
}

export default booksRoutes;