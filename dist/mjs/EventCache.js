export class EventCache extends Map {
    ID = -1;
    constructor() {
        super();
    }
    attachEvent(node, event, listener, options) {
        const ID = this.getID();
        node.addEventListener(event, listener, options);
        this.set(ID, { node, event, listener, options });
        return () => this.detachEvent(ID);
    }
    flush() {
        for (const [ID] of this) {
            this.detachEvent(ID);
        }
    }
    detachEvent(ID) {
        if (!this.has(ID)) {
            return;
        }
        const { node, event, listener, options } = this.get(ID);
        node.removeEventListener(event, listener, options);
        this.delete(ID);
    }
    getID() {
        return `${++this.ID}`;
    }
}
