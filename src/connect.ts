import pg from 'pg'
import { DB_CONNECTION_DATA } from './env.js'

 
let connect = async () => {


   
   
   console.log("in connect")
   
   const client = new pg.Client(DB_CONNECTION_DATA)

   await client.connect()

   console.log("awaiting client")
   
   try {
      console.log("try loop")
      const res = await client.query('SELECT $1::text as message', ['Hello world!'])
      console.log(res.rows[0].message) // Hello world!
   } catch (err) {
      console.log("connection error: ")
      console.error(err);
   } finally {
      console.log("finally hit")
      // await client.end()
   }
}

// connect()

export { connect }

