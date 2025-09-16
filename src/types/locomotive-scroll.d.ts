declare module "locomotive-scroll" {
  import { EventEmitter } from "events";

  interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    smoothMobile?: boolean;
    resetNativeScroll?: boolean;
    getDirection?: boolean;
    getSpeed?: boolean;
    multiplier?: number;
    lerp?: number;
    class?: string;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    scrollFromAnywhere?: boolean;
    reloadOnContextChange?: boolean;
  }

  export default class LocomotiveScroll extends EventEmitter {
    constructor(options: LocomotiveScrollOptions);
    init(): void;
    destroy(): void;
    update(): void;
    start(): void;
    stop(): void;
    scrollTo(
      target: string | HTMLElement | number,
      options?: { offset?: number; duration?: number; easing?: [number, number, number, number] }
    ): void;
    on(event: string, callback: (...args: any[]) => void): void;
  }
}
