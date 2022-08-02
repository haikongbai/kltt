// 封装本地存储的方法
// 如果将来想改成其它的本地存储的方法可以在这统一改
// localStorage、sessionStorage、cookie
export const setStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const getStorage = (key) => {
  return localStorage.getItem(key)
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
