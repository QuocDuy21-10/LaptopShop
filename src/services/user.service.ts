import  getConnection  from '../config/db';
const handleCreateUser = async(fullName: string, email: string, address: string) => {
    const connection = await getConnection();
    // create a new user
    try{
        const sql = 'INSERT INTO `users` (`name`, `email`, `address`) VALUES (?,?,?)';
        const values = [fullName, email, address];
        const [result] = await connection.execute(sql, values);
    } catch (err) {
        console.log(err);
    }
}
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
export { handleCreateUser, getAllUsers };