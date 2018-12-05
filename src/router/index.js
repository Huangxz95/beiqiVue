import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

import { constantRouterMap } from './modules/constant'

import { errorRoute } from './modules/error'
Vue.use(Router)
// 页面导航路由
const pageRoute = [
  {
    path: '/system',
    icon: 'el-icon-menu',
    component: Layout,
    redirect: 'noredirect',
    name: 'System',
    meta: {
      title: 'system',
      icon: '404'
    },
    children: [
      {
        path: 'menumanager',
        component: () => import('@/views/system/menuManager'),
        name: 'MenuManager',
        meta: { title: 'MenuManager' }
        // children: [{
        //   path: '401',
        //   component: () => import('@/views/errorPage/401'),
        //   name: 'page401',
        //   meta: { title: 'page401' }
        // }]
      },
      {
        path: 'user',
        component: () => import('@/views/system/user'),
        name: 'User',
        meta: { title: 'user' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role'),
        name: 'Role',
        meta: { title: 'role' }
      },
      {
        path: 'menuauthorize',
        component: () => import('@/views/system/menuAuthorize'),
        name: 'MenuAuthorize',
        meta: { title: 'menuAuthorize' }
      }, {
        path: 'forwarduserauthorize',
        component: () => import('@/views/system/forwardUserAuthorize'),
        name: 'forwardUserAuthorize',
        meta: { title: 'forwardUserAuthorize' }
      }
    ]
  }
]

const routerMap = [
  errorRoute,
  ...pageRoute
]

/**
 * 通配路由
 */
const wildcard = [
  { path: '*', redirect: '/404', hidden: true }
]
const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
export { constantRouterMap, routerMap, wildcard }
