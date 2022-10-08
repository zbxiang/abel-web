<template>
    <div class="login-wrapper">
        <div class="modal">
            <el-form :model="formData" status-icon :rules="rules" ref="ruleFormRef" :size="formSize">
                <div class="title">zbxiang 后台管理系统</div>
                <el-form-item prop="userName">
                    <el-input type="text" prefix-icon="el-icon-user" v-model="formData.userName" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" prefix-icon="el-icon-view" v-model="formData.userPwd"
                        placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="btn-login" 
                        :loading="loading"
                        @click="login(ruleFormRef)"
                    >
                      登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { UserState } from '../../store/types'
import useUserStore from '../../store/modules/user'

export default defineComponent({
    name: 'Login',
    setup() {
        const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
        const router = useRouter()
        const route = useRoute()
        const userStore = useUserStore()
        const formData = reactive({
            userName: 'admin',
            userPwd: '123456'
        })
        const rules = reactive<FormRules>({
            userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        })
        const formSize = ref('default')
        const loading = ref(false)
        const ruleFormRef = ref<FormInstance>()

        /**
         * 登录
         */
        const login = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate(async (valid, fields) => {
                if (valid) {
                    loading.value = true
                    $api.login(formData).then(({ data }: Response) => {
                        userStore.saveUser(data as UserState).then(() => {
                            router.replace({
                                path: route.query.redirect
                                    ? (route.query.redirect as string)
                                    : '/',
                            }).then(() => {
                                loading.value = false
                            })
                        })
                    }).catch((error: any) => {
                        loading.value = false
                        // ElMessage.error(error.message)
                    })
                } else {
                    loading.value = false
                    return false
                }
            })
        }

        return {
            formData,
            rules,
            formSize,
            ruleFormRef,
            loading,
            router,
            login
        }
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