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

// 发送不感兴趣文章请求
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}

// 举报文章
export const reportArticle = ({
  // 文章的id
  target,
  // 举报类型
  // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
  type
}) => {
  return request.post('/app/v1_0/article/reports', {
    target,
    type
  })
}
