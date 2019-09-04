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
// 全部频道列表
export const channel = () => {
  return request.get('/app/v1_0/channels', {})
}

// 当前用户文章列表
export const articlesList = ({page, per_page}) => {
  return request.get('/app/v1_0/user/articles', {
    page,
    per_page
  })
}
