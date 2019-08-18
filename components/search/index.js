// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword'
import {
  BookModel
} from '../../models/book'
import {
  paginationBev
} from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: Number
    }
  },

  observers: {
    more() {
      this.loadMore()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
  },

  attached() {
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords
    })

    hotWords.then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) return

      if (this.isLocked()) {
        return
      }

      if (this.hasMore()) {
        this.locked()
        const length = this.getCurrentStart()
        bookModel.search(length, this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        }).catch(() => {
          this.unLocked()
        })
      }
    },
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const word = event.detail.value || event.detail.text
      if (word) {
        bookModel.search(0, word).then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            q: word
          })
          keywordModel.addToHistory(word)
          this._hideLoadingCenter()
        })
      }
    },
    onDelete() {
      this.initialize()
      this._closeResult()
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
