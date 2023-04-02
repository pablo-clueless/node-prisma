import { Router } from "express"

import auth from "./auth/auth.route"

const routes = () => {
    const router = Router()

    router.use("/auth", auth)

    return router
}

export = routes