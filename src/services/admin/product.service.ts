import { prisma } from 'config/client';
import { TOTAL_ITEMS_PER_PAGE } from 'config/constant';
const getAllProducts = async(page : number)=> {
    const pageSize = TOTAL_ITEMS_PER_PAGE; // limit
     const skip = (page - 1) * pageSize; // offset
    const products = await prisma.product.findMany({
        skip: skip,
        take: pageSize
    });
    return products
}

const countTotalProducts = async() => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.product.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages
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




export {getAllProducts, handleCreateProduct,handleDeleteProduct , getProductById, handleUpdateProduct, countTotalProducts}