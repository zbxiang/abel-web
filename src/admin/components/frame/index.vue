<template>
    <div class="basic-layout">
        <div :class="['nav-side', isCollapse?'fold':'unfold']">
            <!-- 系统LOGO -->
            <div class="logo">
                <img src="../../assets/logo.png" alt="">
                <span>Manager</span>
            </div>
            <!-- 导航菜单 -->
            <aside-menu :isCollapse="isCollapse"></aside-menu>
        </div>
        <div :class="['content-right', isCollapse?'fold':'unfold']">
            <!-- 右侧头部 -->
            <top-header></top-header>
            <div class="wrapper">
                <div class="main-page">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, getCurrentInstance, ref, Ref} from 'vue'

// 处理左侧菜单展开隐藏
const useExpendEffect = () => {
    const $emitter = getCurrentInstance()?.appContext.config.globalProperties.$emitter
    let isCollapse: Ref<Boolean> = ref(false)

    $emitter.on('expendCollapse', () => {
        isCollapse.value = !isCollapse.value
    })

    return { isCollapse }
}

export default defineComponent({
    name: 'frame',
    components: {
        asideMenu: defineAsyncComponent(() => import('./asideMenu.vue')),
        topHeader: defineAsyncComponent(() => import('./topHeader.vue')),
    },
    setup() {
        const { isCollapse } = useExpendEffect()
        return { isCollapse }
    }
})
</script>

<style scoped lang="scss">
.basic-layout{
    position: relative;
    .nav-side{
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: #001529;
        color: #fff;
        overflow-y: auto;
        // transition: width .5s;
        .logo{
            display: flex;
            align-items: center;
            font-size: 18px;
            height: 50px;
            img{
                width: 32px;
                height: 32px;
                margin: 0 10px;
            }
        }
        &.fold{
            width: 64px;
        }
        &.unfold{
            width: 200px;
        }
    }
    .content-right{
        margin-left: 200px;
        .wrapper{
            background: #eef0f3;
            padding: 20px;
            height: calc(100vh - 50px);
            background-color: #fff;
        }
        .main-page{
            height: 100%;
            background: #fff;
        }
        &.fold{
            margin-left: 64px;
        }
        &.unfold{
            margin-left: 200px;
        }
    }
}
</style>