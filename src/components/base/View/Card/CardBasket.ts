import { ICardActions, TCardBasket } from "../../../../types";
import { ensureElement } from "../../../../utils/utils";
import { Card } from "./Card";

// класс карточки товаров в корзине
export class CardBasket extends Card<TCardBasket> {
  
  protected deleteButton: HTMLButtonElement;

  protected indexElement: HTMLSpanElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.indexElement = ensureElement<HTMLSpanElement>('.basket__item-index', this.container);
    
    if(actions?.deleteButtonClickHandler) {
      this.deleteButton.addEventListener('click', actions.deleteButtonClickHandler);
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}