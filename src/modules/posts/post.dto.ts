export interface CreatePostDto {
    authorId: string
    title: string
    content: string
    image?: Express.Multer.File
}

export interface GetPostDto {
    id: string
}