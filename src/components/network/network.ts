import { IProduct, TApiGetProductsResponse, TApiPostOrderRequest, TApiPostOrderResponse } from "../../types";
import { Api } from "../base/Api";

// класс отвечающий за коммуникацию с api weblarek
export class LarekApi {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }
  getProductList():Promise<IProduct[]> { // получение массива всех товаров 
    return this.api.get<TApiGetProductsResponse>('/product').then((data) => data.items);
  }
  postOrder(reqData:TApiPostOrderRequest): Promise<TApiPostOrderResponse> { // отправка данных о заказе
    return this.api.post<TApiPostOrderResponse>('/order', reqData);
  }
}