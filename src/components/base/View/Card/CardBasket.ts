import { ensureAllElements, ensureElement } from "../../../../utils/utils";
import { Card, ICardActions } from "./Card";

export class CardBasket extends Card {
  
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
    // TODO: придумать более подробные имена экшена 
    if(actions?.handleButtonClick) {
      this.deleteButton.addEventListener('click', actions.handleButtonClick);
    }
  }
}