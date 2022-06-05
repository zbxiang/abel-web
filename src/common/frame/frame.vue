<template>
    <div class="basic-layout">
        <div :class="['nav-side', isCollapse?'fold':'unfold']">
            <div class="logo">
                <img src="./../assets/logo.png" alt="">
                <span>Manager</span>
            </div>
            <asider-menu></asider-menu>
        </div>
        <div :class="['content-right', isCollapse?'fold':'unfold']">
            <nav-top></nav-top>
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

export default defineComponent({
    name: 'frame',
    components: {
        asiderMenu: defineAsyncComponent(() => import('@C/components/asiderMenu.vue')),
        navTop: defineAsyncComponent(() => import('@C/components/navTop.vue'))
    },
    mounted() {
        this.getMenuList()
    },
    setup() {
        const $emitter = getCurrentInstance()?.appContext.config.globalProperties.$emitter
        let isCollapse: Ref<Boolean> = ref(false)
        const userMenu = ref([])

        $emitter.on('expendCollapse', () => {
            isCollapse.value = !isCollapse.value
        })

        const getMenuList = async () => {
            try {
                const list = await $services.userModule.getMenuList()
                userMenu.value = list
            } catch(error) {
                console.error(error)
            }
        }
        
        return {
            isCollapse,
            getMenuList
        }
    },
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