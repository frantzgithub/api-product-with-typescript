import { NextFunction, Request, Response } from "express";
import { market } from "./database";

export const isNameValid = (req: Request, res: Response, next: NextFunction) => {
    if(market.some(m => m.name === req.body.name)) {
        return res.status(409).json({message: "Product already registered"})
    }

    next()
}

export const isIdValid = (req: Request, res: Response, next: NextFunction) => {
    if(!market.some(m => m.id == Number(req.params.id))) {
        return res.status(404).json({message: "Product not found."})
    }

    next()
}