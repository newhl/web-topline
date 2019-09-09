import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '../views/Tabbar.vue'
import Home from '../views/home/index.vue'
import Qa from '../views/qa/index.vue'
import Video from '../views/video/index.vue'
import User from '../views/user/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'tabbar',   // 当有默路径的时候 不需要name
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '',
          component: Home
        },
        {
          path: '/qa',
          name: 'qa',
          component: Qa
        },
        {
          path: '/video',
          name: 'video',
          component: Video
        },
        {
          path: '/user',
          name: 'user',
          component: User
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      props:true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/SearchResult.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      props:true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/detail/index.vue')
    }
  ]
})
