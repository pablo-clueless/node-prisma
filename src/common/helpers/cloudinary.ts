import cloudinary from "../config/cloudinary"

const uploader = async(file: any) => {
    const { secure_url } = await cloudinary.uploader.upload(file, {
        folder: "prisma",
        transformation: [
            { width: 500, height: 500, gravity: "faces", crop: "thumb" },
            { fetch_format: "webp" }
        ],
    })
    return secure_url
}

export default uploader