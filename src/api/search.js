import request from '../utils/request'

// 获取搜索建议
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

// 获取历史记录
export const gethistoricalRecords = () => {
  return request.get('/app/v1_0/search/histories')
}

// 获取文章搜索结果
export const getSearchResult = (
  {
    page,
    per_page,
    q
  }
) => {
  return request.get('/app/v1_0/search', {
    params:{
      page,
      per_page,
      q
    }
  })
}
