import { Document, Model, ObjectId } from "mongoose"
import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

export interface User {
    id: string
    username: string
    email: string
    fullName: string
    avatar: string
    posts: Post[]
}

export interface Post {
    id: string
    author: User
    authorId: string
    title: string
    content: string
}

export interface ExtendedRequest extends Request {
    user?: Document
    token?: string
}

export interface SocketData {}