<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form :model="formData" status-icon :rules="rules" ref="ruleFormRef" :size="formSize">
                <div class="title">后台管理系统</div>
                <el-form-item prop="userName">
                    <el-input type="text" prefix-icon="el-icon-user" v-model="formData.userName" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" prefix-icon="el-icon-view" v-model="formData.userPwd"
                        placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn-login" @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <Toast v-if="show" :message="toastMessage"></Toast>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Toast, { useToastEffect } from '@C/components/Toast.vue'
import storage from '../utils/storage'

// 处理登录逻辑
const useLoginEffect = (showToast?: any) => {
    const router = useRouter()
    const store = useStore()
    const $storage = getCurrentInstance()?.appContext.config.globalProperties.$storage
    const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    const formData = reactive({ userName: '', userPwd: '' })
    const rules = reactive<FormRules>({
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                login()
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    const login = async () => {
        try {
            const res = await $api.login(formData)
            if (res.code == 200) {
                store.commit("saveUserInfo", res.data)
                await loadAsyncRoutes()
            }else {
                showToast('登录失败')
            }
        } catch (e) {
            showToast('请求失败')
        }
    }
    const loadAsyncRoutes = async () => {
        let userInfo = storage.getItem('userInfo') || {}
        if (userInfo.token) {
            try {
                const { menuList } = await $api.getPermissionList()
            } catch (error) {}
        }
    }

    return {formData, formSize, ruleFormRef, rules, submitForm, resetForm, login}
}

export default defineComponent({
    name: 'Login',
    components: {Toast},
    setup() {
        const { show, toastMessage, showToast } = useToastEffect()
        const { formData, formSize, ruleFormRef, rules, submitForm, resetForm, login } = useLoginEffect(showToast)
        return { show, toastMessage, showToast, formData, formSize, ruleFormRef, rules, submitForm, resetForm, login }
    },
})
</script>

<style lang="scss">
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fcff;
    width: 100vw;
    height: 100vh;

    .modal {
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 3px #c7c9cb4d;

        .title {
            font-size: 32px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
        }

        .btn-login {
            width: 100%;
        }
    }
}
</style>