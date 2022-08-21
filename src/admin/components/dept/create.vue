<template>
    <drawer
        :title="title"
        :drawerDialog="drawerDialog"
        @handleClose="handleClose(dialogFormRef)"
    >
        <div class="drawer__content">
            <el-form
                ref="dialogFormRef"
                :model="formData"
                label-width="120px"
                :rules="rules"
            >
                <el-form-item label="上级部门" prop="parentId">
                    <el-cascader
                        placeholder="请选择上级部门"
                        v-model="formData.parentId"
                        :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
                        clearable
                        :options="deptList"
                        :show-all-levels="true"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="部门名称" prop="deptName">
                    <el-input
                        placeholder="请输入部门名称"
                        v-model="formData.deptName"
                    ></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="user">
                    <el-select
                        placeholder="请选择部门负责人"
                        v-model="formData.user"
                        @change="handleUser"
                    >
                        <el-option
                            v-for="item in userList"
                            :key="item.userId"
                            :label="item.userName"
                            :value="`${item.userId}/${item.userName}/${item.userEmail}`"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="负责人邮箱" prop="userEmail">
                    <el-input
                        placeholder="请输入负责人邮箱"
                        v-model="formData.userEmail"
                        disabled
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="drawer__footer">
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleSubmit(dialogFormRef)">确定</el-button>
                    <el-button @click="handleClose(dialogFormRef)">取消</el-button>
                </span>
            </div>
        </div>
    </drawer>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import type { FormInstance } from 'element-plus'

/**
 * 处理新增角色逻辑
 */
const useDrawerDialogEffect = (props?: any, ctx?: any) => {
    const dialogFormRef = ref<FormInstance>()
    const formData = props.formData
    const rules = props.rules
    const action = props.action
    const handleClose = (formEl: FormInstance | undefined) => {
        ctx.emit('handleClose', formEl)
    }
    const handleSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                ctx.emit('handleSubmit', formData, formEl)
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    const handleUser = (val: string) => {
        const [userId, userName, userEmail] = val.split('/')
        Object.assign(formData, {userId, userName, userEmail})
    }
    const _resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return 
        formEl.resetFields()
    }
    return {
        formData,
        dialogFormRef,
        rules,
        action,
        handleClose,
        handleUser,
        handleSubmit, 
        _resetForm
    }
}

export default defineComponent({
    name: 'Establish',
    emits: ['handleSubmit','handleClose'],
    props: {
        drawerDialog: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        title: String,
        action: String,
        rules: Object,
        formData: Object,
        deptList: Array,
        userList: Array
    },
    components: {
        Drawer: defineAsyncComponent(() => import('@C/components/Drawer.vue'))
    },
    setup(props, ctx) {
        return { ...useDrawerDialogEffect(props, ctx) }
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
