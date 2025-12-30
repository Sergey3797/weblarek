import { Component } from "../Component";
import { IEvents } from "../Events";

interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.catalogElement = this.container;
  }
  
  set catalog(items:HTMLElement[]) {
    for (let child of items) {
      this.catalogElement.append(child);
    }
  }
}