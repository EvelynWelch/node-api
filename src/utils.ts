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