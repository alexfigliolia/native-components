import type { DOMListener } from "./types";
export declare class EventCache extends Map<string, DOMListener<any, any>> {
    private ID;
    constructor();
    attachEvent<N extends HTMLElement, E extends keyof HTMLElementEventMap>(node: N, event: E, listener: (this: HTMLElement, ev: HTMLElementEventMap[E]) => void, options?: boolean | AddEventListenerOptions): () => void;
    flush(): void;
    private detachEvent;
    private getID;
}
