class Api {
  constructor(options) {
    this.options = options;
    this.url = options.baseUrl;
    this.cohort = options.cohort;
    this.token = options.headers.authorization;
  }
  getInitialCards() {
    return fetch(`${this.options.baseUrl}${this.cohort}/cards`, {
      method: "GET",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(function (result) {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  postUserCard(name, link) {
    fetch(`${this.url}${this.cohort}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).catch((err) => console.log(err));
  }

  patchUserInfo(name, about) {
    fetch(`${this.url}${this.cohort}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this.url}${this.cohort}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  }

  deleteCard(id) {
    fetch(`${this.url}${this.cohort}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      }
    }).catch((err) => console.log(err));
  }
}
