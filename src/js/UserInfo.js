import { userAvatar, pageJob, pageName } from "./index.js";

export class UserInfo {
  constructor(pageName, pageJob, api) {
    this.pageName = pageName;
    this.pageJob = pageJob;
    this.formName = "";
    this.formJob = "";
    this.api = api;
  }
  getInfo() {
    // получаем и рендерим информацию о пользователе (аватар, имя, о себе)
    this.api.getUserInfo()
      .then(function (result) {
        userAvatar.setAttribute("style", `background-image: ${result.avatar}`);
        pageName.textContent = result.name;
        pageJob.textContent = result.about;
      });
  }
  updateUserInfo() {
    this.pageName.textContent = this.formName;
    this.pageJob.textContent = this.formJob;
    this.api.patchUserInfo(this.formName, this.formJob);
  }
  updateUserAvatar(avatar) {
    // TODO реализовать смену аватара
    console.log(avatar, this.api)
    // this.api.patchUserAvatar(avatar);
  }

  setUserInfo(formNameValue, formJobValue, formAvatarValue) {
    if (formAvatarValue) {
      console.log(formAvatarValue, '1');
      userAvatar.setAttribute("style", `background-image: ${formAvatarValue}`)
      // this.updateUserAvatar(formAvatarValue);
    }
    this.formName = formNameValue;
    this.formJob = formJobValue;
    this.updateUserInfo();


  }

  getFormValues(event, form, popup) {
    event.preventDefault();
    if (form.elements.link) {
      const formAvatarValue = form.elements.link.value;
      this.setUserInfo(formAvatarValue);
      console.log(formAvatarValue, '2');
    } else {
      const formNameValue = form.elements.user.value;
      const formJobValue = form.elements.job.value;
      this.setUserInfo(formNameValue, formJobValue);
    }
    popup.close();
  }
}
//TODO: не видит api? значение из формы передается нормально