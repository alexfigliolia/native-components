import type { Optionals } from "./types";
import { State } from "@figliolia/galena";
import { EventCache } from "./EventCache";
export declare class WebComponent<T extends Record<string, string>> extends HTMLElement {
    private StateInstances;
    private EventCache;
    disconnectedCallback(): void;
    createStateInstance<S>(name: string, initialState: S): State<S>;
    mountDOMNode(callback: (time: number) => void): void;
    attributeChangedCallback<K extends keyof T>(_name: T, _oldValue: T[K], _newValue: T[K]): void;
    getAttribute<K extends keyof T>(name: K): string | null;
    readonly defaultProps: Optionals<T>;
    updateDOM(callback: (time: number) => void): void;
    attachEvent(...args: Parameters<EventCache["attachEvent"]>): () => void;
}
