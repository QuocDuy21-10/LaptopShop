import { prisma } from 'config/client';

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    return product
}
const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if (cart) {
        // update
        // cập nhật sum giỏ hàng
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })
        // cập nhật cart detail
        // nếu chưa có thì tạo mới, có rồi thì cập nhật
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                price: product.price,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            }
        })
    } else {
        // create
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                CartDetail: {
                    create: [
                        {
                            quantity: quantity,
                            price: product.price,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    })
    if (cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })
        return currentCartDetail
    }
    return []
}
const deleteProductInCart = async(cartDetailId: number, userId: number, sumCart: number) => {
    const cartDetail = await prisma.cartDetail.delete({
        where: {
            id: cartDetailId
        }
    })
    if (sumCart === 1) {
        // delete cart
        await prisma.cart.delete({
            where: {
                userId
            }
        })
    }
    else {
        await prisma.cart.update({
            where: {
                userId
            },
            data: {
                sum: {
                    decrement: 1
                }
            }
        })
    }
}

const updateCartDetailBeforeCheckout = async(data: {id: string, quantity: string}[]) => {
    for(let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: +data[i].id
            },
            data: {
                quantity: +data[i].quantity
            }
        })
    }
}

const handlePlaceOrder = async(userId: number, receiverName: string, receiverAddress: string, receiverPhone: string, totalPrice: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        },
        include: { 
            CartDetail: true
        }
    })
    if (cart) {
        // create order
        const dataOrderDetail = cart?.CartDetail?.map((item) => ({
                quantity: item.quantity,
                price: item.price,
                productId: item.productId
        })) ?? [];
        await prisma.order.create({
            data: {
                paymentMethod: "COD",
                paymentStatus: "PAYMENT_UNPAID",
                receiverName: receiverName,
                receiverAddress: receiverAddress,
                receiverPhone: receiverPhone,
                status: "PENDING",
                totalPrice: totalPrice,
                userId: userId,
                OrderDetail: {
                    create: dataOrderDetail
                }
            }
        })
        // delete cart detail
        await prisma.cartDetail.deleteMany({
            where: {
                cartId: cart.id
            }
        })
        // delete cart
        await prisma.cart.delete({
            where: {
                id: cart.id
            }
        })
    }
}

export { getProducts, getProductById,addProductToCart, getProductInCart, deleteProductInCart, updateCartDetailBeforeCheckout , handlePlaceOrder}