import { NextFunction, Request, Response } from "express"

import RESPONSE from "common/helpers/response-message"
import createError from "common/helpers/create-error"
import { ExtendedRequest } from "common/interfaces"
import { verify } from "common/helpers/token"
import HTTP from "common/constants/http"
import KEYS from "common/config/keys"

const authorize = async() => {}
