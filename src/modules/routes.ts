import { Router } from "express"

import user from "./users/user.route"
import auth from "./auth/auth.route"

const routes = () => {
    const router = Router()

    router.use("/auth", auth)
    router.use("/user", user)

    return router
}

export = routes