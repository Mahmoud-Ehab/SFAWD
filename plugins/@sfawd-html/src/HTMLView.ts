import { StateManager, View } from "sfawd";
import { HTMLDrawer } from "./HTMLDrawer";
import { MediaQuery } from "./MediaQuery";

type HTMLData = {
  id: string;
  parentId: string;
  viewName?: string; // the name of both file & class
  text?: string;
  href?: string;
  src?: string;
}

type HTMLStyle = Partial<CSSStyleDeclaration>

export class HTMLView extends View<HTMLData, HTMLStyle> {
  private element: HTMLElement;
  public lang: string;
  public mq: MediaQuery;
  private dirpath: string;

  constructor(data: HTMLData, style: HTMLStyle, drawer: HTMLDrawer) {
    super(data, style, drawer);
    
    if (StateManager.get("lang")) {
      this.lang = StateManager.get("lang").toObject().value;
    }

    if (StateManager.get("mediaQuery")) {
      this.mq = StateManager.get("mediaQuery").toObject().value;
    }

    this.dirpath = "./views";
  }

  getDirPath() {
    return this.dirpath;
  }

  setDirPath(path: string) {
    this.dirpath = path;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setElement(element: HTMLElement) {
    this.element = element;
  }

  getFilePath(): string {
    return `${this.dirpath}/${this.getData().viewName}.js`;
  }
  
  getClassName(): string {
    return this.getData().viewName;
  }
}
