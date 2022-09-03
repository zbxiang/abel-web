<template>
    <div class="basic-layout">
        <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
            <!-- 系统LOGO -->
            <div class="logo">
                <img src="./../assets/logo.png" alt="">
                <span>Manager</span>
            </div>
            <!-- 导航菜单 -->
            <el-menu
                :default-active="activeMenu"
                background-color="#001529"
                text-color="#fff"
                router
                :collapse="isCollapse"
                class="nav-menu"
            >
                <tree-menu :userMenu="userMenu" />
            </el-menu>
        </div>
        <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
            <div class="nav-top">
                <div class="nav-left">
                    <div class="menu-fold" @click="toggle">
                        <el-icon v-if="!isCollapse"><Expand /></el-icon>
                        <el-icon v-else><Fold /></el-icon>
                    </div>
                    <div class="bread">
                        <BreadCrumb />
                    </div>
                </div>
                <div class="user-info">
                    <el-badge
                        :is-dot="noticeCount > 0 ? true : false"
                        class="notice"
                        type="danger"
                        @click="router.push('/audit/approve')"
                    >
                        <el-icon><Bell /></el-icon>
                    </el-badge>
                    <el-dropdown @command="handleLogout">
                        <span class="user-link">
                            {{ userInfo.userName }}
                            <el-icon><ArrowDown /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="email">邮箱：{{ userInfo.userEmail }}</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, getCurrentInstance, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import $storage from '../utils/storage'

export default defineComponent({
    name: 'layout',
    components: {
        TreeMenu: defineAsyncComponent(() => import('./TreeMenu.vue')),
        BreadCrumb: defineAsyncComponent(() => import('./BreadCrumb.vue')),
    },
    created() {
        this.getMenuList()
        this.getNoticeCount()
    },  
    setup() {
        const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
        const store = useStore()
        const router = useRouter()

        let isCollapse = ref(false)
        
        const userMenu = ref([])

        let activeMenu = computed(() => {
            return location.hash.slice(1)
        })

        let userInfo = computed(() => {
            return store.state.userInfo
        })
            
        let noticeCount = computed(() => {
            return store.state.noticeCount
        })

        const getNoticeCount = async () => {
            try {
                const count = await $api.noticeCount()
                store.commit('saveNoticeCount', count)
            } catch (error: any) {
                console.log(error)
            } 
        }

        const getMenuList = async () => {
            try {
                const res = await $api.getPermissionList()
                if (res.code == 200) {
                    const { menuList, actionList } = res.data
                    store.commit('saveMenuList', menuList)
                    store.commit('saveActionList', actionList)
                    userMenu.value = menuList
                }
            } catch (error: any) {
                console.log(error)
            }
        }

        const toggle = () => {
            isCollapse.value = !isCollapse.value
        }

        const handleLogout = (key: string) => {
            if (key == 'email') return
            store.commit('saveUserInfo', '')
            $storage.clearAll()
            router.push('/login')
        }

        return {
            router,
            isCollapse,
            userMenu,
            activeMenu,
            noticeCount,
            userInfo,
            getNoticeCount,
            getMenuList,
            toggle,
            handleLogout
        }
    }
})
</script>

<style scoped lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          display: flex;
          align-items: center;
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        display: flex;
        align-items: center;
        .notice {
          display: flex;
          margin-right: 15px;
          cursor: pointer;
        }
        .user-link {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #409eff;
          i{
            margin-left: 8px;
          }
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>