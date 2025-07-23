import { prisma } from 'config/client';
import { ACCOUNT_TYPE, TOTAL_ITEMS_PER_PAGE } from 'config/constant';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}
// get all users
const getAllUsers = async(page: number)=> {
    const pageSize = TOTAL_ITEMS_PER_PAGE; // limit
    const skip = (page - 1) * pageSize; // offset
    const users = await prisma.user.findMany({
        skip: skip,
        take: pageSize
    });
    return users
}

const countTotalUsers = async()=> {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.user.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages
}

// get all roles
const getAllRoles = async()=> {
    return await prisma.role.findMany();
}
// create a new user
const handleCreateUser = async(fullName: string, email: string, address: string, phone: string, avatar: string, role: string) => {
    const defaultPassword = await hashPassword("123456");
     await prisma.user.create({
        data:
            {
                fullName: fullName,
                username: email,
                address: address,
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                avatar: avatar,
                phone: phone,
                roleId: +role,
            }
    })
}

// delete a user
 const handleDeleteUser = async(id: string) => {
     await prisma.user.delete({
        where: {
            id: +id
        }
    })
 }
 // get user by id
 const getUserById = async (id:string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id
        }
    })
    return user
 }
 // update a user
 const handleUpdateUser = async(id: string, fullName: string, phone: string, role: string, address: string, avatar: string )=> {
    await prisma.user.update({
        where: {
            id: +id,
        },
        data: {
            fullName: fullName,
            phone: phone,
            roleId: +role,
            address: address,
            ...(avatar ? { avatar } : {})
        }
    })
 }
 const handleUpdateProfile = async(id: string, fullName: string, phone: string, address: string, avatar: string )=> {
     return prisma.user.update({
         where: {
             id: +id,
         },
         data: {
             fullName: fullName,
             phone: phone,
             address: address,
             ...(avatar ? { avatar } : {})
         }
     })
 }

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, handleUpdateUser, getAllRoles, hashPassword , countTotalUsers, handleUpdateProfile};