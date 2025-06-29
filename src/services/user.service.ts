import { prisma } from 'config/client';
import  getConnection  from 'config/db';

// get all users
const getAllUsers = async()=> {
    const connection = await getConnection();
    try {
        const [results] = await connection.query(
        'SELECT * FROM `user`'
        );
    return results
    } catch (err) {
    return [];
    }
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
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `user` WHERE `id` = ?';
        const values = [id];
        const [ results ] = await connection.execute(sql, values);
    } catch (err) {
        console.log(err);
    }
 }
 // get user by id
 const getUserById = async (id:string) => {
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `user` WHERE `id` = ?';
        const values = [id];
        const  [results] = await connection.execute(sql, values);
        return results[0]
    }
    catch (err) {
        console.log(err);
    }
 }
 
 // update a user
 const handleUpdateUser = async(id: string, fullName: string, email: string, address: string)=> {
    const connection = await getConnection();
    try {
        const sql = 'UPDATE `user` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?';
        const values = [fullName, email, address, id];
        const [results] = await connection.execute(sql, values);
    } catch (err) {
        console.log(err);   
    }
 }
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, handleUpdateUser };