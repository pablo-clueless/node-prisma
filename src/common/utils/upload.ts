import multer from "multer"
import path from "path"

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, true)
    }
})

export default upload