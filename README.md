# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные 

### Интерфейс товара

Интерфейс описывающий продукт

```typescript
interface IProduct {
  id: string;// идентефикатор товара 
  description: string;// описание товара 
  image: string;// картинка товара 
  title: string;// заголовок товара 
  category: string;// категория товара 
  price: number | null;// цена товара 
}
```

### Интерфейс покупателя 

Интерфейс описывающий покупателя 

```typescript
interface IBuyer {
  payment: TPayment;// способ оплаты 
  email: string; // электронная почта 
  phone: string; // телефон
  address: string; // адрес
}
```

### Интерфейс API

```typescript
type TApiGetProductsResponse = { // получаемые данные о списке товаров
  total: number; // количество товаров
  items: IProduct[]; // массив товаров
}

type TApiPostOrderResponse = TApiPostOrderResponseOk | TApiPostOrderResponseError; // получаемые данные о результате создания заказа

type TApiPostOrderResponseOk = { //получаемые данные о созданом заказе в случае успеха
  id: string; // идетификатор заказа
  total: number; // общая сумма заказа
}

type TApiPostOrderResponseError = { //получаемые данные о созданом заказе в случае ошибки 
  error: string; // текст ошибки
}

type TApiPostOrderRequest = { // отправляемые данные о создаваемом заказе
  payment: TPayment; // способ оплаты
  email: string; // почта 
  phone: string; // телефон
  address: string; // адрес
  total: number; // общая сумма заказа
  items: string[]; // массив идетификаторов товаров
}
```

### Остальные типы

```typescript
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
```

## Модели данных

### Класс покупателя

```typescript
//класс покупателя отвечающий за хранение всех данных покупателя, а так же их получение и изменение 
class Buyer {
  private payment: TPayment; //вид оплаты 
  private address: string; // адрес
  private phone: string; // телефон
  private email: string; // почта 

  constructor(protected events: IEvents) {}
  setPayment(payment: TPayment): void {} // сохранение данных вида оплаты  
  getPayment(): TPayment {} // получение данных вида опаты 
  setAddress(address: string): void {} //сохранение данных адресса 
  getAddress(): string {} // получение данных адресса
  setPhone(phone: string): void {} // сохранение телефона
  getPhone(): string {} // получение телефона
  setEmail(email: string): void {} // сохранение почты 
  getEmail(): string {} // получение почты 
  getAllData(): IBuyer {} // получение всех данных покупателя
  clear(): void {} // очистка данных покупателя
  validate(): TBuyerValidateErrors {} // валидация данных
}
```

### Класс каталога

```typescript
// класс каталога товаров отвечающий за хранение всех товаров каталога, хранение выбранного товара, а так же их получение и изменение  
class Catalog {
  private products: IProduct[]; // массив всех товаров в каталоге 
  private selectedProduct: IProduct | null; //  товар выбранный для подробного отображения
  constructor(protected events: IEvents) {}
  getAllProducts(): IProduct[] {} // получение массива товаров  
  setAllProducts(products: IProduct[]): void {} // сохранение массива товаров 
  getProductById(id: string): IProduct | null {} // получение товара по его id
  setSelectedProduct(product: IProduct): void {} // сохранение товара для подробного отображения
  getSelectedProduct(): IProduct | null {} // получение товара для подробного отображения
}
```

### Класс корзины

```typescript
// класс отвечающий за хранение списка товаров в корзине, его получение и изменение 
class Cart {
  private products: IProduct[]; // массив товаров выбранных покупателем для покупки 
  constructor(protected events: IEvents) {}
  getProducts(): IProduct[] {} // получение массива товаров, которые находятся в корзине
  addProduct(product: IProduct): void {} // добавление товара в корзину 
  removeProduct(product: IProduct): void {} // удаление товара из корзины 
  clear(): void {} // удаление всех товаров из корзины
  getTotalPrice(): number {} // получение стоимости всех товаров в корзине
  getProductsAmount(): number {} //получение количества товаров в корзине
  checkById(id: string): boolean {} // проверка наличия товара в корзине по его id 
}
```

## Слой коммуникации 

``` typescript
// класс отвечающий за коммуникацию с api weblarek
class LarekApi {
  private api: Api;
  constructor(api: Api) {}
  getProductList():Promise<IProduct[]> {} // получение массива всех товаров 
  postOrder(reqData:TApiPostOrderRequest): Promise<TApiPostOrderResponse> {} // отправка данных о заказе
}
```

## Представления

### Общий класс карточки товара

```typescript
// родительский класс для классов карточек товаров
class Card<T = {}> extends Component<ICard & T> { 
  protected titleElement: HTMLSpanElement | HTMLHeadingElement;
  protected priceElement: HTMLSpanElement;

  constructor(container: HTMLElement) {}

  set title(value: string) {}
  set price(value: number | null) {}
}
```

### Класс карточки товара в корзине

```typescript
// класс карточки товаров в корзине
class CardBasket extends Card<TCardBasket> {
  
  protected deleteButton: HTMLButtonElement;

  protected indexElement: HTMLSpanElement;

  constructor(container: HTMLElement, actions?: ICardActions) {}

  set index(value: number) {}
}
```

### Класс карточки товара в каталоге

```typescript
// класс карточки товара в каталоге
class CardCatalog extends Card<TCardCatalog>{ 
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container:HTMLElement, actions?: ICardActions) {}

  set category(value: string) {}
  
  set image(value: string) {}
}
```

### Класс карточки товара с подробностями

```typescript
// класс карточки товара с подробностями 
class CardPreview extends Card<TCardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLParagraphElement;
  protected purchaseButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {}

  set category(value: string) {}
    
  set image(value: string) {} 
  
  set description(value: string) {}

  set isInCart(value: boolean) {}

  override set price(value: number | null) {}
}
```

### Общий класс формы 

```typescript
// родительский класс для класса формы
class Form<T extends object> extends Component<IForm<T> & T> {
  protected errorsElement: HTMLSpanElement;
  protected submitButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IFormActions) {}

  set errors(value: {[key in keyof T]: string}) {}

  set isValid(value: boolean) {} 
}  
```

### Класс формы контакта 

```typescript
// класс формы контакта 
class ContactsForm extends Form<IContactsForm> {
  protected emailInputElement: HTMLInputElement;
  protected phoneInputElement: HTMLInputElement;

  constructor (container: HTMLElement, actions?: IFormActions ) {}

  set email(value: string) {}

  set phone(value: string) {}
}
```

### Класс формы заказа

```typescript
// класс формы заказа
class OrderForm extends Form<IOrderForm> {
  protected paymentButtons: HTMLButtonElement[];
  protected addressInputElement: HTMLInputElement;

  constructor(container: HTMLElement, actions?: IFormActions) {}
  
  set payment(value: 'card' | 'cash' | '') {}

  set address(value: string) {}
}
```

### Класс представления корзины

```typescript
// класс предстваления корзины
class Basket extends Component<IBasket> {
  protected titleElement: HTMLHeadingElement;
  protected totalPriceElement: HTMLSpanElement;
  protected listElement: HTMLUListElement;
  protected orderButtonElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {}

  set title(value: string) {}

  set totalPrice(value: number) {}

  set items(value: HTMLElement[]) {}
}
```

### Класс представления каталога

```typescript
// класс представления каталога
class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {}
  
  set catalog(items:HTMLElement[]) {}
}
```

### Класс шапки сайта

```typescript
// класс шапки сайта 
class Header extends Component<IHeader> {
  protected counterElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {}

  set counter(value: number) {}
}
```
### Класс модального окна 

```typescript
// класс модального окна 
class Modal extends Component<IModal> {
  protected contentElement: HTMLDivElement;
  protected closeButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement){}

  open() {}

  close() {}
  
  set content(value: HTMLElement | HTMLElement[] | null) {}
}
```

### Класс сообщения об успешном заказе

```typescript
// класс сообщения об успешном заказе
class Success extends Component<ISuccess> {
  protected descriptionElement: HTMLParagraphElement;
  protected successButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ISuccessActions) {}

  set orderPrice(value: number) {}
}
```

## События

```typescript
enum EventEnum {
  OpenBasket = 'basket:open',
  CloseModal = 'modal:close',
  LarekApiGetProductList = 'larekApi:getProductList',
  BuyerSetPayment = 'buyerModel:setPayment', 
  BuyerSetAddress = 'buyerModel:setAddress',
  BuyerSetPhone = 'buyerModel:setPhone',
  BuyerSetEmail = 'buyerModel:setEmail',
  BuyerClearData = 'buyerModel:clearData',
  BuyerValidate = 'buyerModel:validate',
  CartAddProduct = 'cartModel:add',
  CartRemoveProduct = 'cartModel:remove',
  CartClear = 'cartModel:clear',
  CatalogSetAllProducts = 'catalogModel:setAll',
  CatalogSetSelectedProduct = 'catalogModel:setSelected',
  CardCatalogClick = 'cardCatalog:click',
  CardPreviewButtonClick = 'cardPreview:buttonClick',
  CardPreviewPurchase = 'cardPreview:purchase',
  CardPreviewDelete = 'cardPreview:delete',
  CardBasketDelete = 'cardBasket:delete',
  BasketOrderButtonClick = 'basket:orderButtonClick',
  OrderFormValidated = 'orderForm:validated',
  OrderFormSubmit = 'orderForm:submit',
  OrderFormChangePayment = 'orderForm:changePayment',
  OrderFormChangeAddress = 'orderForm:changeAddress',
  ContactsFormValidated = 'contactsForm:validated',
  ContactsFormSubmit = 'contactsForm:submit',
  ContactsFormChangeEmail = 'contactsForm:changeEmail',
  ContactsFormChangePhone = 'contactsForm:changePhone',
  SuccessSubmit = 'success:submit',
} 
```

## Презентер 

Код презентера реализован в основном скрипте приложения (main.ts)


