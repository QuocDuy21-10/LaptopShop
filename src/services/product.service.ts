import { prisma } from 'config/client';
import exp from 'constants';
const getAllProducts = async()=> {
    return await prisma.product.findMany();
}
const handleCreateProduct = async(name: string, price: string, detailDesc: string, shortDesc: string, quantity: string, factory: string, target: string, image: string) => {
    await prisma.product.create({
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            factory: factory,
            sold: 0,
            target: target,
            image: image
        }
    })
}

export {getAllProducts, handleCreateProduct }