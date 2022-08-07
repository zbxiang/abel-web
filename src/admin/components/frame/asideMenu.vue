<template>
    <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse">
        <tree-menu :userMenu="userMenu"></tree-menu>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, getCurrentInstance, ref, Ref} from 'vue'

export default defineComponent({
    name: 'asideMenu',
    props: ['isCollapse'],
    components: {
        treeMenu: defineAsyncComponent(() => import('./treeMenu.vue'))
    },
    setup() {
        console.log('sdkgjsdkgjkdsjkgjsdZBxiangksdsd')
    },
})
</script>

<style lang="scss" scoped></style>