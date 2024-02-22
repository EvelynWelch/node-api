import axios from "axios"
import tmi from "tmi.js";
import { imessage } from "./dataStorage/chatMessageModel.js";
import { getEnvironmentVariable } from "./utils.js";

const testMessage = {
    display_name: "test",
    user_id: "1",
    channel: "testChannel",
    message: "this is a test message",
}

const baseURL = 'http://localhost:' + getEnvironmentVariable('EXPRESS_PORT');

let errCount = 0;
async function chatMessagePut (insert: imessage) {
    try {  
        const resp = await axios.put(`${baseURL}/chat-messages`, insert)
        console.log(resp)
    } catch (error) {
        errCount++
        console.log(errCount + " errors") 
    }
}

// const client = new tmi.Client({
// 	channels: [ 'supertf', 'iitztimmy', 'aceu', '39daph', 'scarra', 'a_seagull']
// });

// client.connect();

// client.on('message', (channel: string, tags: any, message: string, self: any) => {
//     const data = {
//         display_name: tags['display-name'],
//         user_id: tags['user-id'],
//         channel: channel,
//         message: message,
//     };
//     chatMessagePut(data);
// });


const data = {
    display_name: "test_user",
    user_id: "123456",
    channel: "test_channel",
    message: "".padStart(500, "*")
}

await chatMessagePut(data)
