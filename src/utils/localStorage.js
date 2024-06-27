/* global chrome */

export const saveData = (key, data) => {
  if (isChromeExtension()) {
    //when chrome is available use it
    try {
      return chrome.storage.local.set({ [key]: data }); //set returns a promise
    } catch (error) {
      console.error("error saving to local state");
      console.error(error);
    }
  } else {
    // when chrome is not available use local storage
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(data))); //cast to promise
  }
};

export const loadData = (key) => {
  if (isChromeExtension()) {
    try {
      return chrome.storage.local.get(key).then((data) => data[key]);
    } catch (error) {
      console.error("Error loading from local state");
      console.error(error);
    }
  } else {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
};

const isChromeExtension = () => {
  return !!chrome?.storage;
};
