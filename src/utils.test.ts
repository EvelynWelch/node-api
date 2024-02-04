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

    for (let i = 0; i < items.length; i++) {
        expect(items[i]).toBe(testNumbers[i])
    }

})

test('utils.Queue.dequeue()', () => {
    const queue = queueFactory();
    const items = queue.getItems();
    for (let i = 0; i < items.length; i++) {
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

const testEvent = "test";
function tf1() { return 1; }
function tf2() { return 2; }
function tf3() { return 3; }

function obsFactory() {
    const obs = new Observer();
    const registerSuccess = obs.registerEvent(testEvent);
    return obs;
}
describe("utils.Observer", () => {
    test("registerEvent()", () => {
        const obs = new Observer();
        const registerSuccess = obs.registerEvent(testEvent);
        expect(registerSuccess).toBeTruthy();
        expect(obs.hasEvent(testEvent)).toBeTruthy();
    });

    test("unregisterEvent()", () => {
        const obs = obsFactory();
        const testRemove = obs.unregisterEvent(testEvent);
        expect(testRemove).toBeTruthy();
        expect(obs.hasEvent('test')).toBeFalsy();
    });

    test("subscribe()", () => {
        const obs = obsFactory();
        const subscribed = obs.subscribe(testEvent, () => { });
        expect(subscribed).toBeTruthy();
        const failedSubscribe = obs.subscribe('fubar', () => { });
        expect(failedSubscribe).toBeFalsy();
    });

    test("unsubscribe()", () => {
        const obs = obsFactory();
        
        let t1 = false;
        let t2 = false;
        let t3 = false;
        function t1f() { t1 = true; }
        function t2f() { t2 = true; }
        function t3f() { t3 = true; }
        obs.subscribe(testEvent, t1f)
        obs.subscribe(testEvent, t2f)
        obs.subscribe(testEvent, t3f)

        const unsubscribed = obs.unsubscribe(testEvent, t2f);

        const subs = obs.getSubs(testEvent);

        expect(subs.length).toBe(2)
        obs.fire(testEvent, null);
        
        expect(unsubscribed).toBeTruthy();
        expect(t2).toBeFalsy();
    });

    test("fire()", () => {
        const obs = obsFactory();
        let t1 = false;
        let t2 = false;
        let t3 = false;
        function t1f() { t1 = true; }
        function t2f() { t2 = true; }
        function t3f() { t3 = true; }
        obs.subscribe(testEvent, t1f)
        obs.subscribe(testEvent, t2f)
        obs.subscribe(testEvent, t3f)

        obs.fire(testEvent, null);

        expect(t1).toBeTruthy();
        expect(t2).toBeTruthy();
        expect(t3).toBeTruthy();
     });
});