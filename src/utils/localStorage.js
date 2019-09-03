export const setItem = (key, item) => {
  // item 如果是对象 把对象转成字符串
  window.localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
