import jwt, { JwtPayload } from "jsonwebtoken"

import KEYS from "@/common/config/keys"

const sign = (id: string) => {
    return jwt.sign(id, KEYS.JWT_SECRET, {
        expiresIn: KEYS.EXPIRES_IN,
    })
}

const verify = (token: string) => {
    try {
        const id:(string | JwtPayload) = jwt.verify(token, KEYS.JWT_SECRET)
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