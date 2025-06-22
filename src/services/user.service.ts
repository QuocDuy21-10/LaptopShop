import  getConnection  from 'config/db';

// get all users
const getAllUsers = async()=> {
    const connection = await getConnection();
    try {
        const [results] = await connection.query(
        'SELECT * FROM `users`'
        );
    return results
    } catch (err) {
    return [];
    }
}

// create a new user
const handleCreateUser = async(fullName: string, email: string, address: string) => {
    const connection = await getConnection();
    try{
        const sql = 'INSERT INTO `users` (`name`, `email`, `address`) VALUES (?,?,?)';
        const values = [fullName, email, address];
        const [result] = await connection.execute(sql, values);
    } catch (err) {
        console.log(err);
    }
}

// delete a user
 const handleDeleteUser = async(id) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const values = [id];
        const [ results ] = await connection.execute(sql, values);
    } catch (err) {
        console.log(err);
    }
 }
export { handleCreateUser, getAllUsers, handleDeleteUser };