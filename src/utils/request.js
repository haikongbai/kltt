// 基于 axios 封装网络请求
import Axios from 'axios'
const axios = Axios.create({
  baseURL: 'http://geek.itheima.net', // 接口基地址
  timeout: 30000 // 请求30秒无响应直接判定超时
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
