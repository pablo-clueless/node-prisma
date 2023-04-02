import { NextFunction, Response } from "express"

import { EmailSignin, EmailSignup, GithubSignin, GoogleSignin } from "./auth.service"
import { Auth0SigninDto, EmailSigninDto, EmailSignupDto } from "./auth.dto"
import { DataResponse } from "../../common/helpers/data-response"
import createResponse from "../../common/helpers/create-response"
import RESPONSE from "../../common/helpers/response-message"
import createError from "../../common/helpers/create-error"
import { ExtendedRequest } from "../../common/interfaces"
import HTTP from "../../common/constants/http"

const emailSigninController = async(req:ExtendedRequest, res:Response, next: NextFunction) => {
    try {
        const payload:EmailSigninDto = {
            email: req.body.email,
            password: req.body.password
        }
        const {error, message, data}:DataResponse = await EmailSignin(payload)
        if(error) {
            return next(createError(HTTP.BAD_REQUEST,[{
                status: RESPONSE.ERROR,
                message,
                statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            }]))
        }
        return createResponse(message, data)(res, HTTP.OK)
    } catch (error:any) {
        console.log(error)
        return next(createError.InternalServerError(error))
    }
}

const emailSignupController = async(req:ExtendedRequest, res:Response, next: NextFunction) => {
    try {
        const payload:EmailSignupDto = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
            username: req.body.username,
            avatar: req.file,
        }
        const {error, message, data}:DataResponse = await EmailSignup(payload)
        if(error) {
            return next(createError(HTTP.BAD_REQUEST, [{
                status: RESPONSE.ERROR,
                message,
                statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            }]))
        }
        return createResponse(message, data)(res, HTTP.CREATED)
    } catch (error:any) {
        console.log(error)
        return next(createError.InternalServerError(error))
    }
}

const githubSigninController = async(req:ExtendedRequest, res:Response, next: NextFunction) => {
    try {
        const payload:Auth0SigninDto = {
            token: req.body.token
        }
        const {error, message, data}:DataResponse = await GithubSignin(payload)
        if(error) {
            return next(createError(HTTP.BAD_REQUEST, [{
                status: RESPONSE.ERROR,
                message,
                statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            }]))
        }
        return createResponse(message, data)(res, HTTP.OK)
    } catch (error:any) {
        console.log(error)
        return next(createError.InternalServerError(error))
    }
}

const googleSigninController = async(req:ExtendedRequest, res:Response, next: NextFunction) => {
    try {
        const payload:Auth0SigninDto = {
            token: req.body.token
        }
        const {error, message, data}:DataResponse = await GoogleSignin(payload)
        if(error) {
            return next(createError(HTTP.BAD_REQUEST, [{
                status: RESPONSE.ERROR,
                message,
                statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            }]))
        }
        return createResponse(message, data)(res, HTTP.OK)
    } catch (error:any) {
        console.log(error)
        return next(createError.InternalServerError(error))
    }
}

export {
    emailSigninController,
    emailSignupController,
    githubSigninController,
    googleSigninController
}