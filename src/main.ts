import './scss/styles.scss';
import { Catalog } from './components/base/Model/Catalog';
import { Cart } from './components/base/Model/Cart';
import { Buyer } from './components/base/Model/Buyer';
import { LarekApi } from './components/network/network';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { IProduct, TBuyerValidateErrors, TPayment } from './types';
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
import { Header } from './components/base/View/Header';

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

const catalogContainer = ensureElement<HTMLElement>('.gallery');
const modalContainer = ensureElement<HTMLDivElement>('#modal-container');
const headerContainer = ensureElement<HTMLElement>('.header');

const events = new EventEmitter();
const catalogModel = new Catalog(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const gallery = new Gallery(events, catalogContainer);
const modal = new Modal(events, modalContainer);
const header = new Header(events, headerContainer);
const basket = new Basket(events ,cloneTemplate(basketTemplate));
const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
  purchaseButtonClickHandler: () => {
    const selectedProduct = catalogModel.getSelectedProduct();
    if(selectedProduct) {
      if(cartModel.checkById(selectedProduct.id)) {
        events.emit(EventEnum.CardPreviewDelete, {product: selectedProduct});
      }else {
        events.emit(EventEnum.CardPreviewPurchase, {product: selectedProduct});
      }
    }
    modal.close();
  }});
const orderForm  = new OrderForm(cloneTemplate(orderFormTemplate), {
  paymentButtonClickHandler: (payment) => {
    buyerModel.setPayment(payment);
  },
  addressInputChangeHandler: (address) => {
    buyerModel.setAddress(address);
  },
  submitButtonClickHandler: () => {
    events.emit(EventEnum.OrderFormSubmit);
  }
});
const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate), {
  emailInputChangeHandler: (email) => {
    buyerModel.setEmail(email);
  }, 
  phoneInputChangeHandler: (phone) => {
    buyerModel.setPhone(phone);
  },
  submitButtonClickHandler: () => {
    events.emit(EventEnum.ContactsFormSubmit);
  }
});
const success = new Success(cloneTemplate(successTemplate), {
  successButtonClickHandler: () => {
    events.emit(EventEnum.SuccessSubmit);
  }
});

larekApi.getProductList().then((data) =>{
  catalogModel.setAllProducts(data);
}).catch();

// подписываемся на событие закрытия модального окна
events.on(EventEnum.CloseModal, () => {
  modal.close();
})

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
  catalogModel.setSelectedProduct(product); 
});

// подписываемся на событие выбора товара для подробного отображения 
events.on<{product: IProduct}>(EventEnum.CatalogSetSelectedProduct, ({product}) => {
  const isInCart = cartModel.checkById(product.id);
  const preview = cardPreview.render({...product, isInCart});
  modal.render({content: preview});
  modal.open();
});

// подписываемся на событие клика по кнопке купить в подробной карточке товара
events.on<{product: IProduct}>(EventEnum.CardPreviewPurchase, ({product}) =>{
  cartModel.addProduct(product);
});

// подписываемся на событие добавления товара в корзину
events.on<{product: IProduct}>(EventEnum.CartAddProduct, () =>{
  header.render({counter: cartModel.getProductsAmount()});
});

// подписываемся на событие клика по кнопке удалить в подробной карточке товара
events.on<{product: IProduct}>(EventEnum.CardPreviewDelete, ({product}) =>{
  cartModel.removeProduct(product);
});

// подписываемся на событие удаления товара из корзины
events.on<{product: IProduct}>(EventEnum.CartRemoveProduct, () =>{
  header.render({counter: cartModel.getProductsAmount()});
});

// подписываемся на событие открытия корзины
events.on(EventEnum.OpenBasket, () => {
  const cardBasketArr = cartModel.getProducts().map((item, index) => {
    const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
      deleteButtonClickHandler: () => {
        events.emit(EventEnum.CardBasketDelete, {product: item});
      }
    });
    return cardBasket.render({...item, index: index + 1});
  });
  modal.render({content: basket.render({items: cardBasketArr, totalPrice: cartModel.getTotalPrice()})});
  modal.open();
});

// подписываемся на событие удаления товара из корзины когда находимся в корзине
events.on<{product: IProduct}>(EventEnum.CardBasketDelete, ({product}) => {
  cartModel.removeProduct(product);
  const cardBasketArr = cartModel.getProducts().map((item, index) => {
    const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
      deleteButtonClickHandler: () => {
        events.emit(EventEnum.CardBasketDelete, {product: item});
      }
    });
    return cardBasket.render({...item, index: index + 1});
  });
  modal.render({content: basket.render({items: cardBasketArr, totalPrice: cartModel.getTotalPrice()})});
});

// подписываемся на событие клика по кнопке офрмить в корзине
events.on(EventEnum.BasketOrderButtonClick, () => {
  buyerModel.clear();
  modal.render({content: orderForm.render({
    payment: '', 
    address: '',
    errors: {},
    isValid: false,
  })})
});

// подписываемся на событие сохранения способа оплаты в моделе покупателя 
events.on<{payment: TPayment}>(EventEnum.BuyerSetPayment, () => {
  const errors = buyerModel.validate();
    const requiredErrors = Object.fromEntries(Object.entries(errors).filter((error) => {
      const fieldsToCheck = ['payment', 'address'];
      return fieldsToCheck.includes(error[0]);
    }));
    events.emit(EventEnum.OrderFormValidated, {errors: requiredErrors}); 
});

// подписываемся на событие сохранения адреса в моделе покупателя 
events.on<{address: string}>(EventEnum.BuyerSetAddress, () => {
  const errors = buyerModel.validate();
    const requiredErrors = Object.fromEntries(Object.entries(errors).filter((error) => {
      const fieldsToCheck = ['payment', 'address'];
      return fieldsToCheck.includes(error[0]);
    }));
    events.emit(EventEnum.OrderFormValidated, {errors: requiredErrors}); 
})

// подписываемся на событие валидации формы заказа
events.on<{errors: TBuyerValidateErrors}>(EventEnum.OrderFormValidated, ({errors}) => {
  const isValid = !('payment' in errors) && !('address' in errors);
  modal.render({content: orderForm.render({
    payment: buyerModel.getPayment(), 
    address: buyerModel.getAddress(),
    errors,
    isValid,
  })})
});

// подписываемся на события подтверждения формы заказа
events.on(EventEnum.OrderFormSubmit, () => {
  modal.render({content: contactsForm.render({
    email: '', 
    phone: '',
    errors: {},
    isValid: false,
  })})
});

// подписываемся на событие сохранение почты в моделе покупателя 
events.on<{email: string}>(EventEnum.BuyerSetEmail, () => {
  const errors = buyerModel.validate();
    const requiredErrors = Object.fromEntries(Object.entries(errors).filter((error) => {
      const fieldsToCheck = ['email', 'phone'];
      return fieldsToCheck.includes(error[0]);
    }));
    events.emit(EventEnum.ContactsFormValidated, {errors: requiredErrors}); 
});

// подписываемся на событие сохранения телефона в моделе покупателя 
events.on<{phone: string}>(EventEnum.BuyerSetPhone, () => {
  const errors = buyerModel.validate();
    const requiredErrors = Object.fromEntries(Object.entries(errors).filter((error) => {
      const fieldsToCheck = ['email', 'phone'];
      return fieldsToCheck.includes(error[0]);
    }));
    events.emit(EventEnum.ContactsFormValidated, {errors: requiredErrors}); 
});

// подписываемся на событие валидации формы контакта
events.on<{errors: TBuyerValidateErrors}>(EventEnum.ContactsFormValidated, ({errors}) => {
  const isValid = !('email' in errors) && !('phone' in errors);
  modal.render({content: contactsForm.render({
    email: buyerModel.getEmail(), 
    phone: buyerModel.getPhone(),
    errors,
    isValid,
  })})
});

// подписываемся на событие подтверждения формы контакта
events.on(EventEnum.ContactsFormSubmit, () => {
  const data = buyerModel.getAllData();
  const ids = cartModel.getProducts().map(item => item.id);
  larekApi.postOrder({
    ...data,
    total: cartModel.getTotalPrice(),
    items: ids,
  }).then((res) => {
    if('total' in res) {
      modal.render({content: success.render({orderPrice: res.total})});
      modal.open();
    }
  }).catch();
  buyerModel.clear();
  cartModel.clear();
  modal.close();
});

// подписываемся на событие подтверждения успешного заказа
events.on(EventEnum.SuccessSubmit, () => {
  modal.close();
});

// подписываемся на собитие отчистки корзины
events.on(EventEnum.CartClear, () => {
  header.render({counter: cartModel.getProductsAmount()});
});

