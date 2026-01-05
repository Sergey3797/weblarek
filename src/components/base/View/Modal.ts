import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";
import { EventEnum, IEvents } from "../Events";

interface IModal {
  content: HTMLElement | HTMLElement[]
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLDivElement;
  protected closeButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement){
    super(container);
    
    this.contentElement = ensureElement<HTMLDivElement>('.modal__content', this.container);
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    this.closeButton.addEventListener('click', () => {
      this.events.emit(EventEnum.CloseModal);
      this.close();
    })
    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.close();
      }
    })
  }

  open() {
    this.container.classList.add('modal_active');
  }

  close() {
    this.container.classList.remove('modal_active');
    this.content = null;
  }

  set content(value: HTMLElement | HTMLElement[] | null) {
    if(value === null) {
      this.contentElement.innerHTML = '';
    } else {
        for (let child of Array.isArray(value) ? value : [value]) {
        this.contentElement.append(child);
      }
    }
  }
}