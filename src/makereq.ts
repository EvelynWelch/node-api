import axios from "axios"
import tmi from "tmi.js";
// Importing the Required Modules 
import * as fs from 'fs';

// const readline = require('readlin/e'); 
import * as readline from 'readline';

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


// const data = {
//     display_name: "test_user",
//     user_id: "123456",
//     channel: "test_channel",
//     message: "".padStart(500, "*")
// }


async function get22001Data () {
    let data22001: Array<any> = []

    const file = readline.createInterface({
        input: fs.createReadStream('log.json'),
        terminal: false
    });

    file.on('line', (line: any) => {
        if(line === "") return
        const l = JSON.parse(line)
        // console.log(l)
        if(!l.error) return
        if(l.error.code !== "22001") return

        const messageData = {...l.data}
        chatMessagePut(messageData);
        // console.log(messageData);
        // data22001.push(messageData)
        // const d = getDataFromError22001(line)
        // console.log("get22001Data() d: " + Object.keys(d));
        // if (d !== undefined) {
        //     data22001.push(d)
        // }
    
    })
 
    
}

await get22001Data()

// await chatMessagePut(data)
