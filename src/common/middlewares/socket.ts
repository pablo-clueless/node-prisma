import { ExtendedError } from "socket.io/dist/namespace"
import { Socket } from "socket.io"

const wrap = (middleware: any) =>
    (socket: Socket, next: (error?: ExtendedError | undefined) => void) =>
        middleware(socket.request, {}, next)

export default wrap