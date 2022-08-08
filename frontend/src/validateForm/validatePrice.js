const validate = {
  validatePriceMinimum: (_, value) => {
    if (value < 10000) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  validatePriceMaximum: (_, value) => {
    if (value > 1000000000) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  validatePriceNegative: (_, value) => {
    if (value < 0) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  validateName: (_, value) => {
    const format = /[`!@#$%^&*()_+=\\[\]{};':"\\|,.<>\\/?~]/;
    if (format.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  validateDesciption: (_, value) => {
    if (value.length > 500) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
};

export default validate;
