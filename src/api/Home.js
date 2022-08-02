import request from '@/utils/request'

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
