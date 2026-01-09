import { IGallery } from "../../types";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

// класс представления каталога
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