// TODO: make it so if it fails to connect to the database it retries.

import knex from "knex"
import { getEnvironmentVariable } from "../utils.js"


const db_connect_info = {
    user: getEnvironmentVariable('PG_USER'),
    host: getEnvironmentVariable('PG_HOST'),
    database: getEnvironmentVariable('PG_DATABASE'),
    password: getEnvironmentVariable('PG_PASSWORD'),
    port: Number(getEnvironmentVariable('PG_PORT')),
}

class DatabaseConnectionError extends Error {
    constructor(message?: string) {
        super(message || 'Failed to connect to database.');
        this.name = 'DatabaseConnectionError';
    }
}

export const db = await knex({
    client: 'pg',
    connection: db_connect_info,
    searchPath: ['knex', 'public'],
});


// function dbConnect(attempts: number): knex.Knex {
//     try {
//         console.log("***** trying to connect to database *****")
//         logger.trace("trying to connect to database")
//         const db = knex({
//             client: 'pg',
//             connection: db_connect_info,
//             searchPath: ['knex', 'public'],
//         })
//         return db
//     } catch (err) {
//         console.log("~~~~~Caught an error~~~~~")
//         const timeout = attempts * 1000
//         console.log("failed to connect to database, retrying in " + attempts + " seconds")
//         setTimeout(dbConnect(attempts+1), timeout)
        
//     } 
// }