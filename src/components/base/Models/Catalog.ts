import { IProduct } from "../../../types";

// класс каталога товаров отвечающий за хранение всех товаров каталога, хранение выбранного товара, а так же их получение и изменение  
export class Catalog {
  private products: IProduct[]; // массив всех товаров в каталоге 
  private selectedProduct: IProduct | null; //  товар выбранный для подробного отображения
  
  constructor(products?: IProduct[], selectedProduct?: IProduct | null) {
    this.products = products ?? [];
    this.selectedProduct = selectedProduct ?? null;
  }
  getAllProducts(): IProduct[] { // получение массива товаров 
    return this.products;
  }
  setAllProducts(products: IProduct[]): void { // сохранение массива товаров 
    this.products = products.slice();
  }
  getProductById(id: string): IProduct | null { // получение товара по его id
    const product = this.products.find((item) => item.id === id)?? null;
    return product;
  }
  setSelectedProduct(product: IProduct): void { // сохранение товара для подробного отображения
    this.selectedProduct = product;
  }
  getSelectedProduct(): IProduct | null { // получение товара для подробного отображения
    return this.selectedProduct;
  }
}