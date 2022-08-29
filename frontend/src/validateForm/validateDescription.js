const validateDesciption = {
  validateDesciption: (_, value) => {
    if (value?.length > 500) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
};

export default validateDesciption;
