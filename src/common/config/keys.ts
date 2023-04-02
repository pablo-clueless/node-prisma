import dotenv from "dotenv"

dotenv.config()

const KEYS = {
    APP_URI: process.env.APP_URI,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLOUD_KEY: process.env.CLOUD_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_SECRET: process.env.CLOUD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SMTP_HOST: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_USER: process.env.SMTP_USER,
    VERSION: process.env.VERSION,
}

export default KEYS