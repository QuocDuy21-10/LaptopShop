import { Request, Response } from "express";
import { addProductToCart } from "services/client/item.service";
import { handleDeleteUserById, handleGetAllUser, handleGetUserById, handleUpdateUserById } from 'services/client/api.services';
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";
import { registerNewUser } from "services/client/auth.service";

const postAddProductToCartAPI = async (req: Request, res: Response) => {

    const { quantity, productId } = req.body;
    const user = req.user;

    const currentSum = req?.user?.sumCart ?? 0;
    const newSum = currentSum + (+quantity);

    await addProductToCart(+quantity, +productId, user);


    res.status(200).json({
        data: newSum
    })
}

const getAllUsersAPI = async (req: Request, res: Response) => {
    const users = await handleGetAllUser();
    res.status(200).json({
        data: users
    })
}

const getUserByIdAPI = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await handleGetUserById(+id);
    res.status(200).json({
        data: user
    })
}

const createUsersAPI = async (req: Request, res: Response) => {
    const {fullName, email, password} = req.body as TRegisterSchema;
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
            const errorsZod = validate.error.issues;
            const errors = errorsZod.map(item => `${item.path[0]}: ${item.message}`);
            res.status(400).json({
                errors
            })
            return
    }
    // success
    await registerNewUser(fullName, email, password);
    res.status(201).json({
        data: "create user success"
    })
}

const updataUserByIdAPI = async (req: Request, res: Response) => {
    const { fullName, email, password} = req.body;
    await handleUpdateUserById(+req.params.id, fullName, email, password);
    res.status(200).json({
        data: "update user success"
    })
}

const deleteUserByIdAPI = async (req: Request, res: Response) => {
    const {id} = req.params;
    await handleDeleteUserById(+id);
    res.status(200).json({
        data: "delete user success"
    })
}

export {
    postAddProductToCartAPI, getAllUsersAPI, getUserByIdAPI, createUsersAPI, updataUserByIdAPI,
    deleteUserByIdAPI
}