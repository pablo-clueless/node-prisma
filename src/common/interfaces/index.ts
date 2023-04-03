import { JwtPayload } from "jsonwebtoken"
import { User } from "@prisma/client"
import { Request } from "express"
export interface IUser {
    id: string
    username: string
    email: string
    fullName: string
    avatar: string | null
    posts?: IPost[]
}

export interface IPost {
    id: string
    author: IUser
    authorId: string
    title: string
    content: string
}

export interface Comment {}

export interface ExtendedRequest extends Request {
    user?: User
    token?: string
}

export interface SocketData {}