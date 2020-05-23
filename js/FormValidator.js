class FormValidator {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    this.inputs = [];
  }

  setEventListeners() {
    const inputs = Array.from(this.form.querySelectorAll("input"));
    this.inputs = inputs;
    const button = this.form.querySelector("button");
    this.form.addEventListener("input", () => this._validate(inputs, button));
  }

  setSubmitButtonState(isValidForm, button) {
    if (isValidForm) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", true);
    }
  }

  _validate(inputs, button) {
    const isValidForm = inputs.reduce(
      (acc, input) => this.checkInputValidity(input) && acc,
      true
    );
    this.setSubmitButtonState(isValidForm, button);
  }

  checkInputValidity(element) {
    const error = element.nextElementSibling;
    if (element.validity.valueMissing) {
      this._activateError(element, error);
      error.textContent = this.errorMessages.valueMissing;
      return false;
    }
    if (element.validity.tooShort || element.validity.tooLong) {
      this._activateError(element, error);
      error.textContent = this.errorMessages.tooShort;
      return false;
    }
    if (element.validity.typeMismatch) {
      this._activateError(element, error);
      error.textContent = this.errorMessages.typeMismatch;
      return false;
    }
    this._resetError(element, error);
    return true;
  }

  _activateError(element, error) {
    error.classList.add("popup__error_active");
    element.classList.add("popup__input_has-error");
  }

  _resetError(element, error) {
    element.classList.remove("popup__input_has-error");
    error.textContent = "";
    error.classList.remove("popup__error_active");
  }

  setDefault(event, button) {
    button.setAttribute("disabled", true);
    this.inputs.forEach((element) => {
      this._resetError(element, element.nextElementSibling);
    });
    if (this.form.name === "edit") {
      this.form.elements.user.value = pageName.textContent;
      this.form.elements.job.value = pageJob.textContent;
    }
    if (event.target.classList.contains("user-info__button")) {
      this.form.reset();
    }
  }
}
