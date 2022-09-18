import { TinyEmitter } from 'tiny-emitter'
import store from './store'
import { inject, App } from 'vue'
import { LocalLayoutStore } from './types'
import * as ElIcons from '@element-plus/icons-vue'

function getComponentName(key: string) {
    if (!key) {
        return ''
    }
    const paths = key.split('/')
    const name = paths
        .filter((it) => !!it && it !== '.')
        .reverse()
        .find((it) => it !== 'index.vue' && it !== 'index.ts' && it !== 'index.js')
        ?.replace('.vue', '')
    return name || ''
}

// 注册全局Icon
export function registerIcons(app: App) {
    Object.keys(ElIcons).forEach((it: string) => {
        app.component(it + "Icon", (ElIcons as any)[it])
    })
}

const key = Symbol('layout_store')
export const emitKey = Symbol('tiny_emit')

// 注册全局组件
export function registerComponents(app: App) {
    const components = import.meta.globEager('./**/*.vue')
    Object.keys(components).forEach((it) => {
        const component = components[it]
        app.component(
            component.default.name || getComponentName(it),
            component.default
        )
    })
}

function install(Vue: App, options: any) {
    registerComponents(Vue)
    registerComponents(Vue)
    delete options.registerElement
    store.start(options)
    Vue.config.globalProperties.$isMobile = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    Vue.config.globalProperties.$isAndroid =
    navigator.userAgent.indexOf("Android") > -1 ||
    navigator.userAgent.indexOf("Adr") > -1
    Vue.provide(key, store)
    Vue.provide(emitKey, new TinyEmitter())
}

export function useLayoutStore() {
    return inject<LocalLayoutStore>(key, store as LocalLayoutStore)
}
  
export { default as Layout } from './index.vue'

export { mapTwoLevelRouter } from './utils'

export default {
    state: store.state,
    initPermissionRoute: store.initPermissionRoute,
    reset: store.reset,
    isEmptyPermissionRoute: store.isEmptyPermissionRoute,
    install
}
  