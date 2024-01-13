import knex from "knex"
import { getEnvironmentVariable } from "../utils.js"

const db_connect_info = {
    user: getEnvironmentVariable('PG_USER'),
    host: getEnvironmentVariable('PG_HOST'),
    database: getEnvironmentVariable('PG_DATABASE'),
    password: getEnvironmentVariable('PG_PASSWORD'),
    port: Number(getEnvironmentVariable('PG_PORT')),
}

const db = knex({
    client: 'pg',
    connection: db_connect_info,
    searchPath: ['knex', 'public'],

});

export { db }