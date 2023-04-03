import { Router } from "express"

import { authorize } from "../../common/middlewares/auth"
import upload from "../../common/utils/upload"
import {
    deleteUserController,
    getAllUsersController,
    getUserController,
    updateUserController
} from "./user.controller"

const router = Router()

router.get(
    "/get/all",
    getAllUsersController
)

router.get(
    "/get/:id",
    getUserController
)

router.put(
    "/update/:id",
    upload.single("image"),
    authorize,
    updateUserController
)

router.delete(
    "/delete/:id",
    authorize,
    deleteUserController
)

export = router