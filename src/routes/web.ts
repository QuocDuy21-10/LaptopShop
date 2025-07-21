import express, { Express } from 'express';
import passport from 'passport';

import  fileUploadMiddleware  from  'middlewares/multer';
import { isAdmin } from 'middlewares/auth';
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/userController';
import { getAdminOrderDetailPage } from 'controllers/admin/orderController';
import { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage } from 'controllers/admin/dashboardController';
import { getAdminCreateProductPage, postAdminCreateProduct, postDeleteProduct, getViewProduct, postUpdateProduct } from 'controllers/admin/productController';
import { getProductPage, postAddProductToCart, getCartPage,postDeleteProductInCart, getCheckOutPage, postHandleCartToCheckOut ,postPlaceOrder, getThanksPage} from 'controllers/client/productController';
import { getLoginPage, getRegisterPage, postRegister, getSuccessRedirectPage, postLogout } from 'controllers/client/authController';
import { getOrderHistoryPage } from 'controllers/client/orderController';
const router = express.Router();

const webRoutes = (app: Express) =>{
    // client route
    router.get('/', getHomePage);
    router.get('/success-redirect', getSuccessRedirectPage);
    router.get('/product/:id', getProductPage);
    router.get('/login', getLoginPage);
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true, // passport sẽ lưu message vào req.session.messages
    }));
    router.get('/register', getRegisterPage);
    router.post('/register', postRegister);
    router.post('/logout', postLogout);

    router.get('/cart', getCartPage);
    router.post('/add-product-to-cart/:id', postAddProductToCart);
    router.post('/delete-product-in-cart/:id', postDeleteProductInCart);
    router.post('/handle-cart-to-checkout', postHandleCartToCheckOut);
    router.get('/checkout', getCheckOutPage);
    router.post('/place-order', postPlaceOrder);
    router.get('/thanks', getThanksPage);
    router.get('/order-history', getOrderHistoryPage);

   
    // admin route
    router.get('/admin', getDashboardPage);
    // user
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user',getCreateUserPage);
    router.post('/admin/handle-create-user',fileUploadMiddleware('avatar'),postCreateUser);
    router.post('/admin/delete-user/:id',postDeleteUser);
    router.get('/admin/view-user/:id',getViewUser);
    router.post('/admin/update-user',fileUploadMiddleware('avatar'),postUpdateUser);

    
    // product
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/create-product', getAdminCreateProductPage);
    router.post('/admin/create-product',fileUploadMiddleware("image", "images/product"), postAdminCreateProduct);
    router.post("/admin/delete-product/:id", postDeleteProduct);
    router.get('/admin/view-product/:id', getViewProduct);
    router.post('/admin/update-product',fileUploadMiddleware("image", "images/product"),postUpdateProduct);
    
    // order
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/order/:id', getAdminOrderDetailPage);
    
    app.use('/',isAdmin, router);
}

export default webRoutes;



