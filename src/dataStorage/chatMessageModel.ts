import knex from "knex"

import { db } from './knexConnect.js'

import { Queue, Observer, getEnvironmentVariable } from '../utils.js';
import { logger } from "../logger.js";


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

    constructor(db: knex.Knex) {
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

    unsubscribe(event: string, callback: Function) {
        this.obs.unsubscribe(event, callback)
    }

    async _setHasTable() {
        this.hasTable = await this.db.schema.hasTable(this.tableName)
        // this.db.schema.hasTable(this.tableName).then((exists) => {
        //     this.hasTable = exists;
        // }).catch((error) => { console.error(error) })
    }

    private fireBefore_createTable() {
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
                logger.error(error, "ChatMessageModel._createTable() failed to create table: " + this.tableName)
                console.error(error)
            })

        this.fireAfter_createTable()
    }


    private fireBeforeInsert(message: imessage) {
        this.obs.fire('beforeInsert', message)
    }
    private fireAfterInsert(message: imessage) {
        this.obs.fire('afterInsert', message)
    }

    async insert(message: imessage) {
        this.fireBeforeInsert(message)
<<<<<<< HEAD
        logger.trace('ChatMessageModel.insert()')
=======
        // console.log(`inserting: ${message}`);
        console.log("***** inserting *****")
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af
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
                logger.error({ error: error, data: message }, "ChatMessageModel.insert() failed to insert message")
            })
        this.fireAfterInsert(message)
        return success
    }
}


<<<<<<< HEAD

export const chatMessagesModel = new ChatMessageModel(db);

=======
export const chatMessagesModel = new ChatMessageModel(db);
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af



const queue = new Queue<imessage>();

const errorQueue = new Queue<imessage>();

<<<<<<< HEAD
const QUEUE_WAIT_TIME = Number(getEnvironmentVariable("QUEUE_DELAY_MS")) || 100;

console.log(QUEUE_WAIT_TIME)

let largestQueueSize = 0;

function _processInsert() {

    const message = queue.dequeue()
    const inserted = chatMessagesModel.insert(message)
    if (!inserted) {
        errorQueue.enqueue(message)
        logger.warn(message, "message added to errorQueue")
    }
    logger.trace("_processInsert()")
}

export function processQueue() {
    console.log("processQueue run")
    while (!queue.isEmpty) {
        console.log("queue has items!!")
        if (queue.size > largestQueueSize) {
            largestQueueSize = queue.size
            logger.info("new largest queue size: " + largestQueueSize);
        }
        setTimeout(_processInsert, QUEUE_WAIT_TIME)
=======
const QUEUE_WAIT_TIME = 200;

export function processQueue() {
    function _processInsert() {
        console.log("queue attempting insert");
        const message = queue.dequeue()
        const inserted = chatMessagesModel.insert(message)
        if (!inserted) {
            console.error("failed to insert message")
            errorQueue.enqueue(message)
        }
    }
    if (!queue.isEmpty) {
        _processInsert();
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af
    }

    setTimeout(processQueue, QUEUE_WAIT_TIME)
}

<<<<<<< HEAD
export function getQueueInfo() {
=======
export function queueInfo() {
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af
    const queued = queue.size;
    const errors = errorQueue.size;
    console.log(`queued: ${queued}, errors: ${errors}`);
    return [queued, errors]
}

export function enqueueMessage(message: imessage) {

    queue.enqueue(message)
<<<<<<< HEAD
    logger.trace("enqueueMessage()")
}
=======
    console.log(`queue.size: ${queue.size}`);
}


// export { chatMessagesModel, imessage }
>>>>>>> 838a35880d3a7dbf1605e8d2262367e25188e5af
