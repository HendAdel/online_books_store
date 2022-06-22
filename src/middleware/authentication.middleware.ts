import express, { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import config from "../config";

const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get("Authorization");
        

        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const verifyToken = Jwt.verify(token, config.token as unknown as string);
                if (verifyToken) {
                    next();
                }
                else {
                    throw new Error(`User is not authorized`);
                }
            }
            else {
                throw new Error(`User is not authorized`);
            }
        }
        else {
            throw new Error(`User is not authorized`);
        }
    } catch (error) {
        throw new Error(`User is not authorized ${(error as Error).message}`);
    }
}

export default validateTokenMiddleware