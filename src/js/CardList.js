import {cardList} from "./index.js";

export class CardList {
  constructor(container, api, func, myId) {
    this.container = container;
    this.func = func;
    this.api = api;
    this.myId = myId
  }
  addCard(cardData) {
    const card = this.func();
    this.container.appendChild(card.create(cardData));
  }
  render(array) {
    for (const elem of array) {
      this.addCard(elem);
    }
  }
  getCards() {
    this.api.getInitialCards().then((result) => {
      this.render.bind(cardList);
      this.render(result);
    });
  }
  addUserCard(event, form, popup) {
    event.preventDefault();
    const title = form.elements.name.value;
    const image = form.elements.link.value;
    const newCard = [
      {
        name: title,
        link: image,
        likes: [],
        owner: {
          _id: this.myId,
        }
      },
    ];
    this.render(newCard);
    this.api.postUserCard(title, image);
    popup.close();
  }
}
