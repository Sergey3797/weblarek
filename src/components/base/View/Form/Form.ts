import { IForm, IFormActions, TPayment } from "../../../../types";
import { ensureElement } from "../../../../utils/utils";
import { Component } from "../../Component";

// родительский класс для класса формы
export class Form<T extends object> extends Component<IForm<T> & T> {
  protected errorsElement: HTMLSpanElement;
  protected submitButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IFormActions) {
    super(container);
    
    const modalActionsContainer = ensureElement<HTMLDivElement>('.modal__actions', this.container);
    this.submitButtonElement = ensureElement<HTMLButtonElement>('.button', modalActionsContainer);
    this.errorsElement = ensureElement<HTMLSpanElement>('.form__errors', modalActionsContainer);

    if (actions?.submitButtonClickHandler) {
      this.submitButtonElement.addEventListener('click', actions.submitButtonClickHandler);
    }
  }

  set errors(value: {[key in keyof T]: string}) {
    this.errorsElement.textContent = Object.values(value).join(', ');
  }

  set isValid(value: boolean) {
    if (value) {
      this.submitButtonElement.disabled = false;
    }else {
      this.submitButtonElement.disabled = true;
    }
  } 
}  