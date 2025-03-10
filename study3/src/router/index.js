import { createRouter, createWebHistory } from 'vue-router'
import PageIndex from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    // 目录
    { path: '/index', name: 'index', component: PageIndex },
    // ================================== 基础篇 ==================================
    // 第一个程序
    { path: '/base', component: () => import('../views/FirstOfAll.vue') },
    // 画线
    { path: '/base-line', component: () => import('../views/BaseLine.vue') },
    // 文字
    { path: '/base-text', component: () => import('../views/BaseText.vue') }
    // ================================== 进阶篇 ==================================
  ]
})

export default router
