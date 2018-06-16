const getItem = field => {
  try {
    const item = localStorage.getItem(field);
    if (item === null) {
      return undefined;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const setItem = (field, item) => {
  try {
    const stringifiedItem = JSON.stringify(item);
    localStorage.setItem(field, stringifiedItem);
  } catch (error) {
    console.error(error);
  }
};

const removeItem = field => {
  try {
    localStorage.removeItem(field);
  } catch (error) {
    console.error(error);
  }
};

const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export { getItem, setItem, removeItem, clearLocalStorage };
