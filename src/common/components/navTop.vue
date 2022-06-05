<template>
    <div class="nav-top">
        <div class="nav-left">
            <div class="menu-fold" @click="toggle"><el-icon><Fold /></el-icon></div>
            <div class="bread">面包屑</div>
        </div>
        <div class="user-info">
            <el-badge :is-dot="true" class="notice">
                <el-icon><Bell /></el-icon>
            </el-badge>

            <el-dropdown @command="handleLogout">
                <span class="user-link">
                    {{userInfo.value.userName}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="email">邮箱：{{userInfo.value.userEmail}}</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, getCurrentInstance, reactive, ref, Ref } from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import $services from '@C/services'
    import { ElMessage } from 'element-plus'

    export default defineComponent({
        name: 'navTop',
        created() {
            this.getNoticeCount()
        },
        setup() {
            const $emitter = getCurrentInstance()?.appContext.config.globalProperties.$emitter
            const store = useStore()
            const router = useRouter()

            let userInfo = reactive({
                value: {
                    userName: 'abel',
                    userEmail: '144653975@qq.com',
                }
            })

            let noticeCount = ref()

            const handleLogout = (command: string | number | object) => {
                if (command == 'email') return
                if (command == 'logout') {
                    // ElMessage(`click on item ${command}`)
                    userInfo.value = {
                        userName: '',
                        userEmail: '',
                    }
                    store.commit('saveUserInfo', '')
                    router.push({
                        path:'/login',
                    })
                }
            }

            const getNoticeCount = async () => {
                try {
                    const count = await $services.userModule.noticeCount()
                    noticeCount.value = count
                }catch(error) {
                    console.error(error)
                }
            }

            const toggle = () => {
                $emitter.emit('expendCollapse')
            }

            return {
                userInfo,
                noticeCount,
                handleLogout,
                getNoticeCount,
                toggle
            }
        },
    })
</script>

<style scoped lang="scss">
    .nav-top{
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 0 20px;
        .nav-left{
            display: flex;
            align-items: center;
            .menu-fold{
                display: flex;
                padding-right: 15px;
                font-size: 18px;
                cursor: pointer;
            }
        }
        .user-info{
            display: flex;
            align-items: center;
            .notice{
                line-height: 30px;
                margin-right: 15px;
            }
            .user-link{
                cursor: pointer;
                color: #409eff;
            }
        }
    }
</style>