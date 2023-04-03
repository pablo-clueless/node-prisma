import { NextFunction, Response } from "express"

import { DeleteUser, GetAllUsers, GetUser, UpdatetUser } from "./user.service"
import { DataResponse } from "../../common/helpers/data-response"
import createResponse from "../../common/helpers/create-response"
import RESPONSE from "../../common/helpers/response-message"
import createError from "../../common/helpers/create-error"
import { ExtendedRequest } from "../../common/interfaces"
import HTTP from "../../common/constants/http"
import { UserDto } from "./user.dto"

const getAllUsersController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const {error, message, data}:DataResponse = await GetAllUsers()
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
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

const getUserController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:UserDto = {
            id: req.params.id,
        }
        const {error, message, data}:DataResponse = await GetUser(payload)
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
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

const updateUserController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:UserDto = {
            id: req.params.id,
            fullName: req.body.fullName,
            image: req.file,
        }
        const {error, message, data}:DataResponse = await UpdatetUser(payload)
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
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

const deleteUserController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:UserDto = {
            id: req.params.id
        }
        const {error, message, data}:DataResponse = await DeleteUser(payload)
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
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

export {
    deleteUserController,
    getAllUsersController,
    getUserController,
    updateUserController
}