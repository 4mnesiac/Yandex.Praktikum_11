class UserInfo {
  constructor(pageName, pageJob, api) {
    this.pageName = pageName;
    this.pageJob = pageJob;
    this.formName = "";
    this.formJob = "";
    this.api = api;
  }
  getInfo() {
    this.api.getUserInfo().then(function (result) {
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

  setUserInfo(formNameValue, formJobValue) {
    this.formName = formNameValue;
    this.formJob = formJobValue;
    this.updateUserInfo();
  }
  getFormValues(event, form, popup) {
    event.preventDefault();
    const formNameValue = form.elements.user.value;
    const formJobValue = form.elements.job.value;
    this.setUserInfo(formNameValue, formJobValue);
    popup.close();
  }
}
