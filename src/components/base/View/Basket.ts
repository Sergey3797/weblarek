import { IBasket } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";
import { EventEnum, IEvents } from "../Events";

// класс представления корзины
export class Basket extends Component<IBasket> {
  protected titleElement: HTMLHeadingElement;
  protected totalPriceElement: HTMLSpanElement;
  protected listElement: HTMLUListElement;
  protected orderButtonElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.titleElement = ensureElement<HTMLHeadingElement>('.modal__title', this.container);
    this.totalPriceElement = ensureElement<HTMLSpanElement>('.basket__price', this.container);
    this.listElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this.orderButtonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this.titleElement.textContent = 'Корзина';
    this.orderButtonElement.textContent = 'Оформить';
    this.orderButtonElement.addEventListener('click', () => {
      this.events.emit(EventEnum.BasketOrderButtonClick);
    });
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set totalPrice(value: number) {
    this.totalPriceElement.textContent = String(value) + ' синапсов';
  }

  set items(value: HTMLElement[]) {
    this.listElement.innerHTML = '';
    if (value.length) {
      this.orderButtonElement.disabled = false;
      for (let child of value) {
        this.listElement.append(child);
      }
    }else {
      this.orderButtonElement.disabled = true;
    }
  }
}