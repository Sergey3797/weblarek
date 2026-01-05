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
import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardCatalog } from './components/base/View/Card/CardCatalog';
import { Modal } from './components/base/View/Modal';
import { CardPreview } from './components/base/View/Card/CardPreview';
import { CardBasket } from './components/base/View/Card/CardBasket';

const events = new EventEmitter();
const catalogContainer = ensureElement<HTMLElement>('.gallery');
const gallery = new Gallery(events, catalogContainer);
const api = new Api(API_URL);
const larekApi = new LarekApi(api);
const productModel = new Catalog();
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const modalContainer = ensureElement<HTMLDivElement>('#modal-container');
const modal = new Modal(events, modalContainer);

larekApi.getProductList().then((data) =>{
  productModel.setAllProducts(data);
  const products = productModel.getAllProducts();
  const itemCards = products.map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate));
    return card.render(item);
  })
  gallery.render({
    catalog: itemCards,
  });

  const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate));
  const testCardPreview = cardPreview.render(products[1]);

  const cardBasketArr = [];
  for (let i = 0; i < 5; i++) {
    const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate));
    cardBasketArr.push(cardBasket.render({
      index: i,
      ...products[i],
    }));
  }
  modal.render({content: cardBasketArr});
  modal.open();
}).catch();



