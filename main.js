//1. Global Variables
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
const userAvatar = document.querySelector(".user-info__photo");
const likeCounter = document.querySelector(".place-card__like-counter");
const imagePreview = document.querySelector(".popup__image");
const pageName = document.querySelector(".user-info__name");
const pageJob = document.querySelector(".user-info__job");
const editSubmitButton = editForm.querySelector("button");
const addCardSubmitButton = addCardForm.querySelector("button");
const editFormValidator = new FormValidator(document.forms.edit, errorMessages);
const addCardFormValidator = new FormValidator(
  document.forms.new,
  errorMessages
);
const config = {
  baseUrl: "https://praktikum.tk/",
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
const cardList = new CardList(placesList, api, newUserCard, myId);

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

//// надо исправить. Перенести в класс и вызывать из класса
//// api.getInitialCards();

/** 
 * Здравствуйте. Очень хорошая работа и реализация класса Api
 * Но в некоторых методах вы создали реализацию которая должна быть в классах которые вы создавали в 8 спринте
 * Так же в текущем файле функции и вызов методов класса API надо перенести в классы и вызывать от туда, где необходимо.
 * 
 * Взаимодействие между классами и методом Api примерно должно получиться таким:
      const container = document.querySelector('.places-list'); // место куда записывать карточки
      const cards = []; // массив с карточками
      const words = {ru: { validationLenght: 'Должно быть от 2 до 30 символов'}};
      const config = {authorization: "ключ",ip: "http://95.216.175.5/cohort7",}; // настройки
      const api = new Api(config);
      const card = new Card(api);
      const validation = new FormValidator({words:words});
      const cardList = new CardList({card:card, api:api});
      cardList.render(container, cards);
      const popupCard = new PopupCard({ validation:validation,api:api});
      const popupProfile = new PopupProfile({ validation:validation,api:api});
      const popupImage = new PopupImage();
  *
 *  
  *
  * // Объявляете новый класс
  * const api = new Api(config);
  *
  * // при инициализации класса Card вы передаёте в качестве параметров класс api
  * const card = new Card(api); // это для того чтобы вызывая методы лайка, дизлайка, вызывать методы класса api передавая на сервер информацию
  *
  * // при инициализации класса CardList вы передаёте в качестве параметров класс api
  *  const cardList = new CardList(document.querySelector(".places-list"), card, api); // это для того чтобы вызывая методы добавления карточек вызывать методы класса api для получения информации на  сервере
  *
  * // Тоже самое с классом Popup, но там только при изменении профиля, функционал добавления  карточки через Popup остаётся
  * // при условии использования класса Card
  *
  *
  * 	
    * Класс Api это отдельный класс, который ничего не знает о других классах и методах
    * Вы можете только получать данные из этого класса и использовать эти данные.
    * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
    * предварительно скажу, что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
    * Который только возвращает/записывает данные, а вы можете получить только обращаясь к этим методам.
    * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратиться к методам сервера или базы.
    * Получается отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
    * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.
    
 * 
 * 
 */
