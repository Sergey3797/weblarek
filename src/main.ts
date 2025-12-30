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


const events = new EventEmitter();
const catalogContainer = ensureElement<HTMLElement>('.gallery');
const gallery = new Gallery(events, catalogContainer);
const api = new Api(API_URL);
const larekApi = new LarekApi(api);
const productModel = new Catalog();
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

larekApi.getProductList().then((data) =>{
  productModel.setAllProducts(data);
  const itemCards = productModel.getAllProducts().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate));
    return card.render(item);
  })
  gallery.render({
    catalog: itemCards,
  })
}).catch();



