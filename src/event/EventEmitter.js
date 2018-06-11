/**
 * Created by PC-275 on 2017/5/15.
 */
import EventEmitter from "events";
class MyEmitter extends EventEmitter {
    constructor() {
        super();
        // this._emitter = new EventEmitter();
    }

    on(event, listener) {
        this.addListener(event, listener);
    }

    off(event, listener) {
        this.removeListener(event, listener);
    }

}

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//     console.log('an event occurred!');
// });
// myEmitter.emit('event');
export default MyEmitter;