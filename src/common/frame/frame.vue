<template>
    <div class="basic-layout">
        <div class="nav-side">
            <div class="logo">
                <img src="./../assets/logo.png" alt="">
                <span>Manager</span>
            </div>
            <side-menu></side-menu>
        </div>
        <div class="content-right">
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
import { defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
    name: 'frane',
    components: {
        sideMenu: defineAsyncComponent(() => import('@C/components/sideMenu.vue')),
        navTop: defineAsyncComponent(() => import('@C/components/navTop.vue'))
    },
    setup() {
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
        transition: width .5s;
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
    }
}
</style>