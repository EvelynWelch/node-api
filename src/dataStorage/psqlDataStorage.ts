/* 
exports a DataStorage class that impliments the RestApi interface.
*/

import { iRestApi, iDataStore } from './interfaces.js'
import { db } from './knexConnect.js'



class DataStorage implements iRestApi {
    isConnected = false

    constructor() {

    }

    get() {
        return false
    }
    post() {
        return false
    }
    put() {
        return false
    }
    delete() {
        return false
    }
}

export { DataStorage }

