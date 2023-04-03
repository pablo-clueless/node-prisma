import { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

import RESPONSE from "../helpers/response-message"
import createError from "../helpers/create-error"
import { ExtendedRequest } from "../interfaces"
import { verify } from "../helpers/token"
import HTTP from "../constants/http"

const prisma = new PrismaClient()

const authorize = async(req: ExtendedRequest, _: any, next: NextFunction) => {
    const token:any = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if(!token) {
        next(createError(HTTP.BAD_REQUEST,[{
            status: RESPONSE.ERROR,
            message: "Authorization token is missing!",
            statusCode: HTTP.UNAUTHORIZED,
        }]))
    }
    try {
        const id:string = await verify(token)
        await prisma.$connect()
        const user = await prisma.user.findUnique({
            where: { id }
        })
        if(!user) {
            return next(createError(HTTP.UNAUTHORIZED, [{
                status: RESPONSE.ERROR,
                message: "Unauthorized to perform this action!",
                statusCode: HTTP.UNAUTHORIZED,
            }]))
        }
        if(user) {
            req.user = user
            req.token = token
            next()
        } else {
            next(createError(HTTP.BAD_REQUEST, [{
                status: RESPONSE.ERROR,
                message: "Invalid authorization token!",
                statusCode: HTTP.UNAUTHORIZED,
            }]))
        }
    } catch (error: any) {
        next(createError(HTTP.BAD_REQUEST, [{
            status: RESPONSE.ERROR,
            message: error.message,
            statusCode: HTTP.UNAUTHORIZED,
        }]))
    }
}

const authorizeLogin = async(req: ExtendedRequest, res: Response, next: NextFunction) => {
    let email = String(req.body?.email).toLowerCase()
    try {
        await prisma.$connect()
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if(!user) {
            return next(createError(HTTP.NOT_FOUND, [{
                status: RESPONSE.ERROR,
                message: "user does not exist!",
                statusCode: HTTP.BAD_REQUEST,
            }]))
        }
        req.user = user
        return next()
    } catch (error) {
        console.error(error)
        return next(createError.InternalServerError(error))
    }
}

export { authorize, authorizeLogin }