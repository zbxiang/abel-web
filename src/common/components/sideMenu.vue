<template>
    <el-menu
        default-active="2"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="false"
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

<script lang="ts" setup>
    import {
        Setting,
    } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
    .nav-menu{
        height: calc(100vh - 50px);
        border-right: none;
    }
</style>