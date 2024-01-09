import {Request, Response} from 'express';
import express from 'express' 

import { getEnvironmentVariable } from './utils.js';



const app = express()
const port = getEnvironmentVariable('EXPRESS_PORT')

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})




export function startServer() {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
