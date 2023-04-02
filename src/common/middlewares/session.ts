import MongoStore from "connect-mongo"
import session from "express-session"
import dotenv from "dotenv"

import KEYS from "../config/keys"

dotenv.config()

const store = MongoStore.create({
    mongoUrl: KEYS.DATABASE_URL,
    collectionName: "client-sessions",
    ttl: 1209600,
    autoRemove: "native"
})

const sessionMiddleware = session({
    secret: KEYS.JWT_SECRET,
    store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 864000,
        httpOnly: true,
        secure: false
    }
})

export default sessionMiddleware