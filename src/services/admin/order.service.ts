import { prisma } from 'config/client';
import { TOTAL_ITEMS_PER_PAGE } from 'config/constant';

const getOrderAdmin = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE; // limit
    const skip = (page - 1) * pageSize; // offset
    return await prisma.order.findMany({
        skip: skip,
        take: pageSize,
        include: {
            user: true
        }
    })
}

const countTotalOrders = async () => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.order.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages
}

const getOrderDetailAdmin = async (id: number) => {
    return await prisma.orderDetail.findMany({
        where: {
            orderId: id
        },
        include: {
            product: true
        }
    })
}
export {getOrderAdmin, getOrderDetailAdmin, countTotalOrders}