import { Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

export const allProducts = (req: Request, res: Response) => {
    let total: number = 0;
    market.forEach(m => {
        total = total + m.price
    })
    return res.status(200).json({total: total, products: market})
}


export const singleProduct = (req: Request, res: Response) => {
    const product = market.find(m => {
        return m.id == Number(req.params.id);
    })
    return res.status(200).json(product)
}


export const create = (req: Request, res: Response) => {
let id = market.length + 1;
const expireDate = 365 * 24 * 60 * 60 * 1000;
const product = {id: id, name: req.body.name, price: req.body.price, weight: req.body.weight, calories: req.body.calories, section: req.body.section, expirationDate: new Date(Date.now() + expireDate)}

market.push(product)

return res.status(201).json(product)
}

export const updateProduct = (req: Request, res: Response) => {
    const product = market.find(m => m.id === Number(req.params.id))

    let productBody: Record<string, number> = {};

    Object.entries(req.body).forEach(entries => {
        const [key, value] = entries;
        productBody[key] = value as number;
        if(key === "name" || key === "price" || key === "weight" || key === "calories"  || key === "section") {
        }
    })

    let newProduct = {...product, ...productBody};

    const index = market.findIndex(m => m.id === Number(req.params.id));

    market.splice(index, 1, newProduct as IProduct);

    return res.status(200).json(newProduct);
}

export const deleteProduct = (req: Request, res: Response) => {
    const index = market.findIndex(m => m.id === Number(req.params.id));

    market.splice(index, 1);

    return res.status(204).json({});
}