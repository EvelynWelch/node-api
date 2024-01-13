/* 

These are the knex types that I found. They might not all be here because I extracted them via bash.

table.integer(name, length)
table.bigInteger(name)
table.tinyint(name, length)
table.smallint(name)
table.mediumint(name)
table.bigint(name)
table.text(name, [textType])
table.string(name, [length])
table.boolean(name)
table.date(name)
table.datetime(name, options={[useTz: boolean], [precision: number]})
table.timestamp(name, options={[useTz: boolean], [precision: number]})
table.uuid(name, options=({[useBinaryUuid:boolean],[primaryKey:boolean]})
table.unique(columns, options={[indexName: string], [deferrable:'not deferrable'|'immediate'|'deferred'], [storageEngineIndexType:'btree'|'hash'], [useConstraint:true|false], [predicate: QueryBuilder]})
table.foreign(columns, [foreignKeyName])[.onDelete(statement).onUpdate(statement).withKeyName(foreignKeyName).deferrable(type)]


skipped
table.float(column, [precision], [scale])
table.double(column, [precision], [scale])
table.decimal(column, [precision], [scale])
table.time(name, [precision])
table.timestamps([useTimestamps], [defaultToNow], [useCamelCase])
table.dropTimestamps([useCamelCase])
table.binary(name, [length])
table.enu(col, values, [options])
table.enu('column', ['value1', 'value2'])
table.enu('column', ['value1', 'value2'], { useNative: true, enumName: 'foo_type' })
table.enu('column', null, { useNative: true, existingType: true, enumName: 'foo_type' })
table.enu('column', null, { useNative: true, existingType: true, enumName: 'foo_type', schemaName: 'public' })
table.json(name)
table.jsonb(name)
table.geometry(name)
table.geography(name)
table.point(name)
table.comment(value)
table.engine(val)
table.charset(val)
table.collate(val)
table.inherits(val)
table.specificType(name, type)
table.index(columns, [indexName], options=({[indexType: string], [storageEngineIndexType: 'btree'|'hash'], [predicate: QueryBuilder]}))
table.setNullable(column)
table.dropNullable(column)
table.primary(columns, options=({[constraintName:string],[deferrable:'not deferrable'|'deferred'|'immediate']})
table.dropForeign(columns, [foreignKeyName])
table.dropUnique(columns, [indexName])
table.dropPrimary([constraintName])
table.queryContext(context)
*/

import knex from "knex";

import { db } from "./knexConnect.js";

import testJson from "../../src/dataStorage/test.json" with { type: 'json' };

const name = {"name": "string"}
// almost everything has a "name":"string" and a "nullable": "boolean" if nullable isn't set it defaults to false
const knexTypeFormats = {
    "tableName": "string",
    "integer": { "name": "string", "length": "number"},
    "biginteger": {"name": "string"},
    "tinyint": { "name": "string", "length": "number"},
    "text": {"name": "string", "textType": "IDK"},
    "string": {"name": "string", "length": "number"},
    "boolean": {"name": "string",},
    "date": {"name": "string"},
    "dateTime": {"name": "string", "options": {"useTZ": "boolean", "precision": "number"}},
    "timeStamp": {"name": "string", "options": {"useTZ": "boolean", "precision": "number"}},
    "uuid": {"name": "string", "options": {"useBinaryUuid":"boolean", "primaryKey": "boolean"}},
    // both unique and foreign have a column instead of a name, i think it's just a string
    "unique": {"columns": "string", "indexName": "string", "deferrable": "'not deferrable'|'immediate'|'deferred'"}, // deferrable is an enum i'm not sure the best way to handle it.
    "foreign": {"columns": "string", "foreignKeyName": "string"} // this has a bunch of options that i'm not really sure on
}


// await db.schema.hasTable('users').then(function(exists) {
//     if (!exists) {
//       return db.schema.createTable('users', function(t) {
//         t.increments('id').primary();
//         t.string('first_name', 100);
//       });
//     }
//   })

const createTable = async (tableData: any) => {
    // const data = JSON.parse(tableData);

    const tableName = tableData.tableName;
    const fields = tableData.fields
    if(!tableName) throw new Error("procJson.createTable() error: tableData does not have 'tableName' field")

    db.schema.hasTable(tableName).then((exists) => {
        if(exists) throw new Error("procJson.createTable() error: table already exists.");
        db.schema.createTable(tableName, () => {
            console.log("creating table")
        })
        for(let i = 0; i < fields.length; i++){
            const entry = fields[i]
            const type: String = entry.type;
            if(!type) throw new Error("procJson.createTable() error: entry.type not defined")
            db.schema.alterTable(tableName, (table: knex.Knex.CreateTableBuilder) => {
                // get the function to create the type from table
                const fieldType = table[type as keyof typeof table]
                if (fieldType === undefined) throw new Error("procJson.createTable() error: type not found on knex.Knex.CreateTableBuilder.")
                
                // get the possible options for the function
                const fieldOptions = knexTypeFormats[type as keyof typeof knexTypeFormats]
                if(fieldOptions === undefined) throw new Error("procJson.createTable() error: type has not been implimented to field options.")

                // TODO: make it add all the values to the function

            })

        }

    })
}

const checkJSON = () => {
    // const data = JSON.parse(testJson);
    // console.log(testJson);
    // console.log(testJson.tableName)

    for(let i = 0; i < testJson.fields.length; i++){
        console.log(testJson.fields[i]);
        
    }
}

checkJSON();
