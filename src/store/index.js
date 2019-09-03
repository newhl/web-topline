import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '../utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:null
    user: storageTools.getItem('user')
  },
  mutations: {
    setUser (state, user) {
      state.user = user

      storageTools.setItem('user', user)
    }
  },
  actions: {

  }
})
