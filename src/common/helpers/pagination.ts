import { PrismaClient } from "@prisma/client"

import { Paginate } from "../interfaces"

const prisma = new PrismaClient()

const getPaginateRecords = async(paginate: Paginate) => {
    try {
        const {limit, page = 1} = paginate
        const offset = (page - 1) * limit

        await prisma.$connect()
        const count = await prisma.post.count()
        const posts = await prisma.post.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                createdAt: 'desc'
            }
        })
        const totalPages = Math.ceil(count / limit)
        const paginated = {posts, page, limit, total: count, totalPages }

        return paginated
    } catch (error) {
        console.log(error)
    }
}

export { getPaginateRecords }