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

// 获取所有频道的列表
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}

// 删除指定用户的频道
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}

// 添加用户指定的频道
// id频道的id  seq当前项的序号
export const addChannel = (id,seq) => {
  return request.patch('/app/v1_0/user/channels', {
    channels:[
      {
        id,
        seq
      }
    ]
   
  })
}