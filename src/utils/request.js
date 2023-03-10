// 基于 axios 封装网络请求
import Axios from 'axios'
import router from '@/router/index'
// import { Notify } from 'vant'
import { getToken, removeToken } from './token' // , setToken
// import { getNewTokenApi } from '@/api/index'
const axios = Axios.create({
  baseURL: 'https://toutiao.itheima.net/', // 'http://geek.itheima.net', // 接口基地址
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
}, async function (error) {
  // 对响应错误做点什么
  // 响应状态码 4xx,5xx 进入这里
  if (error.response.status === 401) {
    // Notify({ type: 'warning', message: '身份认证已过期，请重新登录' })
    removeToken()
    // 方法一：
    // router.currentRoute 相当于 Vue文件中的 this.$route
    // router.currentRoute.fullPath -> 当前页面的路由地址（#号后面的全部）
    router.replace({ path: `/login?path=${router.currentRoute.fullPath}` })
  }
  // 方法二：使用getNewTokenApi()拿到一个新的token
  //   const { data: res } = await getNewTokenApi()
  //   // console.log(res)
  //   // 把新 token 存到本地
  //   setToken(res.data.token)
  //   // error.config 是上一次请求的配置对象
  //   // 更新 error.config里面的token
  //   error.config.headers.Authorization = `Bearer ${res.data.token}`
  //   // 把上一次未成功的请求再一次发起
  //   return axios(error.config)
  // } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
  //   // refresh_token 也过期了
  //   localStorage.clear()
  //   Notify({ type: 'warning', message: '身份认证已过期，请重新登录' })
  //   router.replace('/login')
  // }
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
