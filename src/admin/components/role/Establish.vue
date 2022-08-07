<template>
    <drawer
        title="新增角色"
        :drawerDialog="drawerDialog"
        @handleClose="handleClose"
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
                    <el-button @click="handleClose">取消</el-button>
                </span>
            </div>
        </div>
    </drawer>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, reactive, getCurrentInstance } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

/**
 * 处理新增角色逻辑
 */
const useDrawerDialogEffect = (ctx?: any) => {
    const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
    const roleForm = reactive({roleName: '', remark: ''})
    const dialogFormRef = ref<FormInstance>()
    const rules = reactive<FormRules>({
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    })
    const handleClose = () => {
        ctx.emit('handleClose')
    }
    const handleSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                roleOperate()
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    const roleOperate = async () => {
        const action = 'create'
        let params = {...roleForm, action}
        let res = await $api.roleOperate(params)
        console.log('dgsgksdjgksjdgjsd')
        console.log(res)
    }
    return { roleForm, dialogFormRef, rules, handleClose, handleSubmit }
}

export default defineComponent({
    name: 'Establish',
    emits: ['handleClose'],
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
    setup(props, ctx) {
        const { roleForm, dialogFormRef, rules, handleClose, handleSubmit } = useDrawerDialogEffect(ctx)
        return {roleForm, dialogFormRef, rules, handleClose, handleSubmit}
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
