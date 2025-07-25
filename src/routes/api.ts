import { createUsersAPI, deleteUserByIdAPI, getAllUsersAPI, getUserByIdAPI, postAddProductToCartAPI, updataUserByIdAPI } from 'controllers/client/apiController';
import express, { Express } from 'express';


const router = express.Router();

const apiRoutes = (app: Express) => {

    router.post("/add-product-to-cart", postAddProductToCartAPI);
    
    // RESTful API
    // user
    router.get('/users', getAllUsersAPI);
    router.get('/users/:id', getUserByIdAPI);
    router.post('/users', createUsersAPI);
    router.put('/users/:id', updataUserByIdAPI);
    router.delete('/users/:id', deleteUserByIdAPI);

    app.use("/api", router);
}

export default apiRoutes;