import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/network/login/login'
import LocalCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router/index'

import { IAccount, UserInfo, Department, Role } from '@/network/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      // console.log(token)

      state.token = token
    },
    changeUserInfo(state, userInfo: UserInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 根据菜单，找到对应的router的路由：userMenus -->  routes
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes)

      // 动态添加路由：将routes -->  router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // commit('accountLoginAction', payload);
      console.log('执行accountLoginAction', payload)
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      // console.log(loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 保存token到本地
      LocalCache.setCache('token', token)

      // 发送初始化请求（完整的role/department）
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息数据
      const userInfoResult = await requestUserInfoById(id)
      // console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      // console.log(userMenus)
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
      router.push('/main')
    },

    phoneLoginAction({ commit }, payload: any) {
      // commit('accountLoginAction', payload);
      console.log('phoneLoginAction', payload)
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)

        // 发送初始化请求（完整的role/department）
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
