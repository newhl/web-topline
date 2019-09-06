import request from '../utils/request'

/** 获取文章列表 (登录或者不登录)
 * @params{*} 参数
 */

export const getArticles = ({
  channel_id,
  timestamp,
  with_top
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}
