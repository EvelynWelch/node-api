import knex from "knex"


/* An interface for data storage classes that describes a rest api. */ 
export interface iRestApi {
    get: Function,
    post: Function,
    put: Function,
    delete: Function,
}

export interface iDataStore {
    isConnected: boolean,
    
}


export interface iModel {
    db: knex.Knex,
    tableName: string,
}