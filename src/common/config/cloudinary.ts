import { v2 as cloudinary } from "cloudinary"

import KEYS from "./keys"

cloudinary.config({
    cloud_name: KEYS.CLOUD_NAME,
    api_key: KEYS.CLOUD_KEY,
    api_secret: KEYS.CLIENT_SECRET
})

export default cloudinary