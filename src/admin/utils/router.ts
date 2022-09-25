import LayoutStore, { Layout } from '../layout'
import { isExternal, mapTwoLevelRouter } from '../layout/utils'
import router, { asyncRoutes, constantRoutes } from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '../store/modules/user'
import pinia from '../store/pinia'
import Cookies from 'js-cookie'
import { RouteRecordRaw } from 'vue-router'
import { toHump } from './'
import { RouteRecordRawWithHidden } from '../layout/types'
import $api from '../api'
import { USER_TOKEN_KEY } from '../store/keys'

const modules = import.meta.glob('./../pages/**/**.vue')

const userStore = useUserStore(pinia)

NProgress.configure({
    showSpinner: false,
})

interface OriginRoute {
    menuUrl: string
    menuName?: string
    hidden?: boolean
    outLink?: string
    affix?: boolean
    cacheable?: boolean
    icon?: string
    tip?: string | number
    isSingle?: boolean
    children: Array<OriginRoute>
}

function getRoutes() {
    return $api.getMenuListByRoleId({
        userId: userStore.getUserId,
        roleId: userStore.getRoleId
    }).then((res) => {
        let menuList = res.data.menuList
        return generatorRoutes(menuList)
    })
}

function getComponent(it: OriginRoute) {
    return modules[`./../pages/${it.menuUrl}.vue`]
    // return (): any => import('@Admin/pages' + it.menuUrl + '.vue')
}

function isMenu(route: OriginRoute) {
    return route.children && route.children.length > 0
}

function getNameByUrl(menuUrl: string) {
    const temp = menuUrl.split('/')
    return toHump(temp[temp.length - 1])
  }

function generatorRoutes(res: Array<OriginRoute>) {
    const tempRoutes: Array<RouteRecordRawWithHidden> = []
    // res.forEach((it) => {
    //   const route: RouteRecordRawWithHidden = {
    //     path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
    //     name: getNameByUrl(it.menuUrl),
    //     hidden: !!it.hidden,
    //     component: isMenu(it) ? Layout : getComponent(it),
    //     meta: {
    //       title: it.menuName,
    //       affix: !!it.affix,
    //       cacheable: !!it.cacheable,
    //       icon: it.icon || '',
    //       badge: it.tip,
    //       isSingle: !!it.isSingle,
    //     },
    //   }
    //   if (it.children) {
    //     route.children = generatorRoutes(it.children) as RouteRecordRaw[];
    //   }
    //   tempRoutes.push(route)
    // })
    return tempRoutes
  }

const whiteRoutes: string[] = ['/login']

function isTokenExpired(): boolean {
    const token = Cookies.get(USER_TOKEN_KEY)
    return !!token
}

router.beforeEach(async (to) => {
    NProgress.start()
    if (whiteRoutes.includes(to.path)) {
      NProgress.done()
      return true
    } else {
      if (!isTokenExpired()) {
        NProgress.done()
        return {
          path: '/login',
          query: { redirect: to.fullPath },
        }
      } else {
        const isEmptyRoute = LayoutStore.isEmptyPermissionRoute()
        if (isEmptyRoute) {
          // 加载路由
          const accessRoutes: Array<RouteRecordRaw> = []
          const tempRoutes = await getRoutes()
          accessRoutes.push(...tempRoutes);
          accessRoutes.push({
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            hidden: true,
          } as RouteRecordRaw)
          const mapRoutes = mapTwoLevelRouter(accessRoutes)
          mapRoutes.forEach((it: any) => {
            router.addRoute(it)
          })
          LayoutStore.initPermissionRoute([
            ...asyncRoutes,
            ...constantRoutes,
            ...accessRoutes,
          ])
          return { ...to, replace: true }
        } else {
          return true
        }
      }
    }
})

router.afterEach(() => {
    NProgress.done()
})