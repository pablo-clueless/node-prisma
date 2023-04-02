import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import validator from "validator"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import axios from "axios"

import { Auth0SigninDto, EmailSigninDto, EmailSignupDto } from "./auth.dto"
import { DataResponse } from "../../common/helpers/data-response"
import { decode, sign } from "../../common/helpers/token"
import uploader from "../../common/helpers/cloudinary"
import Email from "../../common/helpers/email"
import KEYS from "../../common/config/keys"

dotenv.config()
const prisma = new PrismaClient()

const EmailSignin = async(data: EmailSigninDto) => {
    try {
        const {password, email } = data
        let response:DataResponse
        if(!email || !password) {
            response = {
                error: true,
                message: "Incomplete credentials!",
            }
            return response
        }
        await prisma.$connect()
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if(!user) {
            response = {
                error: true,
                message: "User not found!"
            }
            return response
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            response = {
                error: true,
                message: "Invalid password!"
            }
            return response
        }
        const token = sign(user.id)
        response = {
            error: false,
            message: "Signin successful",
            data: { user, token}
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

const EmailSignup = async(data: EmailSignupDto) => {
    try {
        const {email, fullName, password, username, avatar} = data
        let response:DataResponse
        if(!fullName || !username || !email || !password) {
            response = {
                error: true,
                message: "Incomplete credentials!",
            }
            return response
        }
        const isValidEmail = validator.isEmail(email)
        if(!isValidEmail) {
            response = {
                error: true,
                message: "Invalid email!",
            }
            return response
        }
        await prisma.$connect()
        const isExistingUser = await prisma.user.findUnique({
            where: { email }
        })
        if(isExistingUser) {
            response = {
                error: true,
                message: "This email is registred. Please log in instead!",
            }
            return response
        }
        const isValiPassword = validator.isStrongPassword(password)
        if(!isValiPassword) {
            response = {
                error: true,
                message: "Password not strong enough!",
            }
            return response
        }
        const imageUrl:string = avatar ? await uploader(avatar, "user-avatar") : ""
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = await prisma.user.create({
            data: {
                id: uuidv4(),
                email,
                fullName,
                username,
                avatar: imageUrl,
                password: hashedPassword,
            }
        })
        response = {
            error: false,
            message: "User created succesfully!",
            data: user
        }
        return response
    } catch (error:any) {
        const response = {
            error: true,
            message:error.message || "",
            data: error
        }
        return response
    }
}

const GoogleSignin = async(data: Auth0SigninDto) => {
    try {
        const { token } = data
        let response:DataResponse
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { "Authorization": "bearer " + token}
        })
        if(!data) {
            response = {
                error: true,
                message: "An error occurred!",
                data: null,
            }
            return response
        }
        const payload = res.data
        if(!payload) {
            response = {
                error: true,
                message: "Authentication failed!",
                data: null,
            }
            return response
        }
        await prisma.$connect()
        const user = await prisma.user.findUnique({
            where: { email: payload.email }
        })
        if(user) {
            const token = sign(user.id)
            response = {
                error: false,
                message: "Signin successful",
                data: { user, token}
            }
            return response
        }
        const newUser = await prisma.user.create({
            data: {
                id: uuidv4(),
                email: payload.email,
                fullName: payload.name,
                username: payload.email,
                avatar: payload.picture,
                password: "",
            }
        })
        const jwtToken  = sign(newUser.id)
        response = {
            error: false,
            message: "User created succesfully!",
            data: { newUser, token: jwtToken}
        }
        return response
    } catch (error:any) {
        const response = {
            error: true,
            message:error.message || 'Authentication failed! Please try again.',
            data: error
        }
        return response
    }
}

const GithubSignin = async(data: Auth0SigninDto) => {
    try {
        const { token } = data
        let response:DataResponse
        const res = await axios.post("https://github.com/login/oauth/access_token", {
            code: token,
            client_id: KEYS.GITHUB_ID,
            client_secret: KEYS.GITHUB_SECRET,
        }, { headers: { "Accept": "application/json" }})
        const { access_token } = res.data
        const githubAuth = await axios.get("https://api.github.com/user", {
            headers: { "Authorization": "Bearer " + access_token }
        })
        const { login, email, name } = githubAuth.data
        await prisma.$connect()
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if(user) {
            const token = sign(user.id)
            response = {
                error: false,
                message: "Signin successful",
                data: { user, token}
            }
            return response
        }
        const newUser = await  prisma.user.create({
            data: {
                id: uuidv4(),
                email: email,
                fullName: name,
                username: login,
                avatar: "",
                password: ""
            }
        })
        const jwtToken  = sign(newUser.id)
        response = {
            error: false,
            message: "User created succesfully!",
            data: { newUser, token: jwtToken}
        }
        return response
    } catch (error:any) {
        const response = {
            error: true,
            message:error.message || 'Authentication failed! Please try again.',
            data: error
        }
        return response
    }
}

export { EmailSignin, EmailSignup, GoogleSignin, GithubSignin }