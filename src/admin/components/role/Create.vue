<template>
    <drawer
        :title="title"
        :drawerDialog="drawerDialog"
        @handleClose="handleClose(dialogFormRef)"
    >
        <div class="drawer__content">
            <el-form
                ref="dialogFormRef"
                :model="roleForm"
                label-width="100px"
                :rules="rules"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input
                        type="textarea"
                        :rows="2"
                        v-model="roleForm.remark"
                        placeholder="请输入备注"
                    />
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
import { defineComponent, defineAsyncComponent, ref, PropType } from 'vue'
import type { FormInstance } from 'element-plus'

type role = {
    roleName: string,
    remark: string
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
        roleForm: {
            type: Object as PropType<role>,
            default: () => {
                return []
            }
        }
    },
    components: {
        Drawer: defineAsyncComponent(() => import('@Admin/components/Drawer.vue'))
    },
    setup(props, ctx) {
        const dialogFormRef = ref<FormInstance>()
        
        const roleForm = props.roleForm
        
        const rules = props.rules
        
        const handleClose = (formEl: FormInstance | undefined) => {
            ctx.emit('handleClose', formEl)
            resetForm(formEl)
        }

        const handleSubmit = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    let params = {...roleForm}
                    ctx.emit('handleSubmit', params, formEl)
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
            roleForm, 
            dialogFormRef, 
            rules, 
            handleClose, 
            handleSubmit
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
