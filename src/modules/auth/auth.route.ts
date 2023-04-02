import { Router } from "express"

import { authorizeLogin } from "../../common/middlewares/auth"
import upload from "../../common/utils/upload"
import {
    emailSigninController,
    emailSignupController,
    githubSigninController,
    googleSigninController
} from "./auth.controller"

const router = Router()

router.post(
    "/signin",
    authorizeLogin,
    emailSigninController
)

router.post(
    "/signup",
    upload.single("avatar"),
    emailSignupController
)

router.post(
    "/github",
    githubSigninController
)

router.post(
    "/google",
    googleSigninController
)

export default router