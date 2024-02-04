import { Queue, Observer } from './utils'

const testNumbers = [0, 1, 2, 3, 4, 5]

function queueFactory() {
    const queue = new Queue<Number>();
    testNumbers.forEach(n => queue.enqueue(n))
    
    return queue
}


test('utils.Queue.enqueue()', () => {    
    const queue = queueFactory();
    
    const items = queue.getItems()

    for(let i = 0; i < items.length; i++){
        expect(items[i]).toBe(testNumbers[i])
    }

})


test('utils.Queue.dequeue()', () => {
    const queue = queueFactory();
    const items = queue.getItems();
    for(let i = 0; i < items.length; i++){
        const deq = queue.dequeue()
        expect(deq).toBe(testNumbers[i])
    }
})


test("utils.Queue.size", () => {
    const queue = queueFactory();
    expect(queue.size).toBe(queue.getItems().length);
})

test("utils.Queue.isEmpty", () => {
    const queue = new Queue<Number>();
    expect(queue.isEmpty).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty).toBe(false);

})