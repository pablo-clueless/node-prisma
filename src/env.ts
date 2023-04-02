const requiredServerEnvs = [
    "APP_URI",
    "CLIENT_ID",
    "CLIENT_SECRET",
    "CLOUD_KEY",
    "CLOUD_NAME",
    "CLOUD_SECRET",
    "DATABASE_URL",
    "EXPIRES_IN",
    "GITHUB_ID",
    "GITHUB_SECRET",
    "JWT_SECRET",
    "NODE_ENV",
    "PORT",
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