import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

import { CreateCommentDto, DeleteCommentDto, GetCommentByPostDto } from "./comment.dto"
import { DataResponse } from "../../common/helpers/data-response"

dotenv.config()
const prisma = new PrismaClient()

const CreateComment = async(data:CreateCommentDto) => {
    try {
        const {content, postId, userId} = data
        let response:DataResponse
        await prisma.$connect()
        const post = await prisma.post.findUnique({
            where: { id: postId}
        })
        if(!post) {
            response = {
                error: true,
                message: "Post not found!"
            }
            return response
        }
        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId
            }
        })
        if(!comment) {
            response = {
                error: true,
                message: "Unable to add comment. Please try again."
            }
            return response
        }
        response = {
            error: false,
            message: "Comment added successfully!",
            data: comment
        }
        return response
    } catch (error:any) {
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

const DeleteComment = async(data:DeleteCommentDto) => {
    try {
        const { id } = data
        let response:DataResponse
        await prisma.$connect()
        const comment = await prisma.comment.findUnique({
            where: { id }
        })
        if(!comment) {
            response = {
                error: true,
                message: "Comment not found!"
            }
            return response
        }
        const deletedComent = await prisma.comment.delete({
            where: { id }
        })
        response = {
            error: false,
            message: "Comment deleted successfully!",
            data: deletedComent
        }
        return response
    } catch (error:any) {
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

const GetCommentsByPost = async(data:GetCommentByPostDto) => {
    try {
        const { postId } = data
        let response:DataResponse
        await prisma.$connect()
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: {
                createdAt: 'desc'
            }
        })
        response = {
            error: false,
            message: "Comments retrieved successfully!",
            data: comments
        }
        return response
    } catch (error:any) {
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

export { CreateComment, DeleteComment, GetCommentsByPost }