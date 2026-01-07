import { ensureElement } from "../../../../utils/utils";
import { Form, IFormActions } from "./Form";

interface IContactsForm {
  email: string;
  phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
  protected emailInputElement: HTMLInputElement;
  protected phoneInputElement: HTMLInputElement;

  constructor (container: HTMLElement, actions?: IFormActions ) {
    super(container, actions);

    this.emailInputElement = ensureElement<HTMLInputElement>('[name="email"]', this.container);
    this.phoneInputElement = ensureElement<HTMLInputElement>('[name="phone"]', this.container);

    if (actions?.emailInputChangeHandler) {
      this.emailInputElement.addEventListener('change', actions.emailInputChangeHandler);
    }
    if (actions?.phoneInputChangeHandler) {
      this.phoneInputElement.addEventListener('change', actions.phoneInputChangeHandler);
    }
  }

  set email(value: string) {
    this.emailInputElement.value = value;
  }

  set phone(value: string) {
    this.phoneInputElement.value = value;
  }
}