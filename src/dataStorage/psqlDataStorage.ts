/* 
This file creates a connection to a postgresql instance and exports a DataStorage class that
impliments the RestApi interface.
*/


import pg from 'pg'
// import knex from 'knex'

import { getEnvironmentVariable } from '../utils.js'

// interfaces
import { iRestApi, iDataStore } from './interfaces.js'


const db_connect_info = {
    user: getEnvironmentVariable('PG_USER'),
    host: getEnvironmentVariable('PG_HOST'),
    database: getEnvironmentVariable('PG_DATABASE'),
    password: getEnvironmentVariable('PG_PASSWORD') ,
    port: Number(getEnvironmentVariable('PG_PORT')),   
}

const client = new pg.Client(db_connect_info)

// await client.connect()
//             .catch((err) => {
//                 console.log(`***** psqlDataStorage connecting to ${db_connect_info.host}:${db_connect_info.port} *****`)
//             })
//             .then(() => {
//                 console.log("***** Connected to database *****")
//             })


class DataStorage implements iRestApi {
    isConnected = false
    
    constructor(){
   
    }

    get(){
        return false
    }
    post(){
        return false
    }
    put(){
        return false
    }
    delete(){
        return false
    }
}
 

export const connect = async () => {
   
   console.log("in connect")

   console.log("awaiting client")
   
   try {
    //   console.log("try loop")
    //   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    //   console.log(res.rows[0].message) // Hello world!
   } catch (err) {
      console.error("connection error: ")
      console.error(err);
   }
}


export { DataStorage }

