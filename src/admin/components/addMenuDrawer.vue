<template>
    <el-drawer
        ref="drawerRef"
        v-model="drawerDialog"
        :title="title"
        :size="size"
        :direction="direction"
        custom-class="demo-drawer"
        @close="handleClose(menuFormRef)"
    >
        <div class="demo-drawer__content">
            <el-form ref="menuFormRef" :model="menuForm" label-width="100px" :rules="rules">
                <el-form-item label="父级菜单" prop="parentId">
                    <el-cascader v-model="menuForm.parentId" :options="menuList"
                        :props="{ checkStrictly: true, value: '_id', label: 'menuName' }" clearable>
                        <span>不选, 则直接创建一级菜单</span>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="菜单类型" prop="menuType">
                    <el-radio-group v-model="menuForm.menuType">
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="2">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-show="menuForm.menuType == 1">
                    <el-input v-model="menuForm.icon" placeholder="请输入岗位" />
                </el-form-item>
                <el-form-item label="路由地址" prop="path" v-show="menuForm.menuType == 1">
                    <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
                </el-form-item>
                <el-form-item label="权限标识" prop="menuCode" v-show="menuForm.menuType == 2">
                    <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
                </el-form-item>
                <el-form-item label="组件路径" prop="component" v-show="menuForm.menuType == 1">
                    <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
                </el-form-item>
                <el-form-item label="菜单状态" prop="menuState" v-show="menuForm.menuType == 1">
                    <el-radio-group v-model="menuForm.menuState">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <span class="dialog-footer">
                    <el-button @click="handleClose(menuFormRef)">取消</el-button>
                    <el-button type="primary" @click="handleSubmit(menuFormRef)">确定</el-button>
                </span>
            </div>
        </div>
    </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElDrawer } from 'element-plus'

export default defineComponent({
    name: 'menuFormDialog',
    props: {
        title: String,
        showModal: {
            type: Boolean,
            default: () => {
                return true
            }
        },
        size: [String, Number],
        direction: {
            type: String,
            default: () => {
                return 'rtl'
            }
        }
    },
    setup(props, ctx) {
        const menuFormRef = ref<FormInstance>()
        const drawerRef = ref<InstanceType<typeof ElDrawer>>()
        const menuForm = reactive({
            parentId: [null],
            menuType: 1,
            menuName: '',
            icon: '',
            path: '',
            menuCode: '',
            component: '',
            menuState: 1,
        })
        const rules = reactive<FormRules>({
            menuName: [
                { 
                    required: true, 
                    message: '请输入菜单名称', 
                    trigger: 'blur'
                },
                { 
                    min: 2,
                    max: 10,
                    message: '长度在2-8个字符', 
                    trigger: 'blur'
                },
            ],
        })
        const menuList = ref([])
        const drawerDialog = ref(false)
        const handleClose = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
            ctx.emit('handleClose')
        }
        const handleSubmit = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    ctx.emit('handleSubmit', menuForm)
                } else {
                    console.log('error submit', fields)
                }
            })
            
        }
        watch(() => props.showModal,(cur, prev) => {
            drawerDialog.value = cur
        },{})
        return {
            menuFormRef,
            menuForm,
            rules,
            menuList,
            drawerDialog,
            handleClose,
            handleSubmit
        }
    }
})
</script>