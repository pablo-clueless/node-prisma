const requiredServerEnvs = [
    "APP_URI",
    "CLIENT_ID",
    "CLIENT_SECRET",
    "CLOUD_KEY",
    "CLOUD_NAME",
    "CLOUD_SECRET",
    "EXPIRES_IN",
    "JWT_SECRET",
    "MONGO_URI",
    "NODE_ENV",
    "SMTP_HOST",
    "SMTP_PASS",
    "SMTP_USER",
    "VERSION",
] as const

type RequiredServerEnvs = (typeof requiredServerEnvs)[number]

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Record<RequiredServerEnvs, string>{}
    }
}

export {}