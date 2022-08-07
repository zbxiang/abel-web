<template>
    <drawer
        title="权限设置"
        :drawerDialog="drawerDialog"
        @handleClose="handleClose"
    >
        <div class="drawer__content">
            <el-form label-width="100px">
                <el-form-item label="角色名称">{{ curRoleName }}</el-form-item>
                <el-form-item label="选择权限">
                    <el-tree
                        ref="tree"
                        :data="menuList"
                        show-checkbox
                        node-key="_id"
                        default-expand-all
                        :props="{ label: 'menuName' }"
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
            <div class="drawer__footer">
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleSubmit">确定</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </span>
            </div>
        </div>
    </drawer>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref, getCurrentInstance } from 'vue'

const usePermissionEffect = () => {
    const drawerDialog = ref(false)
    const curRoleName = ref()
    const menuList = ref()
    const handleClose = () => {}
    const handleSubmit = () => {}
    return { drawerDialog, curRoleName, menuList, handleClose, handleSubmit }
}

export default defineComponent({
    name: 'Permission',
    props: {
        drawerDialog: {
            type: Boolean,
            default: () => {
                return false
            }
        },
    },
    components: {
        Drawer: defineAsyncComponent(() => import('@C/components/Drawer.vue'))
    },
    setup() {
        const { drawerDialog, curRoleName, menuList, handleClose, handleSubmit } = usePermissionEffect()
        return { drawerDialog, curRoleName, menuList, handleClose, handleSubmit }
    }
})
</script>