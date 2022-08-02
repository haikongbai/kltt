import request from '@/utils/request'
import { getStorage } from '@/utils/storage'

// 登录 - 登录接口
export const loginApi = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 登录 - 刷新token
export const getNewTokenApi = () => request({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${getStorage('refresh_token')}`
  }
})
