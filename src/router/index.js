import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token'

const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login/Index')
const Layout = () => import(/* webpackChunkName: "Layout" */ '@/views/Layout/index')
const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home/index')
const User = () => import(/* webpackChunkName: "User" */ '@/views/User/index')
const Search = () => import(/* webpackChunkName: "Search" */ '@/views/Search/index')
const SearchResult = () => import(/* webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult')
const ArticleDetail = () => import(/* webpackChunkName: "ArticleDetail" */ '@/views/ArticleDetail/index')
const UserEdit = () => import(/* webpackChunkName: "UserEdit" */ '@/views/User/UserEdit')
const Chat = () => import(/* webpackChunkName: "Chat" */ '@/views/Chat/index')

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
        component: Home,
        meta: {
          sctollT: 0
        }
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

// 路由 全局前置守卫
router.beforeEach((to, from, next) => {
  if (getToken()?.length > 0 && to.path === '/login') {
    // next(false)
    // 不让它留在原地，而是让他跳转到首页，解决返回按钮的问题
    next('/layout/home')
  } else {
    next()
  }
})

export default router
