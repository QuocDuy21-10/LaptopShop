import { Request, Response } from 'express';
import { addProductToCart, getProductById, getProductInCart,deleteProductInCart } from 'services/client/item.service';
import { number } from 'zod';
const getProductPage = async(req:Request, res:Response) => {
    const {id} = req.params;
    const product = await getProductById(+id);
    return res.render('client/product/detail', {
        product
    });
}

const postAddProductToCart = async(req:Request, res:Response) => {
    const {id} = req.params;
    const user = req.user;
    if(user) {
        await addProductToCart(1, +id, user);
    } else {
        return res.redirect('/login');
    }
    return res.redirect('/');
}

const getCartPage = async(req:Request, res:Response) => {
    const user = req.user;
    if(!user) {
        return res.redirect('/login');
    }
    const cartDetails = await getProductInCart(+user.id);
    
    const totalPrice = cartDetails?.map(item => +item.price * +item.quantity)?.reduce((prev, curr) => prev + curr, 0);
    return res.render('client/product/cart.ejs', {
        cartDetails, totalPrice
    });
}

const postDeleteProductInCart = async(req:Request, res:Response) => {
    const {id} = req.params;
    const user = req.user;
    if(!user) {
        return res.redirect('/login');
    }
    await deleteProductInCart(+id, +user.id, user.sumCart );
    return res.redirect('/cart');
}
export {getProductPage, postAddProductToCart, getCartPage, postDeleteProductInCart}