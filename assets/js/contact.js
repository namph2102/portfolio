import changeTheme from "../module/theme.js";
changeTheme();

function Validator(options) {
  const selectorRules = {};
  try {
    function Validate(inputElement, rule) {
      const groupElement = inputElement.closest(formGroup);
      const boxError = groupElement.querySelector(messageElement);
      let message = "";
      // nếu có lỗi thì dừng việc kiểm tra
      const rules = selectorRules[rule.selector];
      for (let i = 0; i < rules.length; i++) {
        message = rules[i](inputElement.value);
        if (message) break;
      }

      if (message) {
        boxError.innerHTML = message;
        groupElement.classList.add("error");
      } else {
        boxError.innerHTML = "";
        groupElement.classList.remove("error");
      }
      return !!message;
    }
    const form = document.querySelector(options.form);
    const { formGroup, messageElement, rules, field } = options;
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = false;
        rules.forEach((rule) => {
          const inputElement = document.querySelector(rule.selector);
          if (Validate(inputElement, rule)) isValid = true;
        });
        if (!isValid) {
          //   form.submit();
          const data = {};
          form.querySelectorAll(`[data-${field}]`).forEach((item) => {
            data[item.dataset[field]] = item.value.trim();
          });
          options.onSubmit(data);
        }
      });
    }

    rules.forEach((rule) => {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else selectorRules[rule.selector] = [rule.test];

      const inputElement = document.querySelector(rule.selector);

      inputElement.addEventListener("blur", () => Validate(inputElement, rule));
      inputElement.addEventListener("input", () => {
        if (inputElement.value) {
          const groupElement = inputElement.closest(formGroup);
          const boxError = groupElement.querySelector(messageElement);
          boxError.innerHTML = "";
          groupElement.classList.remove("error");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}
Validator.isRequired = function (selector, message) {
  return {
    selector,
    test(value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này!";
    },
  };
};
Validator.isEmail = function (selector, message) {
  return {
    selector,
    test(email = "") {
      const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return email.match(regex)
        ? undefined
        : message || "Trường này không phải là email !";
    },
  };
};

Validator.isMinLength = function (selector, minLength) {
  return {
    selector,
    test(value) {
      return value.trim().length >= minLength
        ? undefined
        : `Trường này ít nhất ${minLength} kí tự`;
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector,
    test(value) {
      return value.trim() === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập vào không chính xác";
    },
  };
};

Validator({
  form: "#form-1",
  formGroup: ".form--group",
  messageElement: ".error",
  field: "field",
  rules: [
    Validator.isRequired("#fullname"),
    Validator.isRequired("#email"),
    Validator.isRequired("#subject"),
    Validator.isRequired("#content"),
    Validator.isEmail("#email"),
    Validator.isMinLength("#content", 10),
  ],
  onSubmit(data) {
    console.log(data);
  },
});
