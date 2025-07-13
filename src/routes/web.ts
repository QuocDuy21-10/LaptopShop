import express, { Express } from 'express';
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/userController';
import { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage } from 'controllers/admin/dashboardController';
import  fileUploadMiddleware  from  'middlewares/multer';
const router = express.Router();

const webRoutes = (app: Express) =>{
    router.get('/', getHomePage);
   
    // admin route
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user',getCreateUserPage);
    router.post('/admin/handle-create-user',fileUploadMiddleware('avatar'),postCreateUser);
    router.post('/admin/delete-user/:id',postDeleteUser);
    router.get('/admin/view-user/:id',getViewUser);
    router.post('/admin/update-user',fileUploadMiddleware('avatar'),postUpdateUser);



    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/product', getAdminProductPage);

    app.use('/', router);
}

export default webRoutes;



