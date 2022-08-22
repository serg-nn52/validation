const inputs = [...document.querySelectorAll("input")].slice(1);
const btn = document.querySelector(".button");
const check = document.querySelector(".check");
const checkbox = document.querySelector("#registration_isAgreeTerms");

let isValidationError = false;

const patternName = /^[a-zа-я0-9]+$/iu;
const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const patternPhone = /^((\+)|())\d{0,14}$/;
const patternCaptcha = /^[0-9]+$/;

checkbox.classList.remove("visually-hidden");
check.style.position = "relative";
checkbox.style.position = "absolute";
checkbox.style.top = "1px";
checkbox.style.left = "5px";
checkbox.style.width = "17px";
checkbox.style.height = "17px";

const buttonDisabled = () => {
  btn.setAttribute("disabled", "disabled");
  btn.style.opacity = "0.3";
  btn.style.cursor = "not-allowed";
};

const addErrorMessage = (name, text) => {
  if (document.querySelector(`.${name}`)) {
    document.querySelector(`.${name}`).remove();
  }
  const elem = document.createElement("div");
  elem.classList.add(name);
  elem.innerText = text;
  elem.style.color = "red";
  return elem;
};

const removeErrorMessage = (name) => {
  if (document.querySelector(`.${name}`)) {
    document.querySelector(`.${name}`).remove();
  }
};

const validationName = (elem) => {
  if (elem.value.length > 20) {
    const error = addErrorMessage("name", "Максимум 20 символов");
    elem.after(error);
    isValidationError = true;
  } else if (elem.value && !patternName.test(elem.value)) {
    const error = addErrorMessage("name", "Только буквы и цифры");
    elem.after(error);
    isValidationError = true;
  } else {
    removeErrorMessage("name");
    isValidationError = false;
  }
};

const validationEmail = (elem) => {
  if (elem.value && !patternEmail.test(elem.value)) {
    isValidationError = true;
    const error = addErrorMessage("email", "Не верный формат E-mail");
    elem.after(error);
  } else {
    isValidationError = false;
    removeErrorMessage("email");
  }
};

const validationPhone = (elem) => {
  if (!elem.value.length) {
    isValidationError = true;
  } else if (elem.value && !patternPhone.test(elem.value)) {
    isValidationError = false;
    elem.value = elem.value.slice(0, -1);
  } else if (elem.value && elem.value[0] !== "+") {
    elem.value = "+" + elem.value;
    isValidationError = false;
  } else isValidationError = false;
};

const validationCaptcha = (elem) => {
  if (elem.value && !patternPhone.test(elem.value)) {
    elem.value = elem.value.slice(0, -1);
  }
};

inputs.forEach((el, i, inputs) => {
  el.setAttribute("disabled", "disabled");
  inputs[0].removeAttribute("disabled");
  el.addEventListener("blur", () => {
    if (i > inputs.length - 2) {
      return;
    } else if (el.value !== "" && !isValidationError) {
      inputs[i + 1].removeAttribute("disabled");
    } else {
      inputs[i + 1].setAttribute("disabled", "disabled");
    }
  });
});

buttonDisabled();

//name
inputs[0].addEventListener("input", (e) => {
  validationName(e.target);
});

//email
inputs[1].addEventListener("input", (e) => {
  validationEmail(e.target);
  removeErrorMessage("email");
});

inputs[1].addEventListener("blur", (e) => {
  validationEmail(e.target);
});

inputs[1].addEventListener("focus", (e) => {
  removeErrorMessage("email");
});

inputs[2].addEventListener("input", (e) => {
  validationPhone(e.target);
});

//password
inputs[3].addEventListener("blur", (e) => {
  if (inputs[4].value) {
    inputs[4].removeAttribute("disabled");
  }
});

//repeat password
inputs[4].addEventListener("input", (e) => {
  if (e.target.value !== inputs[3].value) {
    isValidationError = true;
  } else {
    isValidationError = false;
  }
});

inputs[4].addEventListener("blur", (e) => {
  if (!e.target.value) {
    const error = addErrorMessage("password", "Введите значение!");
    e.target.after(error);
  } else if (e.target.value !== inputs[3].value) {
    const error = addErrorMessage("password", "Введенные пароли не совпадают!");
    e.target.after(error);
  } else removeErrorMessage("password");
});

inputs[4].addEventListener("focus", (e) => {
  removeErrorMessage("password");
});

//captcha
inputs[5].addEventListener("input", (e) => {
  validationCaptcha(e.target);
});

//checkbox
inputs[6].addEventListener("change", () => {
  if (checkbox.checked) {
    btn.removeAttribute("disabled");
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  } else {
    buttonDisabled();
  }
});
