import request from '@/utils/request'
// 登录
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

// 拉黑作者
export const blacklists = (id) => {
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}

// 关注作者
export const followUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    target:id
  })
}

// 取消关注作者 id 被取消作者的id
export const unFollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}