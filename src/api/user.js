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
      target:id
    })
}
