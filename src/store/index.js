import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '../utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:null
    user: storageTools.getItem('user'),
    showReplyList:false,
    currentComment:null
  },
  mutations: {
    setUser (state, user) {
      state.user = user

      storageTools.setItem('user', user)
    },
    // 控制回复评论组件的显隐
    setShowReplyList(state, isShow){
      state.showReplyList = isShow
    },
    // 改变当前需要评论的评论
    setCrrrentComment(state, comment){
      state.currentComment = comment
    }
  },
  actions: {

  }
})
