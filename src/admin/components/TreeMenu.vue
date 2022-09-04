<template>
    <template v-for="menu in userMenu">
        <el-sub-menu
            v-if="
                menu.children &&
                menu.children.length > 0 &&
                menu.children[0].menuType == 1
            "
            :key="menu._id"
            :index="menu.url"
        >
            <template #title>
                <i :class="['iconfont', 'icon-' + menu.icon]"></i>
                <span>{{ menu.menuName }}</span>
            </template>
            <tree-menu :userMenu="menu.children" />
        </el-sub-menu>
        <el-menu-item
            v-else-if="menu.menuType == 1"
            :key="menu._id + 1"
            :index="menu.url"
        >   
            <i v-if="menu.icon" :class="['iconfont', 'icon-' + menu.icon]"></i>
            <span>{{ menu.menuName }}</span>
        </el-menu-item>
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'treeMenu',
    props: {
        userMenu: {
            type: Array as PropType<any[]>,
            default: () => {
                return []
            }
        }
    }
})
</script>

<style scoped lang="scss">
    .el-sub-menu__title,
    .el-menu-item{
        i{
            margin-right: 5px;
        }
    }
</style>