import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById, handleUpdateUser ,getAllRoles} from 'services/user.service';
const getHomePage = async (req : Request, res : Response)=> {
    const users = await getAllUsers();
   return res.render('home', {
       users: users
   });
}

const getCreateUserPage = async(req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render('admin/user/create', {
        roles
    });
}
const postCreateUser = async(req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename;
    await handleCreateUser( fullName, username, address, phone, avatar, role);
    return res.redirect('/admin/user');
}
const postDeleteUser = async (req:Request, res:Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect('/admin/user');
}
const getViewUser = async (req:Request, res:Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    const roles = await getAllRoles();
    return res.render('admin/user/detail', {
        id,
        user,
        roles
    })
}
const postUpdateUser = async (req: Request, res: Response) => {
    const {id,fullName, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename;
    await handleUpdateUser(id, fullName, phone,role, address, avatar);
    return res.redirect('/admin/user');
}
export { getHomePage , getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser};