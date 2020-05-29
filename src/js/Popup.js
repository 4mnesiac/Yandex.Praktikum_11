export class Popup {
  constructor(popup) {
    this.popup = popup;
    this.closeHandler = () => this.close();
  }

  open() {
    this.popup.classList.add("popup_is-opened");
    this._setListeners();
  }

  _setListeners() {
    const closeButton = this.popup.querySelector(".popup__close");
    closeButton.addEventListener("click", this.closeHandler);
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
    this._removeListeners();
  }

  _removeListeners() {
    const closeButton = this.popup.querySelector(".popup__close");
    closeButton.removeEventListener("click", this.closeHandler);
  }
}
