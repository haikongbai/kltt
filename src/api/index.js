// 统一封装接口方法
// 导入封装的网络请求
import axios from '@/utils/request'

// 登录 - 登录接口
export const loginApi = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 频道 —— 获取所有频道
export const getAllChannelsApi = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})
