import { NextFunction, Response } from "express"

import { CreatePost, DeletePost, GetAllPost, GetPost } from "./post.service"
import { DataResponse } from "../../common/helpers/data-response"
import createResponse from "../../common/helpers/create-response"
import RESPONSE from "../../common/helpers/response-message"
import createError from "../../common/helpers/create-error"
import { ExtendedRequest } from "../../common/interfaces"
import { CreatePostDto, GetPostDto } from "./post.dto"
import HTTP from "../../common/constants/http"

const createPostController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:CreatePostDto = {
            authorId: req.body.authorId,
            content: req.body.content,
            title: req.body.title,
            image: req.file
        }
        const {error, message, data}:DataResponse = await CreatePost(payload)
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

const getAllPostsController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const {error, message, data}:DataResponse = await GetAllPost()
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

const getPostController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:GetPostDto = {
            id: req.params.id
        }
        const {error, message, data}:DataResponse = await GetPost(payload)
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

const deletePostController = async(req:ExtendedRequest, res:Response, next:NextFunction) => {
    try {
        const payload:GetPostDto = {
            id: req.params.id
        }
        const {error, message, data}:DataResponse = await DeletePost(payload)
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
    createPostController,
    deletePostController,
    getAllPostsController,
    getPostController,
}