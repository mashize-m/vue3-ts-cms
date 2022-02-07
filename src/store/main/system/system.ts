import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import {
  getPageListData,
  deletePageDataById,
  createPageData,
  editPageData
} from '@/network/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListDate(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
            break
          case 'role':
            return state.roleList
            break
          case 'goods':
            return state.goodsList
            break
          case 'menu':
            return state.menuList
            break
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // console.log(payload.pageUrl)
      // console.log(payload.queryInfo)

      // 1. 获取pageUrl
      const pageName = payload.pageName
      // console.log(pageName)

      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = 'users/list'
          break
        case 'role':
          pageUrl = 'role/list'
          break
        case 'goods':
          pageUrl = 'goods/list'
          break
        case 'menu':
          pageUrl = 'menu/list'
          break
      }
      // console.log(pageUrl)

      // 2. 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // console.log(pageResult)

      // 3. 将数据存储到state中
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case 'users':
          commit('changeUserList', list)
          commit('changeUserCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
        case 'goods':
          commit('changeGoodsList', list)
          commit('changeGoodsCount', totalCount)
          break
        case 'menu':
          commit('changeMenuList', list)
          commit('changeMenuCount', totalCount)
          break
      }
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取参数：pageName和id
      // pageName->/users
      // id->/users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      console.log(pageUrl)

      // 2.调用删除网络请求
      await deletePageDataById(pageUrl)
      // 3.重新请求数据
      // 如果实现的是：条件搜索下删除内容，页面刷新后仍然在条件搜索基础上，需要把条件搜索的内容获取到，在发送请求的时候携带
      // 这里条件搜索的内容保存在页面，没有在Vuex中，不太好获取，可以考虑重构下这部分代码，将数据保存到Vuex中，就可以直接获取到了
      // 从这里也能看到数据保存到Vuex中优点
      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      // 2.重新请求数据
      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      // 2.重新请求数据
      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
