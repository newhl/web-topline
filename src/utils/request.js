import axios from 'axios'
import JSONbig from 'json-bigint'

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


// Add a instance interceptor
instance.interceptors.instance.use(function (config) {
    // Do something before instance is sent
    return config
  }, function (error) {
    // Do something with instance error
    return Promise.reject(error)
  })
  
  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response)
    return response
  }, function (error) {
    // Do something with response error
    return Promise.reject(error)
  })
  
  export default instance