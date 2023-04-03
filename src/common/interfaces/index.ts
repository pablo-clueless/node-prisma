import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"
export interface User {
    id: string
    username: string
    email: string
    fullName: string
    avatar: string | null
    posts?: IPost[]
}

export interface IPost {
    id: string
    author: User
    authorId: string
    title: string
    content: string
}

export interface Comment{
    id: string
}

export interface ExtendedRequest extends Request {
    user?: User
    token?: string
}

export interface SocketData {}