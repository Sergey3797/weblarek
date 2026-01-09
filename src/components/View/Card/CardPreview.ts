import { CategoryKey, ICardActions, TCardPreview } from "../../../types";
import { categoryMap, CDN_URL } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

// класс карточки товара с подробностями 
export class CardPreview extends Card<TCardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLParagraphElement;
  protected purchaseButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.descriptionElement = ensureElement<HTMLParagraphElement>('.card__text', this.container);
    this.purchaseButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if(actions?.purchaseButtonClickHandler) {
      this.purchaseButton.addEventListener('click', actions.purchaseButtonClickHandler);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for(const key in  categoryMap) {
      this.categoryElement.classList.toggle(categoryMap[key as CategoryKey], key === value)
    }
  }
    
  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  } 
  
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set isInCart(value: boolean) {
    if (!this.purchaseButton.disabled) {
      if (value) {
        this.purchaseButton.textContent = 'Удалить из корзины';
      }else {
        this.purchaseButton.textContent = 'Купить';
      }
    }
  }

  override set price(value: number | null) {
    if (value) {
      this.purchaseButton.disabled = false;
    }else {
      this.purchaseButton.textContent = 'Недоступно';
      this.purchaseButton.disabled = true;
    }
    super.price = value;
  }
}