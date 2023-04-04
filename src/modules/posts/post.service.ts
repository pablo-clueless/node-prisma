import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

import { getPaginateRecords } from "../../common/helpers/pagination"
import { DataResponse } from "../../common/helpers/data-response"
import { CreatePostDto, GetPostDto } from "./post.dto"
import uploader from "../../common/helpers/cloudinary"
import { Paginate } from "../../common/interfaces"

dotenv.config()
const prisma = new PrismaClient()

const CreatePost = async(data:CreatePostDto) => {
    try {
        const {authorId, content, image, title} = data
        let response:DataResponse
        await prisma.$connect()
        const user = await prisma.user.findUnique({
            where:{ id: authorId }
        })
        if(!user) {
            response = {
                error: true,
                message: 'User not found!'
            }
            return response
        }
        let imageurl:string = ""
        if(image) {
            imageurl = await uploader(image.path)
        }
        const post = await prisma.post.create({
            data: {
                content,
                title,
                authorId: user.id,
                image: imageurl
            }
        })
        if(!post) {
            response = {
                error: true,
                message: "Unable to add post. Please try again."
            }
            return response
        }
        response = {
            error: false,
            message: "Post created",
            data: post
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

const GetAllPost = async(data:Paginate) => {
    try {
        await prisma.$connect()
        const paginated = await getPaginateRecords(data)
        let response:DataResponse = {
            error: false,
            message: "All posts retreieved!",
            data: paginated
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

const GetPost = async(data:GetPostDto) => {
    try {
        const { id } = data
        let response:DataResponse
        await prisma.$connect()
        const post = await prisma.post.findUnique({
            where: { id }
        })
        if(!post) {
            response = {
                error: true,
                message: "Post not found!"
            }
            return response
        }
        response = {
            error: false,
            message: "Post retrieved!",
            data: post
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

const DeletePost = async(data:GetPostDto) => {
    try {
        const { id } = data
        let response:DataResponse
        await prisma.$connect()
        const post = await prisma.post.delete({
            where: { id }
        })
        response = {
            error: false,
            message: "Post deleted successfully!",
            data: post
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

export { CreatePost, DeletePost, GetAllPost, GetPost }