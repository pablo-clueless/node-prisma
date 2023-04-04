export interface CreateCommentDto {
    content: string
    postId: string
    userId: string
}

export interface GetCommentByPostDto {
    postId: string
}

export interface DeleteCommentDto {
    id: string
}