import { State } from "@figliolia/galena";
import { EventCache } from "./EventCache.js";
export class WebComponent extends HTMLElement {
    StateInstances = [];
    EventCache = new EventCache();
    disconnectedCallback() {
        this.EventCache.flush();
        this.StateInstances.forEach(s => s.clearAllSubscriptions());
    }
    createStateInstance(name, initialState) {
        const state = new State(name, initialState);
        this.StateInstances.push(state);
        return state;
    }
    mountDOMNode(callback) {
        this.updateDOM(callback);
    }
    attributeChangedCallback(_name, _oldValue, _newValue) { }
    getAttribute(name) {
        return this.getAttribute(name) || this.defaultProps[name] || null;
    }
    defaultProps = {};
    updateDOM(callback) {
        requestAnimationFrame(time => {
            callback(time);
        });
    }
    attachEvent(...args) {
        return this.EventCache.attachEvent(...args);
    }
}
