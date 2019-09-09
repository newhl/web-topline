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

//获取文章详情,id是文章的id
export const getArticle = (id) => {
  return request.get(`/app/v1_0/articles/${id}`)
}

// 对文章点赞
export const likeAction = (id) => {
  return request.post('/app/v1_0/article/likings', {
    target:id
  })
}
// 对文章取消点赞
export const unLikeAction = (id) => {
  return request.delete(`/app/v1_0/article/likings/${id}`)
}

// 取消对文章的不喜欢 id是文章的id
export const unDislikeAction = (id) => {
  return request.delete(`/app/v1_0/article/dislikes/${id}`)
}