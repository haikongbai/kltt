import request from '@/utils/request'

// 文章 - 获取文章详情
export const detailApi = ({ art_id }) => request({
  url: `/v1_0/articles/${art_id}`,
  method: 'GET'
})

// 文章 - 关注作者
export const userFollowedApi = ({ aut_id }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: aut_id
  }
})

// 文章 - 取关作者
export const userUnFollowedApi = ({ aut_id }) => request({
  url: `/v1_0/user/followings/${aut_id}`,
  method: 'DELETE'
})

// 文章 - 点赞文章
export const likeArticleApi = ({ art_id }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: art_id
  }
})

// 文章 - 取消点赞文章
export const unLikeArticleApi = ({ art_id }) => request({
  url: `/v1_0/article/likings/${art_id}`,
  method: 'DELETE'
})

// 评论 - 获取文章评论列表
export const commentsList = ({ id, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  method: 'GET',
  params: { // axios 只针对 params 参数，如果发现键值对，值为null，会忽略此参数名和值，不携带在 url? 后面
    type: 'a',
    source: id,
    offset,
    limit
  }
})

// 评论 - 点赞评论
export const commentLikingApi = ({ com_id }) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: com_id
  }
})

// 评论 - 取消点赞评论
export const commentUnlikingApi = ({ com_id }) => request({
  url: `/v1_0/comment/likings/${com_id}`,
  method: 'DELETE'
})

// 评论 - 增加文章评论
export const commentSendApi = ({ id, content, art_id = null }) => {
  // target content 是必传参数，art_id 是可选参数，只有是对评论进行评论时才传
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}
