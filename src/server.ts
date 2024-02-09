import { Request, Response, request } from 'express';
import express from 'express'

import { processQueue } from './dataStorage/chatMessageModel.js';
import { getEnvironmentVariable } from './utils.js';

// import { chatMessagesModel } from './dataStorage/chatMessageModel.js';
import { chatMessagesModel, enqueueMessage, getQueueInfo } from './dataStorage/chatMessageModel.js';
import { logger } from './logger.js';

const app = express()
const port = getEnvironmentVariable('EXPRESS_PORT')

const httpLogger = logger.child({ module: "server" })

app.use(express.json());

// app.use((req: Request, res: Response, next: Function) => {
//   httpLogger.info({request: req, response: res})
// })


app.put('/chat-messages', (req: Request, res: Response) => {
  enqueueMessage(req.body)
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
    logger.info(`express running on port: ${port}`)
  })
}

