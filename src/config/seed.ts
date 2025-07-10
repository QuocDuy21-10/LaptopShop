import { prisma } from "./client"
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initData = async () => {
    const userCount = await prisma.user.count();
    const roleCount = await prisma.role.count();
    const defaultPassword = await hashPassword("123456");
    if (userCount === 0) {
        await prisma.user.createMany({
        data: [
            {
                fullName: 'Quoc Duy',
                username: 'quocduy@gmail.com',
                address: 'Ha Noi',
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM
            },
            {
                fullName: 'Admin Duy',
                username: 'admin@gmail.com',
                address: 'Ha Noi',
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM
            },
        ]
    })
    } else if ( roleCount === 0) {
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
    else {
        console.log('Data already exists');
    }

}
export default initData