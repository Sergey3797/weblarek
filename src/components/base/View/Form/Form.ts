import { ensureElement } from "../../../../utils/utils";
import { Component } from "../../Component";

export interface IFormActions {
  submitButtonClickHandler?: () => void;
  paymentButtonClickHandler?: (paymentType: string) => void;
  addressInputChangeHandler?: () => void;
  emailInputChangeHandler?: () => void;
  phoneInputChangeHandler?: () => void;
}

interface IForm<T> {
  errors: {[key in keyof T]?: string};
  //TODO 
  // подумать когда будем реализовывать конкретные формы 
  // data: T;
}

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
}  