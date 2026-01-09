import { categoryMap } from "../utils/constants";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TApiGetProductsResponse = {
  total: number;
  items: IProduct[];
}

export type TApiPostOrderResponse = TApiPostOrderResponseOk | TApiPostOrderResponseError;

export type TApiPostOrderResponseOk = {
  id: string;
  total: number;
}

export type TApiPostOrderResponseError = {
  error: string;
}

export type TApiPostOrderRequest = {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
} 

export type TPayment = 'card' | 'cash' | '';

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
} 

export type TBuyerValidateErrors = {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export type CategoryKey = keyof typeof categoryMap;

export interface ICardActions {
  onClick?: () => void;
  purchaseButtonClickHandler?: () => void;
  deleteButtonClickHandler?: () => void;
}

export interface ICard {
  title: string;
  price: number | null;
}

export type TCardBasket = {
  index: number;
}

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>

export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'description'> & {isInCart: boolean}

export interface IFormActions {
  submitButtonClickHandler?: () => void;
  paymentButtonClickHandler?: (payment: TPayment) => void;
  addressInputChangeHandler?: (address: string) => void;
  emailInputChangeHandler?: (email: string) => void;
  phoneInputChangeHandler?: (phone: string) => void;
}

export interface IForm<T> {
  errors: {[key in keyof T]?: string};
  isValid: boolean;
}

export interface IContactsForm {
  email: string;
  phone: string;
}

export interface IOrderForm {
  payment: 'card' | 'cash' | '';
  address: string;
}

export interface IBasket {
  items: HTMLElement[];
  totalPrice: number;
  title?: string;
}

export interface IGallery {
  catalog: HTMLElement[];
}

export interface IHeader {
  counter: number;
}

export interface IModal {
  content: HTMLElement | HTMLElement[]
}

export interface ISuccess {
  orderPrice: number;
}

export interface ISuccessActions {
  successButtonClickHandler?: () => void;
}