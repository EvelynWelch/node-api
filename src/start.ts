import { startServer } from "./server.js"
import { processQueue } from "./dataStorage/chatMessageModel.js"

startServer()


processQueue()
