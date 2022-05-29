<template>
    <el-menu
        default-active="2"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
        class="nav-menu">
        <el-sub-menu index="1">
            <template #title>
                <el-icon><setting /></el-icon>
                <span>系统管理</span>
            </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">菜单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon><setting /></el-icon>
                <span>审批管理</span>
            </template>
            <el-menu-item index="2-1">休假申请</el-menu-item>
            <el-menu-item index="2-2">待我审批</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts">
    import { defineComponent, getCurrentInstance, ref, Ref } from 'vue'
    export default defineComponent({
        name: 'asiderMenu',
        setup() {
            const mitter = getCurrentInstance()?.appContext.config.globalProperties.emitter
            let isCollapse: Ref<Boolean> = ref(false)
            const userMenu = ref([])
            
            mitter.on('expendCollapse', () => {
                isCollapse.value = !isCollapse.value
            })
            
            return {
                isCollapse,
            }
        }
    })
</script>

<style scoped lang="scss">
    .nav-menu{
        height: calc(100vh - 50px);
        border-right: none;
    }
</style>