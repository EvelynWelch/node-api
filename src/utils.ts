export function getEnvironmentVariable(name: string): string {
    const value = process.env[name];
    
    const errorString = "utils.getEnviromentVariable() error: " +  name + " is not an in process.env[]"
    if(!value) {
        console.error(errorString)
        throw new Error("utils.getEnviromentVariable() error: enviroment variable not found in process.env[]");
    }
    return value;
}


export class Queue<T> {
    private items: Array<T>;
    constructor(){
        this.items = [];
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
    size(): number {
        return this.items.length
    }
    get isEmpty(): boolean {
        return this.items.length === 0;
    }
}


export class Observer {
    private observers: Map<String, Function[]>;
    constructor() {
        this.observers = new Map();
    }

    registerEvent(event: string) {
        if(!this.observers.has(event)){
            this.observers.set(event, [])
        }
    }

    unregisterEvent(event: string){
        if(this.observers.has(event)){
            this.observers.delete(event)
        }
    }

    subscribe(event: string, callback: Function ): void {
        this.observers.get(event).push(callback)
    }

    unsubscribe(event: string, callback: Function): void {
        if(!this.observers.has(event)){
            return
        } 
        const subscribers = this.observers.get(event)
        for(let i = 0; i < subscribers.length; i++){
            if(subscribers[i] === callback){
                const removed = subscribers.slice(i, i + 1)
                return             }
        }
    }

    fire(event: string, args: any) {
        const subscribers = this.observers.get(event)
        // let returnArgs = args
        subscribers.forEach((callback) => {
            callback(args)
        })
        return args
    }
}

