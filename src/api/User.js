import request from '@/utils/request'

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
