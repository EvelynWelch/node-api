import knex from "knex"

import { db } from './knexConnect.js'

interface imessage {
    display_name: string,
    user_id: string,
    channel: string,
    message: string,
}

class ChatMessage {
    db: knex.Knex;
    tableName: string = 'chat_message';
    hasTable: boolean;
    ready: boolean;

    constructor(db: knex.Knex) {
        this.db = db
    }

    async _hasTable() {
        db.schema.hasTable(this.tableName).then((exists) => {
            if (!exists) {
                this._createTable()
                    .then(() => this.ready = true)
                    .catch((error) => { console.error(error) })
            }
        }).catch((error) => { console.error(error) })
    }

    async _createTable() {
        return db.schema.createTable(this.tableName, (table) => {
            // define the table here
            table.string('user_id');
            table.string('display_name');
            table.string('message');
            table.string('channel');
            table.timestamp('created_at').defaultTo(Date.now());
        })
    }

    async insert(message: imessage) {
        let success = false;
        await db.transaction(async action => {
           return await action(this.tableName).insert(message)
        })
        .then(() => {
            success = true
        })
        .catch(error => {
            success = false
            console.error(error)
        })
        
        return success 
    }
}

const chatMessages = new ChatMessage(db);

export { chatMessages }