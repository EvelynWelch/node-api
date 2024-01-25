import { iModel } from "../dataStorage/interfaces.js"
import { chatMessagesModel, imessage } from "../dataStorage/chatMessageModel.js"

interface iController {
    url: string;
    model: iModel;

    get: Function;
    put: Function;
    post: Function;
    del: Function;
}

class chatMessagesController implements iController {
    url: string
    model: iModel
    routes: Map<String, Function>

    constructor(model: iModel, url: string,) {
        this.url = url
        this.model = model
        this.routes = new Map<String, Function>()
    }


    get() {
        return
    }
    put() {
        return
    }
    post() {
        return
    }
    del() {
        return
    }
}

// the keys are the url for express, and the function is the associated function

const routes = new Map<String, Function>();
const model = chatMessagesModel;

routes.set('/chat-messages', (message: imessage) => {
    model.insert(message)
})



export { routes }