class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(
      key,
      // 未加密
      // JSON.stringify(value)
      // 用中文 记得加encodeURIComponent()!
      // 加密：window.btoa(window.encodeURIComponent(JSON.stringify(obj)));
      window.btoa(window.encodeURIComponent(JSON.stringify(value)))
    )
  }
  getCache(key: string) {
    // obj -> string => obj
    const value = window.localStorage.getItem(key)
    if (value) {
      // 未解密
      // return JSON.parse(value)
      // 解密：decodeURIComponent(window.atob(value))
      return JSON.parse(decodeURIComponent(window.atob(value)))
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
