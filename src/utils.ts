// TODO: create a queue that delegates its functions to workers.
// TODO: add a bulk dequeuer'

import { logger } from "./logger.js";


export function getEnvironmentVariable(name: string): string {
    // logger.trace(`getEnvironmentVariable(${name}) called`)
    const value = process.env[name];
    const logMessage = "utils.getEnviromentVariable() error: " + name + " is not an in process.env[]"
    if (!value) {
        const err = new Error(".env variable not found");
        logger.warn(err, logMessage)
        // logger.error(err, `process variable: ${name} is not set`);
        throw err
    }
    return value;
}


export class Queue<T> {
    private items: Array<T>;
    constructor() {
        this.items = [];
    }
    get size(): number {
        return this.items.length
    }
    get isEmpty(): boolean {
        return this.items.length === 0;
    }
    enqueue(item: T) {
        this.items.push(item)
    }
    dequeue(): T {
        return this.items.shift()
    }
    peek(): T {
        return this.items[0]
    }

    getItems(): Array<T> {
        // const clone = this.items.map((x) => x)
        return this.items.map((x) => x)
    }
}


class EventNotRegisteredError extends Error {
    constructor(message?: string) {
        super(message || "event is not registered");
        this.name = "SubscriberError";
    }
}

export class Observer {
    private observers: Map<String, Function[]>;
    constructor() {
        this.observers = new Map();
    }
    getSubs(event: string): Array<Function> {
        return this.observers.get(event).map((x) => x);
    }
    hasEvent(event: string): boolean {
        return this.observers.has(event);
    }
    private updateSubscribers(event: string, subscribers: Array<Function>) {
        if (!this.observers.has(event)) {
            const err = new EventNotRegisteredError()
            const logMessage = `Observer.updateSubscribers() event: ${event} is not registered`;
            logger.error(err, logMessage)
            throw err
        }
        this.observers.set(event, subscribers);
    }

    registerEvent(event: string): boolean {
        if (this.observers.has(event)) {
            logger.warn(`Observer.registerEvent() event: ${event} is already registered`)
            return false
        };
        this.observers.set(event, [])
        return true;
    }

    unregisterEvent(event: string): boolean {
        if (!this.observers.has(event)) {
            logger.warn(`Observer.unregisterEvent() event: ${event} is not registered`)
            return false;
        }
        this.observers.delete(event)
        return true;
    }

    subscribe(event: string, callback: Function): boolean {
        if (!this.observers.has(event)) {
            const err = new EventNotRegisteredError()
            const logMessage = `Observer.subscribe() ${event} is not registered`;

            logger.error(err, logMessage)
            throw err
        }
        this.observers.get(event).push(callback);
        return true;
    }

    unsubscribe(event: string, callback: Function): boolean {
        if (!this.observers.has(event)) {
            const err = new EventNotRegisteredError()
            const logMessage = `Observer.unsubscribe() ${event} is not registered`;

            logger.error(err, logMessage)
            return false;
        }
        const subscribers = this.observers.get(event)
        let callbackRemoved = false;
        const updated = subscribers.filter((elem) => {
            if (elem === callback) {
                callbackRemoved = true;
                return false;
            }
            return true;
        })
        this.updateSubscribers(event, updated);
        return callbackRemoved
    }

    fire(event: string, args: any) {
        if (!this.observers.has(event)) {
            const err = new EventNotRegisteredError()
            const logMessage = `Observer.fire() event: ${event} is not registered`
            logger.error(err, logMessage)
            return;
        }
        const subscribers = this.observers.get(event)
        let returnArgs = args
        subscribers.forEach((callback) => {
            returnArgs = callback(args)
        })

        return returnArgs
    }
}

