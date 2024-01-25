import {Request, Response} from 'express';
import express from 'express' 

import { getEnvironmentVariable } from './utils.js';

import { chatMessagesModel } from './dataStorage/chatMessageModel.js';


const app = express()
const port = getEnvironmentVariable('EXPRESS_PORT')
console.log(`port: ${port}`)
// const port = 3000

const model = chatMessagesModel;
app.use(express.json()); 

app.put('/chat-messages', (req: Request, res: Response) => {
  // req.params
  const success = model.insert(req.body);
  res.send(success)
})


app.get('/chat-messages', (req: Request, res: Response) => {
  console.log(req)
  res.send("get chat-message")
})


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})




export function startServer() {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}




// startServer()