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

<<<<<<< HEAD
const baseURL = 'http://localhost:' + getEnvironmentVariable('EXPRESS_PORT');
=======
const baseURL = 'http://localhost:8008'
// const baseURL = '127.0.2:5432'
async function q() {
    try{
        const resp = await axios.get(baseURL)
        console.log(resp)
    } catch (error) {
        console.log(error)
    }
}
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af


async function chatMessagePut (insert: imessage) {
    try {  
        const resp = await axios.put(`${baseURL}/chat-messages`, insert)
        console.log(resp.data)
    } catch (error) {
        console.log(error)
    }
}

const client = new tmi.Client({
<<<<<<< HEAD
	channels: [ 'supertf', 'iitztimmy' ]
=======
	channels: [ 'supertf','emongg' ]
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af
});

client.connect();
let count = 0;
client.on('message', (channel: string, tags: any, message: string, self: any) => {
    const data = {
        display_name: tags['display-name'],
        user_id: tags['user-id'],
        channel: channel,
        message: message,
    };
<<<<<<< HEAD
    chatMessagePut(data);
    count++
    console.log(count);
=======
    cmPut(data);
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af
    // console.log({...tags});
});

