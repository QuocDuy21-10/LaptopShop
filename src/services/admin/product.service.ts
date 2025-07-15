import { prisma } from 'config/client';
import exp from 'constants';
const getAllProducts = async()=> {
    return await prisma.product.findMany();
}
const handleCreateProduct = async(name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {
    await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
             ...(image ? { image } : {})
        }
    })
}

const handleDeleteProduct = async(id: string) => {
    await prisma.product.delete({
        where: {
            id: +id
        }
    })
}

const getProductById = async(id: number) => {
    const product = await prisma.product.findUnique({
        where: { id }
    })
    return product
}

const handleUpdateProduct = async(id: number, name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {
    await prisma.product.update({
        where: {
            id
        },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
             ...(image ? { image } : {})
        }
    })
}




export {getAllProducts, handleCreateProduct,handleDeleteProduct , getProductById, handleUpdateProduct}