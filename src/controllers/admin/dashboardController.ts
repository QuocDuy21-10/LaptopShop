import { Request, Response } from 'express';
import { getAllUsers } from 'services/user.service';
import { getAllProducts } from 'services/admin/product.service';
import { getOrderAdmin } from 'services/admin/order.service';
import { getDashboardInfo } from 'services/admin/dashboard.service';

const getDashboardPage = async (req:Request, res:Response) => {
    const info = await getDashboardInfo();
    return res.render('admin/dashboard/show.ejs', {
        info
    });
}

const getAdminUserPage = async (req:Request, res:Response) => {
    const users = await getAllUsers();
    return res.render('admin/user/show.ejs', {
        users
    });
}

const getAdminProductPage = async (req:Request, res:Response) => {
    const products = await getAllProducts();
    return res.render('admin/product/show.ejs', {
        products
    });
}

const getAdminOrderPage = async (req:Request, res:Response) => {
    const orders = await getOrderAdmin();
    return res.render('admin/order/show.ejs', {
        orders
    });
}

export { getDashboardPage, getAdminUserPage,getAdminProductPage,getAdminOrderPage }