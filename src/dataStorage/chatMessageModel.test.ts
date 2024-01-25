import { test, describe, expect, beforeAll, afterAll, beforeEach, afterEach } from "@jest/globals";

// import { db } from "./knexConnect.js";
import { chatMessagesController, imessage } from "./chatMessageModel.js";

// there has to be a better way to do this, but to lazy to find it right now
// rename the table and create a new table for test messages.
const testTable = "test_messages";
chatMessagesController.tableName = testTable;


async function setup() {
    await chatMessagesController._createTable()
}

async function teardown() {
    await chatMessagesController.db.schema.dropTable(testTable)    
}

// setup().then()

beforeAll(() => {
    // setup().then(() => {done()})
    // setup().finally(() => done())
    return setup().then()
});
afterAll(() => {
    // teardown().finally(() => {done()})
    return teardown().then()
});

// beforeEach(() => {
//     return setup().then();
// });

// afterEach(() => {
//     return teardown().then();
// })

const testing = "chatMessageModel.chatMessageController"

const testMessage: imessage = {
    display_name: "testUser",
    user_id: "1",
    channel: "testChannel",
    message: "this is a test message",
}

test('pass', () => {expect(true).toBe(true)})


test(`${testing}._createTable() creates a table named after this.tableName`, async() => {
    // await setup();
    const tableExists = await chatMessagesController.db.schema.hasTable(chatMessagesController.tableName);
    expect(tableExists).toBe(true);
    // await teardown();
})

test(`${testing}.insert() returns true when successfull`, async () => {
    const success = await chatMessagesController.insert(testMessage)
    expect(success).toBe(true)
})



// teardown().then();

// db.schema.dropTable(testTable).then()
