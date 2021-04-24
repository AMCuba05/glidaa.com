import { EventEmitter } from 'events';
import { EventType } from '../models/events';

class EventTools {

	constructor() {
		this.emitter = new EventEmitter();
		this.emitter.setMaxListeners(0);
	}

	on(type, callback) {
		this.emitter.on.apply(this.emitter, [type, callback]);
		return this;
	}

	emit(type, payload) {
		this.emitter.emit.apply(this.emitter, [type, payload]);
		return this;
	}

	removeListener(type, payload) {
		this.emitter.removeListener.apply(this.emitter, [type, payload]);
		return this;
	}
}

export default new EventTools();
