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
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
    name: 'Permission',
    emits: [
        'handleSubmit',
        'handleClose',
        'getCheckedNodes',
        'getHalfCheckedKeys'
    ],
    props: {
        drawerDialog: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        curRoleName: String,
        menuList: Array

    },
    components: {
        Drawer: defineAsyncComponent(() => import('@Admin/components/Drawer.vue'))
    },
    setup(props, ctx) {
        const tree = ref()

        const handleClose = () => {
            ctx.emit('handleClose')
        }

        const handleSubmit = () => {
            ctx.emit('handleSubmit')
        }

        const getCheckedNodes = () => {
            return tree.value.getCheckedNodes()
        }

        const getHalfCheckedKeys = () => {
            return tree.value.getHalfCheckedKeys()
        }

        const setCheckedKeys = (data?: any) => {
            tree.value.setCheckedKeys(data)
        }
    
        return {
            tree,
            handleClose,
            handleSubmit,
            getCheckedNodes,
            getHalfCheckedKeys,
            setCheckedKeys
        }
    }
})
</script>

<style lang="scss" scoped>
    .dialog-footer{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>