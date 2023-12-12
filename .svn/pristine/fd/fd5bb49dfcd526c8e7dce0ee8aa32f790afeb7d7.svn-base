const parseBoolean = (value) => {
    if (typeof value === 'string') {
      const lowerCaseValue = value.trim().toLowerCase();
      if (lowerCaseValue === 'true') {
        return true;
      } else if (lowerCaseValue === 'false') {
        return false;
      }
    }
    return Boolean(value);
  }

module.exports={parseBoolean}
