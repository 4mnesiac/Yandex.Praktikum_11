import {Card} from "./Card.js";
import {CardList} from "./CardList.js";
import {FormValidator} from "./FormValidator.js";
import {Popup} from "./Popup.js";
import {UserInfo} from "./UserInfo.js";
import {Api} from "./Api.js";
import "../style.css";
const isDev = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV === 'development');
const placesList = document.querySelector(".places-list");
const addUserCardButton = document.querySelector(".user-info__button");
const editPopup = document.querySelector(".popup_edit");
const editInfoButton = document.querySelector(".user-info__edit-button");
const editForm = document.querySelector(".popup__form_edit");
const imagePopup = document.querySelector(".popup_type_image");
const addCardPopup = document.querySelector(".popup_add-card");
const addCardForm = document.querySelector(".popup__form_add-card");
const errorMessages = {
  valueMissing: "Это обязательное поле",
  tooShort: "Должно быть от 2 до 30 символов",
  typeMismatch: "Здесь должна быть ссылка",
};
export const userAvatar = document.querySelector(".user-info__photo");
const likeCounter = document.querySelector(".place-card__like-counter");
const imagePreview = document.querySelector(".popup__image");
export const pageName = document.querySelector(".user-info__name");
export const pageJob = document.querySelector(".user-info__job");
const editSubmitButton = editForm.querySelector("button");
const addCardSubmitButton = addCardForm.querySelector("button");
const editFormValidator = new FormValidator(document.forms.edit, errorMessages);
const addCardFormValidator = new FormValidator(
  document.forms.new,
  errorMessages
);
const config = {
  baseUrl: (isDev ? "http://praktikum.tk/" : "https://praktikum.tk/"),
  cohort: "cohort10",
  headers: {
    authorization: "6d33a112-40c4-409c-8bfb-6d7bc0787a0d",
    "Content-Type": "application/json",
  },
};
const api = new Api(config);
const myId = 'fa91e9f5cea1e3a1cbb8142d';
const editPopupInstance = new Popup(editPopup);
const cardPopupInstance = new Popup(addCardPopup);
const imagePopupInstance = new Popup(imagePopup);
const openPreview = () => imagePopupInstance.open();
const newUserCard = () => new Card(imagePreview, openPreview, api, myId);
const userInfoInstance = new UserInfo(
  pageName,
  pageJob,
  api,
  editPopupInstance
);
export const cardList = new CardList(placesList, api, newUserCard, myId);

// Listeners
editInfoButton.addEventListener("click", () => editPopupInstance.open());
addUserCardButton.addEventListener("click", () => cardPopupInstance.open());
editInfoButton.addEventListener("click", (event) =>
  editFormValidator.setDefault(event, editSubmitButton)
);
addUserCardButton.addEventListener("click", (event) =>
  addCardFormValidator.setDefault(event, addCardSubmitButton)
);
editForm.addEventListener("submit", (event) =>
  userInfoInstance.getFormValues(event, editForm, editPopupInstance)
);
addCardForm.addEventListener("submit", (event) =>
  cardList.addUserCard(event, addCardForm, cardPopupInstance)
);

// Calls
editFormValidator.setEventListeners();
addCardFormValidator.setEventListeners();
userInfoInstance.getInfo();
cardList.getCards();

