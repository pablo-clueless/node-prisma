import { PrismaClient } from "@prisma/client"
import { Server, Socket } from "socket.io"
import dotenv from "dotenv"
import http from "http"

import sessionMiddleware from "./common/middlewares/session"
import { SocketData } from "./common/interfaces"
import wrap from "./common/middlewares/socket"
import KEYS from "./common/config/keys"
import getApp from "./server"

dotenv.config()
const app = getApp()
const prisma = new PrismaClient()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["*"],
        allowedHeaders: ["Authorization", "Access-Token"],
    },
})

const main = async() => {
    await prisma.$connect()
    console.log("Connected to MongoDB")
}
main()
.then(async() => {
    await prisma.$disconnect()
})
.catch(async(error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)  
})

server.listen(KEYS.PORT, () => {
    console.log(`Server running on port:${KEYS.PORT}`)

    io.use(wrap(sessionMiddleware))
    io.on("connection", (socket: Socket) => {
        console.log(`User ${socket.id} connected`)

        socket.on("notify", async(data: SocketData) => socket.to("").emit(JSON.stringify(data)))
        socket.on("disconnect", () => console.log("A user disconnected"))
    })
})