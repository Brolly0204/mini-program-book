import { HTTP } from '../utils/http'

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      url: '/classic/latest'
    }).then(res => {
      this._setLatestIndex(res.index)
      return res
    })
  }

  getMyFavor() {
    return this.request({
      url: '/classic/favor'
    })
  }

  getClassic(index, nextOrPrevious) {
    const key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)
    const classic = wx.getStorageSync(key)
    if (!classic) {
      return this.request({
        url: `/classic/${index}/${nextOrPrevious}`
      }).then(res => {
        wx.setStorageSync(this._getKey(res.index), res)
        return res
      })
    } else {
      return Promise.resolve(classic)
    }
  }

  isFirst(index) {
    return index === 1
  }

  isLatest(index) {
    const latestIndex = this._getLatestIndex()
    return latestIndex === index
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    const index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    const key = `classic-${index}`
    return key
  }
}

export { ClassicModel }
