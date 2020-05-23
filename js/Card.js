class Card {
  constructor(imagePreview, openPreview, api, myId) {
    this.imagePreview = imagePreview;
    this.openPreview = openPreview;
    this.api = api;
    this.myId = myId;
  }
  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  remove(elem, data) {
    if (confirm('Вы уверены, что хотите удалить карточку?')) {
      this._removeListeners();

      this.api.deleteCard(data._id);
      elem.closest(".place-card");
          // .then(() => {

          // })
          // // this.api.deleteCard(card.data._id)
          // //     .then(() => {
          // //       console.log(card.data.id)
          // //     })
          // .catch((err) => console.log(err))


    }
  }
  create(cardData) {
    const template = document.createElement("div");
    const bgElement = document.createElement("div");
    const removeButton = document.createElement("button");
    const cardDescription = document.createElement("div");
    const cardLikeContainer = document.createElement("div");
    const cardDescriptionTitle = document.createElement("h3");
    const cardLikeButton = document.createElement("button");
    const cardLikeCounter = document.createElement("span");


    template.classList.add("place-card");
    removeButton.classList.add("place-card__delete-icon");
    bgElement.classList.add("place-card__image");
    bgElement.setAttribute("style", `background-image: url("${cardData.link}")`);
    bgElement.setAttribute("data-url", `${cardData.link}`);
    if (cardData.owner._id === this.myId) {
      removeButton.classList.add('place-card__delete-icon_show');
    }

    cardDescription.classList.add("place-card__description");
    cardDescriptionTitle.classList.add("place-card__name");
    cardDescriptionTitle.textContent = `${cardData.name}`;
    cardLikeContainer.classList.add("place-card__like-container");
    cardLikeButton.classList.add("place-card__like-icon");
    cardLikeCounter.classList.add("place-card__like-counter");
    cardLikeCounter.textContent = cardData.likes.length;

    bgElement.appendChild(removeButton);
    cardDescription.appendChild(cardDescriptionTitle);
    cardDescription.appendChild(cardLikeContainer);
    cardLikeContainer.appendChild(cardLikeButton);
    cardLikeContainer.appendChild(cardLikeCounter);
    template.appendChild(bgElement);
    template.appendChild(cardDescription);

    this.template = template;
    this._setListeners.apply(this, this.template);
    this._removeListeners.bind(this);
    this.template.data = cardData;
    // this.api.getInitialCards().then((cardData) => {
    //   if (cardData.owner._id === this.myId) {
    //
    //     removeButton.classList.add('place-card__delete-icon');
    //     removeButton.addEventListener('click', (event) => {
    //
    // });

    return template;
  }

  bigImage(element) {
    this.imagePreview.setAttribute("src", element.dataset.url);
    this.openPreview();
  }

  _handlePreview = (event) => {
    this.bigImage(event.target);
  };

  _handleRemove = (event, data) => {
    event.stopPropagation();
    // if (confirm('fdfd')) {
    //           this.api.deleteCard(data._id)
    //               .then(() => {
                    this.remove(event.target, data)
            //       })
            //       .catch((err) => console.log(err));
            // }
          }



  _setListeners() {
    this.template
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.template
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", (event) =>
          this._handleRemove(event, this.template.data));
    this.template
      .querySelector(".place-card__image")
      .addEventListener("click", this._handlePreview);
  }
  _removeListeners() {
    this.template
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    this.template
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this._handleRemove);
    this.template
      .querySelector(".place-card__image")
      .removeEventListener("click", this.bigImage);
  }
}
