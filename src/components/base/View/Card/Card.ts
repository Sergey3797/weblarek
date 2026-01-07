import { categoryMap } from "../../../../utils/constants";
import { ensureElement } from "../../../../utils/utils";
import { Component } from "../../Component";

export type CategoryKey = keyof typeof categoryMap;

export interface ICardActions {
  onClick?: () => void;
  purchaseButtonClickHandler?: () => void;
  deleteButtonClickHandler?: () => void;
}

interface ICard {
  title: string;
  price: number | null;
}

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
      this.priceElement.textContent = String(value);
    }else {
      this.priceElement.textContent = 'Бесценно';
    }
  }
}

