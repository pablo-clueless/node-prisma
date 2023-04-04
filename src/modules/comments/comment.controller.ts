import { NextFunction, Response } from "express"

import { CreateCommentDto, DeleteCommentDto, GetCommentByPostDto } from "./comment.dto"
import { CreateComment, DeleteComment, GetCommentsByPost } from "./comment.service"
import { ExtendedRequest, Paginate } from "../../common/interfaces"
import { DataResponse } from "../../common/helpers/data-response"
import createResponse from "../../common/helpers/create-response"
import RESPONSE from "../../common/helpers/response-message"
import createError from "../../common/helpers/create-error"
import HTTP from "../../common/constants/http"

const createCommentController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:CreateCommentDto = {
            content: req.body.content,
            postId: req.params.id,
            userId: req.body.userId
        }
        const {error, message, data}:DataResponse = await CreateComment(payload)
        if(error) {
            return next(createError(HTTP.BAD_REQUEST,[{
                status: RESPONSE.ERROR,
                message,
                statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            }]))
        }
        return createResponse(message, data)(res, HTTP.CREATED)
    } catch (error:any) {
        const response = {
            error: true,
            message:error.message || "Authentication failed! Please try again.",
            data: error
        }
        return response
    }
}

const deleteCommentController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:DeleteCommentDto = {
            id: req.params.id
        }
        const {error, message, data}:DataResponse = await DeleteComment(payload)
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

const getCommentsByPostController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:GetCommentByPostDto = {
            postId: req.params.id
        }
        const {error, message, data}:DataResponse = await GetCommentsByPost(payload)
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
    createCommentController,
    deleteCommentController,
    getCommentsByPostController
}