import { prisma } from 'config/client';
import  getConnection  from 'config/db';

// get all users
const getAllUsers = async()=> {
    return await prisma.user.findMany();
}

// create a new user
const handleCreateUser = async(fullName: string, email: string, address: string) => {
     await prisma.user.create({
        data:
            {
                name: fullName,
                email: email,
                address: address
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
            name: fullName,
            email: email,
            address: address
        }
    })
 }
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, handleUpdateUser };