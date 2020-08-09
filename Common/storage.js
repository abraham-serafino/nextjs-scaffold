let _localStorage = {
  setItem() {},
  getItem() {}
}

if (process.browser) {
  _localStorage = window.localStorage
}

const storage = (prefix) => {
  const get = (key) => JSON.parse(_localStorage.getItem(`${prefix}.${key}`))

  const set = (key, value) =>
    _localStorage.setItem(`${prefix}.${key}`, JSON.stringify(value))

  return { get, set }
}

export default storage
