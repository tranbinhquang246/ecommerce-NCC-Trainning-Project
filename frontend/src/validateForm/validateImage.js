const validateImage = {
  validateImage: (_, value) => {
    const nameFile = value?.file.name;
    const formatFile = nameFile?.substring(nameFile.lastIndexOf('.') + 1).toLowerCase();
    if (formatFile === 'png' || formatFile === 'jpeg' || formatFile === 'jpg') {
      return Promise.resolve();
    }
    return Promise.reject();
  },
};

export default validateImage;
