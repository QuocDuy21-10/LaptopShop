import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { Request, Response, NextFunction } from "express";
import { any } from 'zod';
const checkValidJWT = (req: Request, res: Response, next: NextFunction)=> {
    const path = req.path;
    const whiteList = ['/login', '/register', '/add-product-to-cart'];
    if (whiteList.includes(path)) {
        return next();
    }
    const token = req.headers['authorization']?.split(' ')[1]; // format: Bearer <token>
    try {
        const dataDecoded : any = jwt.verify(token, process.env.JWT_SECRET);
        req.user = dataDecoded;
        next();
    } catch (error) {
        res.status(401).json({
            data: null,
            message: "Token không hợp lệ (không truyền lên hoặc hết hạn)"
        });
    }
}

export {checkValidJWT}