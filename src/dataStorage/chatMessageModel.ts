import knex from "knex"

import { db } from './knexConnect.js'

interface imessage {
    display_name: string,
    user_id: string,
    channel: string,
    message: string,
    // timestamp?: string,
}

class ChatMessageModel {
    db: knex.Knex;
    tableName: string;
    hasTable: boolean = false;
    ready: boolean;

    constructor(db: knex.Knex, tableName?: string) {
        this.db = db;
        this.tableName ? tableName : 'chat_messages';
        // this._setHasTable();
        this._createTable();
        // this.hasTable = this._createTable();
    }

    async _setHasTable() {
        this.hasTable = await this.db.schema.hasTable(this.tableName)
        // this.db.schema.hasTable(this.tableName).then((exists) => {
        //     this.hasTable = exists;
        // }).catch((error) => { console.error(error) })
    }

    async _createTable() {
        // TODO: make this return true / false if it created a table or not.
        this.hasTable = await this.db.schema.hasTable(this.tableName)
        if (this.hasTable) return

        await this.db.schema.createTable(this.tableName, (table) => {
            // define the table here
            table.increments('id');
            table.string('user_id');
            table.string('display_name');
            table.string('message');
            table.string('channel');
            // table.timestamp('created_at');
        })
            .then(() => { this.hasTable = true })
            .catch(error => {
                console.error(error)
            })
        
    }   
    

    async insert(message: imessage) {
    let success = false;
    await this.db.transaction(async action => {
        const now = Date.now();
        const ts = new Date(now);
        // message.timestamp = ts.toUTCString()
        await action(this.tableName).insert(message)
    })
        .then(() => {
            console.log("success = true")
            success = true
        })
        .catch(error => {
            success = false
            console.error(error)
        })
    return success
}
}

const chatMessagesModel = new ChatMessageModel(db);

export { chatMessagesModel, imessage }