import type { DOMListener } from "types";

export class EventCache extends Map<string, DOMListener<any, any>> {
  private ID = -1;
  constructor() {
    super();
  }

  public attachEvent<
    N extends HTMLElement,
    E extends keyof HTMLElementEventMap,
  >(
    node: N,
    event: E,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[E]) => void,
    options?: boolean | AddEventListenerOptions,
  ) {
    const ID = this.getID();
    node.addEventListener(event, listener, options);
    this.set(ID, { node, event, listener, options });
    return () => this.detachEvent(ID);
  }

  public flush() {
    for (const [ID] of this) {
      this.detachEvent(ID);
    }
  }

  private detachEvent(ID: string) {
    if (!this.has(ID)) {
      return;
    }
    const { node, event, listener, options } = this.get(ID)!;
    node.removeEventListener(event, listener, options);
    this.delete(ID);
  }

  private getID() {
    return `${++this.ID}`;
  }
}
