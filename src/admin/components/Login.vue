<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form :model="formData" status-icon :rules="rules" ref="ruleFormRef" :size="formSize">
        <div class="title">后台管理系统</div>
        <el-form-item prop="userName">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="formData.userName"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            v-model="formData.userPwd"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import $services from '@C/services'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
    setup() {
        const router = useRouter()
        const store = useStore()
        const formSize = ref('default')
        const ruleFormRef = ref<FormInstance>()
        const formData = reactive({
            userName: '',
            userPwd: '',
        })
        const rules = reactive<FormRules>({
            userName: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
            userPwd: [{ required: true, message: '请输入密码', trigger: 'blur'}]
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
        const login = () => {
          $services.userModule.login(formData).then(async (res: any) => {
            store.commit("saveUserInfo", res)
            router.push({
            	path:'/welcome',
            })
          })
        }
        return {
            formSize,
            ruleFormRef,
            formData,
            rules,
            login,
            submitForm,
            resetForm
        }
    },
})
</script>
>

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