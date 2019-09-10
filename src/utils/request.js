import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '../store/index'
import router from '../router'

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
  // console.log(config)
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
}, async function (error) {
  // Do something with response error
  // console.log(error)
  // 判断状态码是否是401 如果是401 
  if(error.response.status === 401){
    //首先拿到refresh_token
    const refreshToken = store.state.user.refresh_token
    try{
      const response = await axios({
        method:'put',
        url:'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers:{
          Authorization:`Bearer ${refreshToken}`
        }
      })
      // 新的两个小时的token
      const token = response.data.data.token
      // 将新的token存储到Vuex中
      store.commmit('setUser', {
        token:token,
        refresh_token:refreshToken
      })
      // 重新发送上一次的401请求
      return instance(error.config)

    }catch (err){
      // 跳转到首页
      // 如果refresh_token到期
      // router.push('/login')
      router.push({
        path:'/login',
        query:{
          redirect:router.currentRoute.fullPath
        }
      })
    }
  }
  // 如果是401发送refresh_token交换新的token
  return Promise.reject(error)
})

export default instance
