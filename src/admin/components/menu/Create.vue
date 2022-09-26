<template>
    <drawer
        :title="title"
        :drawerDialog="drawerDialog"
        @handleClose="handleClose(formRef)"
    >
        <div class="drawer__content">
            <el-form ref="formRef" :model="formData" label-width="100px" :rules="rules">
                <el-form-item label="父级菜单" prop="parentId">
                    <el-cascader v-model="formData.parentId" :options="menuList"
                        :props="{ checkStrictly: true, value: '_id', label: 'menuName' }" clearable>
                        <span>不选, 则直接创建一级菜单</span>
                    </el-cascader>
                </el-form-item>
                
                <el-form-item label="菜单类型" prop="menuType">
                    <el-radio-group v-model="formData.menuType">
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="2">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="formData.menuType == 1 ? '菜单名称' : '按钮名称'" prop="menuName">
                    <el-input v-model="formData.menuName" :placeholder="formData.menuType == 1 ? '请输入菜单名称' : '请输入按钮名称'" />
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-show="formData.menuType == 1">
                    <el-input v-model="formData.icon" placeholder="请输入图标" />
                </el-form-item>
                <el-form-item label="路由地址" prop="url" v-show="formData.menuType == 1">
                    <el-input v-model="formData.url" placeholder="请输入路由地址" />
                </el-form-item>
                <el-form-item label="权限标识" prop="menuCode" v-show="formData.menuType == 2">
                    <el-input v-model="formData.menuCode" placeholder="请输入权限标识" />
                </el-form-item>
                <el-form-item label="组件路径" prop="component" v-show="formData.menuType == 1">
                    <el-input v-model="formData.component" placeholder="请输入组件路径" />
                </el-form-item>
                <el-form-item label="排序字段" prop="sort">
                    <el-input v-model="formData.sort" placeholder="请输入排序字段" />
                </el-form-item>
                <el-form-item label="菜单状态" prop="menuState" v-show="formData.menuType == 1">
                    <el-radio-group v-model="formData.menuState">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="drawer__footer">
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleSubmit(formRef)">确定</el-button>
                    <el-button @click="handleClose(formRef)">取消</el-button>
                </span>
            </div>
        </div>
    </drawer>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, PropType } from 'vue'
import type { FormInstance } from 'element-plus'

interface formType {
    parentId: any,
    menuType: number,
    menuName: string,
    icon: string,
    url: string,
    menuCode: string,
    component: string,
    sort: number,
    menuState: string
}

export default defineComponent({
    name: 'Create',
    emits: ['handleSubmit','handleClose'],
    props: {
        drawerDialog: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        title: String,
        rules: Object,
        formData: {
            type: Object as PropType<formType>,
            default: () => {
                return {}
            }
        },
        menuList: Array
    },
    components: {
        Drawer: defineAsyncComponent(() => import('@Admin/components/Drawer.vue'))
    },
    setup(props, ctx) {
        const formRef = ref<FormInstance>()

        const formData = props.formData

        const rules = props.rules

        const handleClose = (formEl: FormInstance | undefined) => {
            ctx.emit('handleClose')
            resetForm(formEl)
        }

        const handleSubmit = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    ctx.emit('handleSubmit', formData)
                } else {
                    console.log('error submit!', fields)
                }
            })
        }

        const resetForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
        }

        return {
            formData,
            formRef,
            rules,
            handleClose,
            handleSubmit,
            resetForm
        }
    },
})
</script>

<style lang="scss" scoped>
    .dialog-footer{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
