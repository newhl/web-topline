import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '../store/index'

const instance = axios.create({

  baseURL: 'http://ttapi.research.itcast.cn'
})

instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// 添加一个请求拦截器
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config)
  if (store.state.user) {
    // 这是一个js文件不是一个组件 需要导入store
    // 有登录状态请求的时候 自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
instance.interceptors.response.use(function (response) {
  // Do something with response data

  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
