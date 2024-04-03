import type { Optionals } from "types";
import { State } from "@figliolia/galena";
import { EventCache } from "EventCache";

export class WebComponent<
  T extends Record<string, string> = Record<string, string>,
> extends HTMLElement {
  private StateInstances: State[] = [];
  private EventCache = new EventCache();

  public disconnectedCallback() {
    this.EventCache.flush();
    this.StateInstances.forEach(s => s.clearAllSubscriptions());
  }

  public createStateInstance<S>(name: string, initialState: S) {
    const state = new State(name, initialState);
    this.StateInstances.push(state);
    return state;
  }

  public mountDOMNode(callback: (time: number) => void) {
    this.updateDOM(callback);
  }

  public attributeChangedCallback<K extends keyof T>(
    _name: T,
    _oldValue: T[K],
    _newValue: T[K],
  ) {}

  public override getAttribute<K extends Extract<keyof T, string>>(
    name: K,
  ): string | null {
    return super.getAttribute(name) || this.defaultProps[name] || null;
  }

  public readonly defaultProps: Optionals<T> = {};

  public updateDOM(callback: (time: number) => void) {
    requestAnimationFrame(time => {
      callback(time);
    });
  }

  public attachEvent(...args: Parameters<EventCache["attachEvent"]>) {
    return this.EventCache.attachEvent(...args);
  }
}
