import request from '../utils/request'


// 获取搜索建议
export const getSuggestion = (q) => {
    return request.get('/app/v1_0/suggestion',{
        params:{
            q
        }
    })
}

// 获取历史记录
export const gethistoricalRecords = () => {
    return request.get('/app/v1_0/search/histories')
}