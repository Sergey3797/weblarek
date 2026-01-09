import { ISuccess, ISuccessActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";

// класс сообщения об успешном заказе
export class Success extends Component<ISuccess> {
  protected descriptionElement: HTMLParagraphElement;
  protected successButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ISuccessActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLParagraphElement>('.order-success__description', this.container);
    this.successButtonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    if (actions?.successButtonClickHandler) {
      this.successButtonElement.addEventListener('click', actions.successButtonClickHandler);
    }
  }

  set orderPrice(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}