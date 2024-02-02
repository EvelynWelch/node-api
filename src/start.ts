import axios from "axios"

import { startServer } from "./server.js"
import { processQueue } from "./dataStorage/chatMessageModel.js"

console.log("start script initializing.")

// start the node server
startServer()
processQueue()





// connect to the database
// connect()




