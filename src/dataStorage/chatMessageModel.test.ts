import { test, describe, expect } from "@jest/globals";

import { db } from "./knexConnect.js";
import { chatMessagesController, imessage } from "./chatMessageModel.js";

// there has to be a better way to do this, but to lazy to find it right now
// rename the table and create a new table for test messages.
const testTable = "test_messages";

async function setup() {
    chatMessagesController.tableName = testTable;
    await chatMessagesController._createTable()
}

async function teardown() {
    await db.schema.dropTable(testTable)    
}

setup().then()

const testing = "chatMessageModel.chatMessageController"

const testMessage: imessage = {
    display_name: "testUser",
    user_id: "1",
    channel: "testChannel",
    message: "this is a test message",
}

test(`${testing}._createTable() creates a table named after this.tableName`, async() => {
    console.log(chatMessagesController.tableName)
    const tableExists = await db.schema.hasTable(chatMessagesController.tableName);
    expect(tableExists).toBe(true);
})

test(`${testing}.insert() returns true when successfull`, async () => {
    const success = await chatMessagesController.insert(testMessage)
    expect(success).toBe(true)
})

// test(`${testing}.insert() returns false when unsuccessfull`, async () => {
//     // let tm = testMessage
//     // tm.timestamp = "this should make it fail???"
//     const success = await  chatMessagesController.insert(tm)
//     expect(success).toBe(false)

// })

teardown().then();

// db.schema.dropTable(testTable).then()