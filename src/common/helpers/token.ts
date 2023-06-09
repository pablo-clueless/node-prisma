import jwt, { JwtPayload } from "jsonwebtoken"

import KEYS from "../config/keys"

const sign = (id: string) => {
    return jwt.sign(id, KEYS.JWT_SECRET)
}

const verify = (token: string) => {
    try {
        const id:(string | JwtPayload | any) = jwt.verify(token, KEYS.JWT_SECRET)
        return id
    } catch (error) {
        console.log(error)
        return {}
    }
}

const decode = (token: string) => {
    try {
        return jwt.decode(token)
    } catch (error) {
        console.log(error)
        return {}
    }
}

export { decode, sign, verify }