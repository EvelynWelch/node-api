import { connect } from "./dataStorage/psqlDataStorage.js"
import { startServer } from "./server.js"

console.log("start script initializing.")

startServer()


connect()




