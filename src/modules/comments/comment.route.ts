import { Router } from "express"

import { authorize } from "../../common/middlewares/auth"
import {
    createCommentController,
    deleteCommentController,
    getCommentsByPostController
} from "./comment.controller"

const router = Router()

router.post(
    "/create/:id",
    authorize,
    createCommentController
)

router.delete(
    "/delete/:id",
    authorize,
    deleteCommentController
)

router.get(
    "/get/:id",
    getCommentsByPostController
)

export = router