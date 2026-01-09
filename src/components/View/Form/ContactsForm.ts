import { IContactsForm, IFormActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";

// класс формы контакта 
export class ContactsForm extends Form<IContactsForm> {
  protected emailInputElement: HTMLInputElement;
  protected phoneInputElement: HTMLInputElement;

  constructor (container: HTMLElement, actions?: IFormActions ) {
    super(container, actions);

    this.emailInputElement = ensureElement<HTMLInputElement>('[name="email"]', this.container);
    this.phoneInputElement = ensureElement<HTMLInputElement>('[name="phone"]', this.container);

    
    this.emailInputElement.addEventListener('change', () => {
      if (actions?.emailInputChangeHandler) {
        actions.emailInputChangeHandler(this.emailInputElement.value);
      }
    });
    this.phoneInputElement.addEventListener('change', () => {
      if (actions?.phoneInputChangeHandler) {
        actions.phoneInputChangeHandler(this.phoneInputElement.value);
      }
    });
  }

  set email(value: string) {
    this.emailInputElement.value = value;
  }

  set phone(value: string) {
    this.phoneInputElement.value = value;
  }
}