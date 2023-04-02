import { MailOptions, SentMessageInfo } from "nodemailer/lib/sendmail-transport"
import { createTransport } from "nodemailer"
import Mail from "nodemailer/lib/mailer"

import KEYS from "@/common/config/keys"

const main = async() => {
    const transport:Mail = createTransport({
        host: KEYS.SMTP_HOST,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            pass: KEYS.SMTP_PASS,
            user: KEYS.SMTP_USER,
        },
        logger: true
    })

    const sendMail = async(options:MailOptions) => {
        const { response }:SentMessageInfo = await transport.sendMail({
            from: KEYS.SMTP_USER,
            ...options,
        })
        return response
    }

    return sendMail
}

export default main