import { createRouter, createWebHashHistory } from 'vue-router'
// type 表示导入的是一个类型，不是跟上面一样是个函数
import type { RouteRecordRaw } from 'vue-router'
// import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
