import knex from "knex"

import { db } from './knexConnect.js'

interface imessage {
    display_name: string,
    user_id: string,
    channel: string,
    message: string,
    // timestamp?: string,
}

class ChatMessageController {
    db: knex.Knex;
    tableName: string = 'chat_message';
    hasTable: boolean;
    ready: boolean;

    constructor(db: knex.Knex, tableName?: string) {
        this.db = db;
        this.tableName ? tableName : 'chat_message';
        this._setHasTable();
    }

    async _setHasTable() {
        db.schema.hasTable(this.tableName).then((exists) => {
            this.hasTable = exists;
            // if (!exists) {
            //     this._createTable()
            //         .then(() => this.ready = true)
            //         .catch((error) => { console.error(error) })
            // }
        }).catch((error) => { console.error(error) })
    }

    async _createTable() {
        if(this.hasTable) return null;

        return db.schema.createTable(this.tableName, (table) => {
            // define the table here
            table.string('user_id');
            table.string('display_name');
            table.string('message');
            table.string('channel');
            // table.timestamp('created_at');
        })
            .then(() => { console.log("table: " + this.tableName + " has been created") })
            .catch(error => { console.error(error) })
    }

    async insert(message: imessage) {
        let success = false;
        db.transaction(async action => {
            const now = Date.now();
            const ts = new Date(now);
            // message.timestamp = ts.toUTCString()
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

const chatMessagesController = new ChatMessageController(db);

const testMessage: imessage = {
    display_name: "testUser",
    user_id: "1",
    channel: "testChannel",
    message: "this is a test message",
}

await chatMessagesController.insert(testMessage);
console.log("end")
// return 0
export { chatMessagesController, imessage }