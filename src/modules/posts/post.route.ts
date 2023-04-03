import { Router } from "express"

import { authorize } from "../../common/middlewares/auth"
import upload from "../../common/utils/upload"
import {
    createPostController,
    deletePostController,
    getAllPostsController,
    getPostController
} from "./post.controller"

const router = Router()

router.post(
    "/create",
    upload.single("image"),
    authorize,
    createPostController
)

router.get(
    "/get/all",
    getAllPostsController
)

router.get(
    "/get/:id",
    getPostController
)

router.delete(
    "/delete/:id",
    authorize,
    deletePostController
)

export  = router