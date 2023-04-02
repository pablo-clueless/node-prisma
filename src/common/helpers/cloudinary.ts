import cloudinary from "../config/cloudinary"

const uploader = async(file: string) => {
    const { secure_url } = await cloudinary.uploader.upload(file, {
        folder: "prisma",
        transformation: [
            {  width: 350, height: 350, crop: 'scale' },
            { fetch_format: 'webp' }
        ]
    })
    return secure_url
}

export default uploader