import { IFormActions, IOrderForm, TPayment } from "../../../../types";
import { ensureAllElements, ensureElement } from "../../../../utils/utils";
import { Form } from "./Form";

// класс формы заказа
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
          actions.paymentButtonClickHandler(button.name as TPayment);
        }     
      })
    })

    this.addressInputElement.addEventListener('change', () => {
      if (actions?.addressInputChangeHandler) {
        actions.addressInputChangeHandler(this.addressInputElement.value);
      }  
    });
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