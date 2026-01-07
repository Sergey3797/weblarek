import { IBuyer, TBuyerValidateErrors, TPayment } from "../../../types";
import { EventEnum, IEvents } from "../Events";

//класс покупателя отвечающий за хранение всех данных покупателя, а так же их получение и изменение 
export class Buyer {
  private payment: TPayment = ''; //вид оплаты 
  private address: string = ''; // адрес
  private phone: string = ''; // телефон
  private email: string = ''; // почта 

  constructor(protected events: IEvents) {}
  setPayment(payment: TPayment): void { // сохранение данных вида оплаты 
    this.payment = payment;
    this.events.emit(EventEnum.BuyerSetPayment, {payment});
  }
  getPayment(): TPayment { // получение данных вида опаты 
    return this.payment;
  }
  setAddress(address: string): void { //сохранение данных адресса 
    this.address = address;
    this.events.emit(EventEnum.BuyerSetAddress, {address});
  }
  getAddress(): string { // получение данных адресса
    return this.address;
  }
  setPhone(phone: string): void { // сохранение телефона
    this.phone = phone;
    this.events.emit(EventEnum.BuyerSetPhone, {phone});
  }
  getPhone(): string { // получение телефона
    return this.phone;
  }
  setEmail(email: string): void { // сохранение почты 
    this.email = email;
    this.events.emit(EventEnum.BuyerSetEmail, {email});
  }
  getEmail(): string { // получение почты 
    return this.email;
  }
  getAllData(): IBuyer { // получение всех данных покупателя
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }
  clear(): void { // очистка данных покупателя
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
    this.events.emit(EventEnum.BuyerClearData);
  }
  validate(): TBuyerValidateErrors { // валидация данных
    const errorsObj: TBuyerValidateErrors = {};
    
    if(this.payment === '') {
      errorsObj.payment = 'Не выбран вид оплаты';
    }
    if(this.address === '') {
      errorsObj.address = 'укажите адрес';
    }
    if(this.phone === '') {
      errorsObj.phone = 'укажите телефон';
    }
    if(this.email === '') {
      errorsObj.email = 'укажите почту';
    }
    this.events.emit(EventEnum.BuyerValidate, errorsObj);
    return errorsObj;
  }
}