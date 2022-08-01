// 基于 axios 封装网络请求
import Axios from 'axios'
import router from '@/router/index'
import { Notify } from 'vant'
import { getToken } from './token'
const axios = Axios.create({
  baseURL: 'http://geek.itheima.net', // 接口基地址
  timeout: 30000 // 请求30秒无响应直接判定超时
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // ?. 可选链操作符，如果前面对象里面没有 length ，整个表达式原地返回 undefined
  // 如果 getToken()在原地有值 token字符串，才能调用 length 获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 响应状态码 2xx,3xx 进入这里
  return response
}, function (error) {
  // 对响应错误做点什么
  // 响应状态码 4xx,5xx 进入这里
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份认证已过期，请重新登录' })
    router.replace('/login')
  }
  return Promise.reject(error)
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
