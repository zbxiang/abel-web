<template>
    <div class="nav-top">
        <div class="nav-left">
            <div class="menu-fold"><el-icon><Expand /></el-icon></div>
            <div class="bread">面包屑</div>
        </div>
        <div class="user-">用户</div>
    </div>
</template>

<script lang="ts" setup>
    import {
        Expand,
    } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
    .nav-top{
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding: 0 20px;
        .nav-left{
            display: flex;
        }
    }
</style>