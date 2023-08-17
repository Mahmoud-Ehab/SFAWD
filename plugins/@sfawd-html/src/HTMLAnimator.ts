import { ViewAnimator } from "sfawd";

export class HTMLAnimator extends ViewAnimator<Partial<CSSStyleDeclaration>> {
  constructor() {
    super({transitionDuration: "1s"});
  }
}