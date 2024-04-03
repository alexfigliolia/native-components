"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebComponent = void 0;
const galena_1 = require("@figliolia/galena");
const EventCache_1 = require("./EventCache");
class WebComponent extends HTMLElement {
    constructor() {
        super(...arguments);
        this.StateInstances = [];
        this.EventCache = new EventCache_1.EventCache();
        this.defaultProps = {};
    }
    disconnectedCallback() {
        this.EventCache.flush();
        this.StateInstances.forEach(s => s.clearAllSubscriptions());
    }
    createStateInstance(name, initialState) {
        const state = new galena_1.State(name, initialState);
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
    updateDOM(callback) {
        requestAnimationFrame(time => {
            callback(time);
        });
    }
    attachEvent(...args) {
        return this.EventCache.attachEvent(...args);
    }
}
exports.WebComponent = WebComponent;
