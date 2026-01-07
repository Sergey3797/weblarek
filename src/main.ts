import './scss/styles.scss';
import { Catalog } from './components/base/Model/Catalog';
import { apiProducts } from './utils/data';
import { Cart } from './components/base/Model/Cart';
import { Buyer } from './components/base/Model/Buyer';
import { LarekApi } from './components/network/network';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { IProduct } from './types';
import { Gallery } from './components/base/View/Gallery';
import { EventEmitter, EventEnum } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardCatalog } from './components/base/View/Card/CardCatalog';
import { Modal } from './components/base/View/Modal';
import { CardPreview } from './components/base/View/Card/CardPreview';
import { CardBasket } from './components/base/View/Card/CardBasket';
import { Basket } from './components/base/View/Basket';
import { OrderForm } from './components/base/View/Form/OrderForm';
import { ContactsForm } from './components/base/View/Form/ContactsForm';
import { Success } from './components/base/View/Success';

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

const catalogContainer = ensureElement<HTMLElement>('.gallery');
const modalContainer = ensureElement<HTMLDivElement>('#modal-container');

const events = new EventEmitter();
const productModel = new Catalog(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const gallery = new Gallery(events, catalogContainer);
const modal = new Modal(events, modalContainer);
const basket = new Basket(cloneTemplate(basketTemplate));
const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate));
const orderForm  = new OrderForm(cloneTemplate(orderFormTemplate));
const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate));
const success = new Success(cloneTemplate(successTemplate));

larekApi.getProductList().then((data) =>{
  productModel.setAllProducts(data);
  
  

  // const testCardPreview = cardPreview.render(products[1]);

  // const cardBasketArr: HTMLElement[] = [];
  // for (let i = 0; i < 5; i++) {
  //   const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate));
  //   cardBasketArr.push(cardBasket.render({
  //     index: i,
  //     ...products[i],
  //   }));
  // }

  // const basketElement = basket.render({
  //   totalPrice: 12345,
  //   items: cardBasketArr, 
  // }) 
  // const testOrderForm = orderForm.render({
  //   errors: {payment: 'строка', address: 'адрес'},
  //   payment: 'cash',
  //   address: '',
  // })
  // const testContactsForm = contactsForm.render({
    
  //   phone: '103912039',
  //   email: 'jd917ghd179',
  // })

  const testSuccess = success.render({
    orderPrice: 100,
  })
  modal.render({content: testSuccess});
  modal.open();
}).catch();


// Подписываемся на событие сохранения всех товаров в модели каталога
events.on<{products: IProduct[]}>(EventEnum.CatalogSetAllProducts, ({products}) => {
  const itemCards = products.map((item) => {
    const onClick = () => {
      events.emit(EventEnum.CardCatalogClick, {product: item});
    };
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {onClick});
    return card.render(item);
  })
  gallery.render({
    catalog: itemCards,
  });
});

// подписываемся на событие клика по карточке товара в каталоге 
events.on<{product: IProduct}>(EventEnum.CardCatalogClick, ({product}) => {
  const preview = cardPreview.render(product);
  modal.render({content: preview});
  modal.open();
});
