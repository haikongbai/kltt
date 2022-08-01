// 统一封装接口方法
// 导入封装的网络请求
import request from '@/utils/request'

// 登录 - 登录接口
export const loginApi = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 频道 —— 获取 - 所有频道
export const getAllChannelsApi = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 频道 - 获取 - 用户选择的频道（不强制的登录，如果未登录，后台会返回默认的频道）
export const getUserChannelsApi = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 频道 - 更新 - 更新覆盖用户选择的频道
export const updateChannelsApi = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})

// 文章 - 获取 -文章列表
export const getArticleList = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  params: {
    channel_id,
    timestamp
  }
})

// 文章 - 反馈 - 不喜欢
export const dislikeArticleApi = (artId) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章 - 反馈 - 垃圾内容
export const reportArticleApi = ({ artId, type, remark = '' }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target: artId,
    type,
    remark
  }
})

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

// 搜索 - 搜索联想建议
export const suggestListApi = ({ keywords }) => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: keywords
  }
})

// 搜索 - 搜索结果
export const searchResultApi = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})

// 用户 - 获取 - 用户基本资料
export const getUserInfoApi = () => request({
  url: '/v1_0/user',
  method: 'GET'
})

// 用户 - 获取 - 用户个人简介
export const getUserProfileApi = () => request({
  url: '/v1_0/user/profile',
  method: 'GET'
})

// 用户 - 更新 - 用户头像
export const updateUserPhotoApi = (fd) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  // 要传一个表单对象，外面传进来的 fd 是一个 new FormData()
  data: fd
})

// 用户 - 更新 - 用户个人简介
export const updateUserProfileApi = (dataObj) => {
  const obj = {
    name: '', // 用户昵称
    gender: 0, // 用户性别  0男1女
    birthday: '', // 用户生日  格式'2000-01-01'
    real_name: '', // 用户真实姓名
    intro: '' // 用户个人介绍
  }
  for (const key in obj) {
    if (dataObj[key] === undefined) {
      delete obj[key]
    } else {
      obj[key] = dataObj[key]
    }
  }

  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
