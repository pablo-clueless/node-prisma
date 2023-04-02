import cloudinary from "@/common/config/cloudinary"

const uploader = async(file: string, folder: string) => {
    const { secure_url } = await cloudinary.uploader.upload(file, {
        folder,
        transformation: [
            {  width: 350, height: 300, crop: 'scale' },
            { fetch_format: 'webp' }
        ]
    })
    return secure_url
}

export default uploader