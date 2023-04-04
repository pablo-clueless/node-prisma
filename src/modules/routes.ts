import { Router } from "express"

import comment from "./comments/comment.route"
import user from "./users/user.route"
import post from "./posts/post.route"
import auth from "./auth/auth.route"

const routes = () => {
    const router = Router()

    router.use("/auth", auth)
    router.use("/post", post)
    router.use("/user", user)
    router.use("/comment", comment)

    return router
}

export = routes