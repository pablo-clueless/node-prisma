
export interface EmailSigninDto {
    email: string
    password: string
}

export interface EmailSignupDto {
    fullName: string
    username: string
    email: string
    password: string
}

export interface Auth0SigninDto {
    token: string
}