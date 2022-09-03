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
                    <el-button type="primary" class="btn-login" @click="login(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import $storage from '../utils/storage'
import utils from '../utils/utils'
const modules = import.meta.glob('./../pages/*/*.vue')

export default defineComponent({
    name: 'Login',
    setup() {
        const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
        const store = useStore()
        const router = useRouter()

        const formData = reactive({
            userName: 'admin',
            userPwd: '123456'
        })
        
        const rules = reactive<FormRules>({
            userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        })

        const formSize = ref('default')

        const ruleFormRef = ref<FormInstance>()

        /**
         * 登录
         */
        const login = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate(async (valid, fields) => {
                if (valid) {
                    const res = await $api.login(formData)
                    if (res.code == 200) {
                        store.commit("saveUserInfo", res.data)
                        await loadAsyncRoutes()
                        router.push('/welcome')
                    }
                } else {
                    return false
                }
            })
        }

        /**
         * 动态加载路由
         */
        const loadAsyncRoutes = async () => {
            let userInfo = $storage.getItem('userInfo') || {}
            if (userInfo.token) {
                try {
                    const { menuList } = await $api.getPermissionList()
                    let routes = utils.generateRoute(menuList)
                    routes.map((route) => {
                        modules[`./../pages/${route.component}.vue`]
                        router.addRoute('home', route)
                    })
                } catch (error) {}
            }
        }

        return {
            formData,
            rules,
            formSize,
            ruleFormRef,
            store,
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