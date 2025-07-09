import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';

// get all users
const getAllUsers = async()=> {
    return await prisma.user.findMany();
}

// get all roles
const getAllRoles = async()=> {
    return await prisma.role.findMany();
}
// create a new user
const handleCreateUser = async(fullName: string, email: string, address: string, phone: string, avatar: string) => {
     await prisma.user.create({
        data:
            {
                fullName: fullName,
                username: email,
                address: address,
                password: '123456',
                accountType: ACCOUNT_TYPE.SYSTEM,
                avatar: avatar,
                phone: phone
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
 const handleUpdateUser = async(id: string, fullName: string, email: string, address: string)=> {
    await prisma.user.update({
        where: {
            id: +id,
        },
        data: {
            fullName: fullName,
                username: email,
                address: address,
                password: '',
                accountType: ''
        }
    })
 }
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, handleUpdateUser, getAllRoles };