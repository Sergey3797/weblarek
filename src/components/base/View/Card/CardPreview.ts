import { IProduct } from "../../../../types";
import { categoryMap, CDN_URL } from "../../../../utils/constants";
import { ensureElement } from "../../../../utils/utils";
import { Card, CategoryKey, ICardActions } from "./Card";

export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'description'>; 

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

    if(actions?.handleButtonClick) {
      this.purchaseButton.addEventListener('click', actions.handleButtonClick);
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
}