import axios from "axios"

const testMessage = {
    display_name: "testUser",
    user_id: "1",
    channel: "testChannel",
    message: "this is a test message",
}

// axios.put('/chat-messages', testMessage).then((res) => {
//     console.log(res)
// })

const baseURL = 'http://localhost:8008'

async function q() {
    try{
        const resp = await axios.get(baseURL)
        console.log(resp)
    } catch (error) {
        console.log(error)
    }
}

async function cmPut () {
    try { 
        
        const resp = await axios.put(`${baseURL}/chat-messages`, testMessage)
        console.log(resp.data)
    } catch (error) {
        console.log(error)
    }
}

cmPut()