import { JwtPayload } from "jsonwebtoken"
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

export interface IComment{
    id: string
}

export interface ExtendedRequest extends Request {
    user?: IUser
    token?: string
}

export interface Paginate {
    limit: number | 10
    page: number
}

export interface SocketData {}