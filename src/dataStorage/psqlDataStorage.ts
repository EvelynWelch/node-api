/* 
exports a DataStorage class that impliments the RestApi interface.
*/

import { iRestApi, iDataStore } from './interfaces.js'
import { db } from './knexConnect.js'

async function tryKnex() {
    
    
    console.log("connected to postgres?")
    
    await db.schema.hasTable('users').then(function(exists) {
      if (!exists) {
        return db.schema.createTable('users', function(t) {
          t.increments('id').primary();
          t.string('first_name', 100);
        });
      }
    })
    
    
    
    
    // db('users').where('id', 1)
    
    
    try {
        await db.transaction(async trx => {
    
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
    
    
      console.log(db('users').where('id', 1))
    
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

export { DataStorage }

