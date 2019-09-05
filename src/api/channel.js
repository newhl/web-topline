import request from '../utils/request'

/**
 * 获得频道列表
 * 1.用户登录获得用户保存的列表
 * 2.用户没有登录,获取默认的频道列表
 *
 * */

export const getDefaultOrUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}
