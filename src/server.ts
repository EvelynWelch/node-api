import { Request, Response, request } from 'express';
import express from 'express'

import { getEnvironmentVariable } from './utils.js';

// import { chatMessagesModel } from './dataStorage/chatMessageModel.js';
import { chatMessagesModel, enqueueMessage } from './dataStorage/chatMessageModel.js';

const app = express()
const port = getEnvironmentVariable('EXPRESS_PORT')
console.log(`port: ${port}`)
// const port = 3000

// const model = chatMessagesModel;
app.use(express.json());

app.put('/chat-messages', (req: Request, res: Response) => {
  // req.params
  // const success = enqueueMessage(req.body);
  const success = chatMessagesModel.insert(req.body);
  res.send(success)
})


app.get('/chat-messages', (req: Request, res: Response) => {
  // console.log(req)
  res.send("get chat-message")
})



app.get('/test', (req: Request, res: Response) => {
  res.send(req)
});





app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})




export function startServer() {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

