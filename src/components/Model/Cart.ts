import { IProduct } from "../../types";
import { EventEnum, IEvents } from "../base/Events";

// класс отвечающий за хранение списка товаров в корзине, его получение и изменение 

export class Cart {
  private products: IProduct[] = []; // массив товаров выбранных покупателем для покупки 
  
  constructor(protected events: IEvents) {}
  getProducts(): IProduct[] { // получение массива товаров, которые находятся в корзине
    return this.products;
  }
  addProduct(product: IProduct): void { // добавление товара в корзину 
    this.products.push(product);
    this.events.emit(EventEnum.CartAddProduct, {product});
  }
  removeProduct(product: IProduct): void { // удаление товара из корзины 
    this.products = this.products.filter((item) => item !== product);
    this.events.emit(EventEnum.CartRemoveProduct, {product});
  }
  clear(): void { // удаление всех товаров из корзины
    this.products = [];
    this.events.emit(EventEnum.CartClear);
  }
  getTotalPrice(): number { // получение стоимости всех товаров в корзине
    const totalPrice = this.products.reduce((prev, item) => (item.price ?? 0) + prev, 0);
    return totalPrice;
  }
  getProductsAmount(): number { //получение количества товаров в корзине
    return this.products.length;
  }
  checkById(id: string): boolean { // проверка наличия товара в корзине по его id 
    const index = this.products.findIndex((item) => item.id === id);
    return index !== -1;
  }
}