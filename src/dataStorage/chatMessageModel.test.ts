import { test, describe, expect, beforeAll, afterAll, beforeEach, afterEach } from "@jest/globals";

// import { db } from "./knexConnect.js";
import { chatMessagesModel, imessage } from "./chatMessageModel.js";

// there has to be a better way to do this, but to lazy to find it right now
// rename the table and create a new table for test messages.
const testTable = "test_messages";
chatMessagesModel.tableName = testTable;


beforeEach((done) => {
    chatMessagesModel._createTable()
    done()
});
afterEach((done) => {
    chatMessagesModel.db.schema.dropTable(testTable)    
    done()
});

// beforeEach(() => {
//     return chatMessagesModel._createTable()
// })

// afterEach(() => {
//     return chatMessagesModel.db.schema.dropTable(testTable)
// })


const testing = "chatMessageModel.chatMessagesModel"

const testMessage: imessage = {
    display_name: "testUser",
    user_id: "1",
    channel: "testChannel",
    message: "this is a test message",
}

test(`${testing}._createTable() creates a table if one doesn't exist`, async() => {
    const preTableExists = await chatMessagesModel.db.schema.hasTable(chatMessagesModel.tableName);
    if(preTableExists){
        console.log("deleting setup table")
        await chatMessagesModel.db.schema.dropTable(testTable)    
    }
    await chatMessagesModel._createTable();
    const tableExists = await chatMessagesModel.db.schema.hasTable(chatMessagesModel.tableName);
    expect(tableExists).toBe(true);
})

test(`${testing}._createTable() doesn't try and create a table if one exists`, async() => {
    const tableExists = await chatMessagesModel.db.schema.hasTable(testTable)
    chatMessagesModel._createTable();
})

test(`${testing}._createTable() creates a table named after this.tableName`, async() => {
    const tableExists = await chatMessagesModel.db.schema.hasTable(chatMessagesModel.tableName);
    expect(tableExists).toBe(true);

})

test(`${testing}.insert() returns true when successfull`, async () => {
    const success = await chatMessagesModel.insert(testMessage)
    expect(success).toBe(true)
})