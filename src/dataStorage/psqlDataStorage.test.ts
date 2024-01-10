import { test, describe, expect } from "@jest/globals";
import { DataStorage } from "./psqlDataStorage.js";

describe("psqlDataStorage.ts tests", () => {
    test("DataStorage.get returns false", () => {
        const testDataStorage = new DataStorage();
        expect(testDataStorage.get()).toBe(false);
    });
    test("DataStorage.post returns false", () => {
        const testDataStorage = new DataStorage();
        expect(testDataStorage.post()).toBe(false);
    });
    test("DataStorage.put returns false", () => {
        const testDataStorage = new DataStorage();
        expect(testDataStorage.put()).toBe(false);
    });
    test("DataStorage.delete returns false", () => {
        const testDataStorage = new DataStorage();
        expect(testDataStorage.delete()).toBe(false);
    });
})