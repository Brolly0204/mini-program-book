import { HTTP } from '../utils/http'

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 5
  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      words.unshift(keyword)
      if (words.length > this.maxLength) {
        words.pop()
      }
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel }