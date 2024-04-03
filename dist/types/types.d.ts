export type Optionals<T> = {
    [K in keyof T]?: T[K];
};
export interface DOMListener<N extends HTMLElement = HTMLElement, E extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> {
    node: N;
    event: E;
    listener: (this: HTMLElement, ev: HTMLElementEventMap[E]) => void;
    options?: boolean | AddEventListenerOptions;
}
