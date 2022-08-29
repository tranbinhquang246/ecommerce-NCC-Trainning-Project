const validateName = {
  validateName: (_, value) => {
    const format = /[`!@#$%^&*()_+=\\[\]{};':"\\|,.<>\\/?~]/;
    if (format.test(value)) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
};

export default validateName;
