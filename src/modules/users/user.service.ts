import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

import { DataResponse } from "../../common/helpers/data-response"
import uploader from "../../common/helpers/cloudinary"
import { UserDto } from "./user.dto"

dotenv.config()
const prisma = new PrismaClient()

const GetAllUsers = async() => {
    try {
        await prisma.$connect()
        const users = await prisma.user.findMany()
        const safeusers = users.map((user: any) => {
            const {password: _, ...safeuser} = user
            return safeuser
        })
        const response:DataResponse = {
            error: false,
            message: "User retrieved successfully!",
            data: safeusers
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

const GetUser = async(data:UserDto) => {
    try {
        const { id } = data
        let response:DataResponse
        await prisma.$connect()
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if(!user) {
            response = {
                error: true,
                message: "User not found!"
            }
            return response
        }
        const {password: _, ...safeuser} = user
        response = {
            error: false,
            message: "User found!",
            data: safeuser
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

const DeleteUser = async(data:UserDto) => {
    try {
        const { id } = data
        let response:DataResponse
        await prisma.$connect()
        const user = await prisma.user.delete({
            where: { id }
        })
        response = {
            error: true,
            message: "User not found!",
            data: user
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

const UpdatetUser = async(data:UserDto) => {
    try {
        const { id, fullName, image} = data
        let response:DataResponse
        await prisma.$connect()
        let imageurl:string = ""
        if(image) {
            imageurl = await uploader(image.path)
        }
        const user = await prisma.user.update({
            where: { id },
            data: {
                fullName,
                avatar: imageurl
            }
        })
        const {password: _, ...safeuser} = user
        response = {
            error: false,
            message: "User updated successfully!",
            data: safeuser
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

export { DeleteUser, GetAllUsers, GetUser, UpdatetUser}