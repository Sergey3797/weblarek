import './scss/styles.scss';
import { Catalog } from './components/base/Models/Catalog';
import { apiProducts } from './utils/data';
import { Cart } from './components/base/Models/Cart';
import { Buyer } from './components/base/Models/Buyer';
import { LarekApi } from './components/network/network';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { IProduct } from './types';

function testModels(items: IProduct[]) {
    // протестировали каталог:
  const catalog = new Catalog();
  catalog.setAllProducts(items);
  console.log('Массив товаров из каталога:', catalog.getAllProducts());
  const someProduct = catalog.getProductById(items[2].id);
  console.log(`Товар по id: ${items[2].id}`, someProduct);
  console.log('Выбранный товар до выбора:', catalog.getSelectedProduct());
  if(someProduct) {
    catalog.setSelectedProduct(someProduct);
    console.log('выбранный товар после выбора:', catalog.getSelectedProduct());
  }
  //протестировали корзину:
  const cart = new Cart();
  console.log('корзина до добавления товаров:',cart.getProducts());
  const product1 = items[0];
  const product2 = items[1];
  const product3 = items[2];
  cart.addProduct(product1);
  cart.addProduct(product2);
  cart.addProduct(product3);
  console.log('корзина после добавления товаров:',cart.getProducts());
  cart.removeProduct(product2);
  console.log('удаляем этот товар из корзины:',product2);
  console.log('корзина после удаления товара:', cart.getProducts());
  console.log('общая стоимость товаров в корзине:', cart.getTotalPrice());
  console.log('количество товаров в корзине:', cart.getProductsAmount());
  console.log('проверяем наличие этого товара в корзине:', product1, cart.checkById(product1.id));
  cart.clear();
  console.log('корзина после полной очистки:', cart.getProducts());

  //протестировали покупателя:
  const buyer = new Buyer();
  console.log('результат валидации данных покупателя, когда покупатель полностью не заполнен:', buyer.validate());
  console.log('получение данных покупателя при не заполненом покупателе:');
  console.log(`получение данных при помощи отдельных методов: способ оплаты = ${buyer.getPayment()}, адрес = ${buyer.getAddress()}, телефон = ${buyer.getPhone()}, почта = ${buyer.getEmail()}`);
  console.log('получение данных при помощи общего метода:', buyer.getAllData());
  console.log('постепенное заполнение данных пользователя с промежуточными валидациями:');
  buyer.setPayment('cash');
  console.log('заполнили способ оплаты' ,buyer.validate());
  buyer.setAddress('тельмана 48к3');
  console.log('заполнили адрес' ,buyer.validate());
  buyer.setPhone('89990091438');
  console.log('заполнили телефон' ,buyer.validate());
  buyer.setEmail('fender3797@gmail.com');
  console.log('заполнили почту' ,buyer.validate());
  console.log('получение данных покупателя при полностью заполненом  покупателе:');
  console.log(`получение данных при помощи отдельных методов: способ оплаты = ${buyer.getPayment()}, адрес = ${buyer.getAddress()}, телефон = ${buyer.getPhone()}, почта = ${buyer.getEmail()}`);
  console.log('получение данных при помощи общего метода:', buyer.getAllData());
  buyer.clear();
  console.log('получение данных покупателя после очистки данных покупателя:');
  console.log(`получение данных при помощи отдельных методов: способ оплаты = ${buyer.getPayment()}, адрес = ${buyer.getAddress()}, телефон = ${buyer.getPhone()}, почта = ${buyer.getEmail()}`);
  console.log('получение данных при помощи общего метода:', buyer.getAllData());
  console.log('валидация данных покупателя после очистки данных покупателя:', buyer.validate());
}

console.log('=== тестирование на основе объекта заглушки apiProducts ===');

let products = apiProducts.items;

testModels(products);

const api = new Api(API_URL);
const larek = new LarekApi(api);
larek.getProductList().then((items) => {
  console.log('=== тестирование на основе на сонове данных сервера ===');
  products = items;
  testModels(products);
});

