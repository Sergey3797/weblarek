import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";

interface IBasketActions {
  orderButtonClickHandler?: () => void;
}

interface IBasket {
  items: HTMLElement[];
  totalPrice: number;
  title?: string;
}

export class Basket extends Component<IBasket> {
  protected titleElement: HTMLHeadingElement;
  protected totalPriceElement: HTMLSpanElement;
  protected listElement: HTMLUListElement;
  protected orderButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IBasketActions) {
    super(container);
    this.titleElement = ensureElement<HTMLHeadingElement>('.modal__title', this.container);
    this.totalPriceElement = ensureElement<HTMLSpanElement>('.basket__price', this.container);
    this.listElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this.orderButtonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this.titleElement.textContent = 'Корзина';
    this.orderButtonElement.textContent = 'Оформить';

    if(actions?.orderButtonClickHandler) {
      this.orderButtonElement.addEventListener('click', actions.orderButtonClickHandler);
    }
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set totalPrice(value: number) {
    this.totalPriceElement.textContent = String(value) + ' синапсов';
  }

  set items(value: HTMLElement[]) {
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