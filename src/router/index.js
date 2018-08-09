import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Login from '@/views/auth/Login'
import E404 from '@/views/auth/E404'
import Home from '@/views/home/Index'
import store from '@/store'
import lazyLoading from './lazyLoading'
import NProgress from 'nprogress'

Vue.use(Router)

let constantRouterMap = [{
  path: '/login',
  name: 'Login',
  component: Login
}]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/store_management',
    children: [
      {
        path: '/store_management',
        name: 'store_management',
        component: lazyLoading('views/store_management'),
        meta: {
          auth: true,
          title: '商户管理'
        }
      },
      {
        path: '/cabinet_management',
        name: 'Index',
        component: lazyLoading('views/SHGL'),
        meta: {
          auth: true,
          title: '机柜管理'
        }
      },
      {
        path: '/charge_baby_management',
        name: 'Index',
        component: lazyLoading('views/SHGL'),
        meta: {
          auth: true,
          title: '充电宝管理'
        }
      }
    ]
  },
  {
    path: '/*',
    name: '404',
    component: E404,
    meta: {
      title: '页面找不到',
      hidden: true
    }
  }
]

const MENU = [
  {
    title: '商户管理',
    path: '/store_management'
  },
  {
    title: '设备管理',
    children: [
      {
        title: '机柜管理',
        path: '/cabinet_management'
      },
      {
        title: '充电宝管理',
        path: '/charge_baby_management'
      }
    ]
  }
]

store.commit('SET_MENU', MENU)
const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [...constantRouterMap, ...asyncRouterMap]
})

// 处理登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.auth) {
    // 登录验证 有token就一定有角色
    let token = Cookies.get('access_token')
    if (token) {
      next({
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
export default router
