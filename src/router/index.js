import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login/Index'
import Layout from '@/views/Layout/index'
import Home from '@/views/Home/index'
import User from '@/views/User/index'
import Search from '@/views/Search/index'
import SearchResult from '@/views/Search/SearchResult'
import ArticleDetail from '@/views/ArticleDetail/index'
import UserEdit from '@/views/User/UserEdit'
import Chat from '@/views/Chat/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  { // 搜索页面
    path: '/search',
    component: Search
  },
  { // 搜索结果页面
    path: '/search_result/:kw',
    component: SearchResult
  },
  { // 文章详情页
    path: '/detail',
    component: ArticleDetail
  },
  { // 用户编辑页面
    path: '/user_edit',
    component: UserEdit
  },
  { // 聊天界面
    path: '/chat',
    component: Chat
  }
]

const router = new VueRouter({
  routes
})

export default router
