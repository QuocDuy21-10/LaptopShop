import e from "express";
import { prisma } from "./client"

const initData = async () => {
    const userCount = await prisma.user.count();
    const roleCount = await prisma.role.count();
    if (userCount === 0) {
        await prisma.user.createMany({
        data: [
            {
                fullName: 'Quoc Duy',
                username: 'QuocDuy',
                address: 'Ha Noi',
                password: '',
                accountType: 'SYS_ADMIN'
            },
            {
                fullName: 'Quoc Duy',
                username: 'QuocDuy',
                address: 'Ha Noi',
                password: '',
                accountType: 'SYS_ADMIN'
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