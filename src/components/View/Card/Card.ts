import { ICard} from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

// родительский класс для классов карточек товаров
export class Card<T = {}> extends Component<ICard & T> { 
  protected titleElement: HTMLSpanElement | HTMLHeadingElement;
  protected priceElement: HTMLSpanElement;

  constructor(container: HTMLElement) { 
    super(container);
    
    this.titleElement = ensureElement<HTMLSpanElement | HTMLHeadingElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLSpanElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }
  set price(value: number | null) {
    if (value !== null) {
      this.priceElement.textContent = String(value) + ' синапсов';
    }else {
      this.priceElement.textContent = 'Бесценно';
    }
  }
}

