import knex from "knex"

import { db } from './knexConnect.js'

import { Queue, Observer } from '../utils.js';


export interface imessage {
    display_name: string,
    user_id: string,
    channel: string,
    message: string,
    // timestamp?: string,
}


class ChatMessageModel {
    db: knex.Knex;
    obs: Observer;
    tableName: string;
    hasTable: boolean = false;
    ready: boolean;
    observerables: string[];

    constructor(db: knex.Knex, tableName?: string, obs?: Observer) {
        this.db = db;
        this.tableName = 'chat_messages';
        // this.tableName ? tableName : 'chat_messages';
        // this.obs ? obs : new Observer();
        this.obs = new Observer();
        this.observerables = [
            'beforeInsert',
            'afterInsert',
            'before_createTable',
            'after_createTable',
        ]
        this.prepareObs()
        // this._setHasTable();
        this._createTable();
        // this.hasTable = this._createTable();
    }

    private prepareObs() {
        this.observerables.forEach((event) => {
            this.obs.registerEvent(event)
        })
    }

    subscribe(event: string, callback: Function) {
        this.obs.subscribe(event, callback)
    }

    unsubscribe(event: string, callback: Function){
        this.obs.unsubscribe(event, callback)
    }

    async _setHasTable() {
        this.hasTable = await this.db.schema.hasTable(this.tableName)
        // this.db.schema.hasTable(this.tableName).then((exists) => {
        //     this.hasTable = exists;
        // }).catch((error) => { console.error(error) })
    }

    private fireBefore_createTable(){
        this.obs.fire('after_createTable', undefined)
    }
    private fireAfter_createTable() {
        this.obs.fire('before_createTable', undefined)
    }
        
    async _createTable() {
        this.fireBefore_createTable()

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
        
        this.fireAfter_createTable()
    }


    private fireBeforeInsert(message: imessage) {
        this.obs.fire('beforeInsert', message)
    }
    private fireAfterInsert(message: imessage){
        this.obs.fire('afterInsert', message)
    }

    async insert(message: imessage) {
        this.fireBeforeInsert(message)
        console.log(`inserting: ${message}`);
        let success = false;
        await this.db.transaction(async action => {
            const now = Date.now();
            const ts = new Date(now);
            // message.timestamp = ts.toUTCString()
            await action(this.tableName).insert(message)
        })
            .then(() => {
                success = true
            })
            .catch(error => {
                success = false
                console.error(error)
            })

        this.fireAfterInsert(message)
        return success
    }
}



export const chatMessagesModel = new ChatMessageModel(db);




const queue = new Queue<imessage>();

const errorQueue = new Queue<imessage>();

const QUEUE_WAIT_TIME = 500

export function processQueue() {

    function _processInsert() {
        const message = queue.dequeue()
        const inserted = chatMessagesModel.insert(message)
        if (!inserted) {
            console.error("failed to insert message")
            errorQueue.enqueue(message)
        }
    }

    while (!queue.isEmpty) {
        setTimeout(_processInsert, QUEUE_WAIT_TIME)
    }
}

function queueInfo() {
    const queued = queue.size;
    const errors = errorQueue.size;
    console.log(`queued: ${queued}, errors: ${errors}`);
    return [queued, errors]
}

export function enqueueMessage(message: imessage) {
    queue.enqueue(message)
}
