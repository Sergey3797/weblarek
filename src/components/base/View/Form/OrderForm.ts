import { ensureAllElements, ensureElement } from "../../../../utils/utils";
import { Form, IFormActions } from "./Form";

interface IOrderForm {
  payment: 'card' | 'cash' | '';
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected paymentButtons: HTMLButtonElement[];
  protected addressInputElement: HTMLInputElement;

  constructor(container: HTMLElement, actions?: IFormActions) {
    super(container, actions);
    const paymentButtonsContainer = ensureElement<HTMLDivElement>('.order__buttons', this.container);
    this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button', paymentButtonsContainer);
    this.addressInputElement = ensureElement<HTMLInputElement>('.form__input', this.container);
    
    this.paymentButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (actions?.paymentButtonClickHandler) {
          actions.paymentButtonClickHandler(button.name);
        }     
      })
    })

    if (actions?.addressInputChangeHandler) {
      this.addressInputElement.addEventListener('change', actions.addressInputChangeHandler);
    }
  }
  
  set payment(value: 'card' | 'cash' | '') {
    this.paymentButtons.forEach((button) => {
      if (button.name === value) {
        button.classList.add('button_alt-active');
      }else {
        button.classList.remove('button_alt-active')
      }
    })
  }

  set address(value: string) {
    this.addressInputElement.value = value;
  }
}