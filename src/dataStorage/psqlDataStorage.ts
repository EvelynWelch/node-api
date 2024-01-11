/* 
This file creates a connection to a postgresql instance and exports a DataStorage class that
impliments the RestApi interface.
*/


import pg from 'pg'
import knex from 'knex'


import { getEnvironmentVariable } from '../utils.js'
import { iRestApi, iDataStore } from './interfaces.js'


const db_connect_info = {
    user: getEnvironmentVariable('PG_USER'),
    host: getEnvironmentVariable('PG_HOST'),
    database: getEnvironmentVariable('PG_DATABASE'),
    password: getEnvironmentVariable('PG_PASSWORD'),
    port: Number(getEnvironmentVariable('PG_PORT')),
}
// console.log(db_connect_info)

const createDatabaseConnection = async () => {
    const client = new pg.Client(db_connect_info)
    await client.connect()
        .then(() => {
            console.log("***** Connected to database *****")
            return client
        })
        .catch((err) => {
            console.error(`***** psqlDataStorage connecting to ${db_connect_info.host}:${db_connect_info.port} *****`)
            throw new Error("dataStorage.psqlDataStorage.createDatabaseConnection(): failed to connect ")
        })

}

// const client = new pg.Client(db_connect_info)
// await client.connect()
//     .then(() => {
//         console.log("***** Connected to database *****")
//         return client
//     })
//     .catch((err) => {
//         console.error(err)
//         console.error(`***** psqlDataStorage connecting to ${db_connect_info.host}:${db_connect_info.port} *****`)
//         throw new Error("dataStorage.psqlDataStorage.createDatabaseConnection(): failed to connect ")
//     })


// const client = createDatabaseConnection()





// await client.connect()
//             .catch((err) => {
//                 console.log(`***** psqlDataStorage connecting to ${db_connect_info.host}:${db_connect_info.port} *****`)
//             })
//             .then(() => {
//                 console.log("***** Connected to database *****")
//             })




async function tryKnex() {
    const pg = knex({
        client: 'pg',
        connection: db_connect_info,
        searchPath: ['knex', 'public'],
    
    });
    
    
    console.log("connected to postgres?")
    
    await pg.schema.hasTable('users').then(function(exists) {
      if (!exists) {
        return pg.schema.createTable('users', function(t) {
          t.increments('id').primary();
          t.string('first_name', 100);
        });
      }
    })
    
    
    
    
    // pg('users').where('id', 1)
    
    
    try {
        await pg.transaction(async trx => {
    
          const users = [
            {first_name: "abc1"},
            {first_name: "abc2"},
            {first_name: "abc3"},
            {first_name: "abc3"},
            {first_name: "abc3"}
          ];
    
        //   const ids = await trx('catalogues')
        //     .insert({
        //       name: 'Old Books'
        //     }, 'id')
    
        //   users.forEach((user) => user.catalogue_id = ids[0])
          const inserts = await trx('users').insert(users)
    
          console.log(inserts.length + ' new books saved.')
        })
      } catch (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
      }
    
    
      console.log(pg('users').where('id', 1))
    
}

// tryKnex().then(() => {
//     console.log("maybe that worked")
// })

class DataStorage implements iRestApi {
    isConnected = false

    constructor() {

    }

    get() {
        return false
    }
    post() {
        return false
    }
    put() {
        return false
    }
    delete() {
        return false
    }
}


export const connect = async () => {

    console.log("in connect")

    console.log("awaiting client")

    try {
        console.log("uhhhhh")
        //   console.log("try loop")
        //   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
        //   console.log(res.rows[0].message) // Hello world!
    } catch (err) {
        console.error("connection error: ")
        console.error(err);
    }
}

// connect()

export { DataStorage }

