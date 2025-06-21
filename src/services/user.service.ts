import  getConnection  from '../config/db';
const handleCreateUser = (fullName: string, email: string, address: string) => {
    console.log("insert a new user");
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