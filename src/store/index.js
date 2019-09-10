import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '../utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:null
    user: storageTools.getItem('user'),
    showReplyList:false
  },
  mutations: {
    setUser (state, user) {
      state.user = user

      storageTools.setItem('user', user)
    },
    setShowReplyList(state, isShow){
      state.showReplyList = isShow
    }
  },
  actions: {

  }
})
