import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // webpack工具，require.context(路径，是否递归，正则匹配文件)可以加载文件夹
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    const route = require('../router/main' + key.split('.')[1])
    // console.log(route)

    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据菜单获取需要添加的routes
  // 递归函数
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        console.log(findMenu)

        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
