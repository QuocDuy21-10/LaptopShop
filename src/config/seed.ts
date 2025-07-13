import { prisma } from "./client"
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initData = async () => {
    const userCount = await prisma.user.count();
    const roleCount = await prisma.role.count();
    const defaultPassword = await hashPassword("123456");
    // Tạo role đầu tiên
    if ( roleCount === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: 'ADMIN',
                    description: 'Admin thì full quyền'
                },
                {
                    name: 'USER',
                    description: 'User thông thường'
                },
            ]
        })

    }
     if (userCount === 0) {
        // Nếu chưa có user thì đi tìm role
        const adminRole = await prisma.role.findFirst({
            where: {
                name: 'ADMIN'
            }
        })
        if (adminRole) {
            await prisma.user.createMany({
                    data: [
                        {
                            fullName: 'Quoc Duy',
                            username: 'quocduy@gmail.com',
                            address: 'Ha Noi',
                            password: defaultPassword,
                            accountType: ACCOUNT_TYPE.SYSTEM,
                            roleId: adminRole.id
                        },
                        {
                            fullName: 'Admin Duy',
                            username: 'admin@gmail.com',
                            address: 'Ha Noi',
                            password: defaultPassword,
                            accountType: ACCOUNT_TYPE.SYSTEM,
                            roleId: adminRole.id
                        },
                    ]
                })
        }
    }  
    
    if (roleCount > 0 && userCount > 0) {
        console.log('Data already exists');
    }

}
export default initData