import express, { Express } from 'express';
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/userController';
import { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage } from 'controllers/admin/dashboardController';
const router = express.Router();

const webRoutes = (app: Express) =>{
    router.get('/', getHomePage);
    router.post('/handle-create-user',postCreateUser);
    router.post('/handle-delete-user/:id',postDeleteUser);
    router.get('/handle-view-user/:id',getViewUser);
    router.post('/handle-update-user',postUpdateUser);
    // admin route
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user',getCreateUserPage);
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/product', getAdminProductPage);

    app.use('/', router);
}

export default webRoutes;



