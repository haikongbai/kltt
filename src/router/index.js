import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login/Index'
import Layout from '@/views/Layout/index'
import Home from '@/views/Home/index'
import User from '@/views/User/index'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
