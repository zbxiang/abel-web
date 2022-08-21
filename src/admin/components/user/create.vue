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
                label-width="100px"
                :rules="rules"
            >
                <el-form-item label="用户名" prop="userName">
                    <el-input
                        v-model="formData.userName"
                        :disabled="action == 'edit'"
                        placeholder="请输入用户名称"
                    />
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input
                        v-model="formData.userEmail"
                        :disabled="action == 'edit'"
                        placeholder="请输入用户邮箱"
                    >
                        <template #append>@qq.com</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="formData.mobile" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="岗位" prop="job">
                    <el-input v-model="formData.job" placeholder="请输入岗位" />
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select v-model="formData.state">
                        <el-option :value="1" label="在职"></el-option>
                        <el-option :value="2" label="离职"></el-option>
                        <el-option :value="3" label="试用期"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统角色" prop="roleList">
                    <el-select
                        v-model="formData.roleList"
                        placeholder="请选择用户系统角色"
                        multiple
                        style="width: 100%"
                    >
                        <el-option
                            v-for="role in roleList"
                            :key="role._id"
                            :label="role.roleName"
                            :value="role._id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="deptId">
                    <el-cascader
                        v-model="formData.deptId"
                        placeholder="请选择所属部门"
                        :options="deptList"
                        :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
                        clearable
                        style="width: 100%"
                    ></el-cascader>
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
        roleList: Array,
        deptList: Array
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