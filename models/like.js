import { HTTP } from '../utils/http'

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    const url = behavior === 'like' ? '/like' : '/like/cancel'
    return this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
  getClassicLikeStatus(artID, category) {
    console
    return this.request({
      url: `/classic/${category}/${artID}/favor`
    })
  }
}

export { LikeModel }