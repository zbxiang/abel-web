<template>
    <div class="user-manage">
        <div class="query-form">
            <el-form ref="queryForm" :inline="true" :model="user">
                <el-form-item label="用户ID" prop="userId">
                    <el-input v-model="user.userId" placeholder="请输入用户ID" />
                </el-form-item>
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="user.userName" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select v-model="user.state">
                        <el-option :value="0" label="所有"></el-option>
                        <el-option :value="1" label="在职"></el-option>
                        <el-option :value="2" label="离职"></el-option>
                        <el-option :value="3" label="试用期"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button @click="handleReset(queryForm)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button
                    type="primary"
                    @click="handleCreate"
                >新增</el-button>
                <el-button
                    type="danger"
                    @click="handlePatchDel"
                >批量删除</el-button>
            </div>
            <el-table :data="tableData.lists" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :formatter="item.formatter"
                >
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            size="small"
                            @click="handleDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <span class="total">&lt; {{tableData.total}} &gt;</span>
                <el-pagination
                    small
                    background
                    v-model:currentPage="tableData.current"
                    v-model:page-size="tableData.pageSize"
                    :page-sizes="tableData.pageSizes"
                    layout="sizes, prev, pager, next, jumper"
                    :total="tableData.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
    <!-- 用户新增 -->
    <create-user
        :title="userTitle"
        :drawerDialog="userDrawerDialog"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit" 
        :formData="userForm" 
        :rules="rules"
        :action="action"
        :roleList="roleList"
        :deptList="deptList"
    ></create-user>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, defineAsyncComponent, toRaw, getCurrentInstance, nextTick, markRaw, onMounted } from "vue"
import { FormInstance, ElMessage, FormRules, ElMessageBox, ElTable } from "element-plus"
import type { Action } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import utils from "./../utils/utils"

interface User {
    userId: string,
    userName: string,
    userEmail: string,
    mobile: string,
    job: string,
    state: number,
    roleList: any[],
    deptId: any,
    sex: number,
    remark: string
}

interface LooseObject {
    [key: string]: any
}

export default defineComponent({
    name: 'user',
    components: {
        createUser: defineAsyncComponent(() => import('@Admin/components/user/Create.vue'))
    },  
    setup() {
        const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
    
        // 初始化用户表单对象
        const user = reactive({
            userId: '',
            state: 1,
            userName: ''
        })

        const tableData = reactive({
            lists: [],
            pageSizes: [10, 30, 50],
            pageSize: 10,
            pageNum: 1,
            current: 1,
            total: 0,
            pageTotal: 0,
        })

        const columns = reactive([
            {
                label: "用户ID",
                prop: "userId",
            },
            {
                label: "用户名",
                prop: "userName",
            },
            {
                label: "用户邮箱",
                prop: "userEmail",
            },
            {
                label: "用户角色",
                prop: "role",
                formatter(row?: any, column?: any, value?: number) {
                    return {
                        0: "管理员",
                        1: "普通用户",
                    }[value];
                },
            },
            {
                label: "用户状态",
                prop: "state",
                formatter(row?: any, column?: any, value?: number) {
                    return {
                        1: "在职",
                        2: "离职",
                        3: "试用期",
                    }[value];
                }
            },
            {
                label: "注册时间",
                prop: "createTime",
                width: 180,
                formatter: (row?: any, column?: any, value?: any) => {
                    return utils.formateDate(new Date(value));
                }
            },
            {
                label: "最后登录时间",
                prop: "lastLoginTime",
                width: 180,
                formatter: (row?: any, column?: any, value?: any) => {
                    return utils.formateDate(new Date(value));
                }
            }
        ])

        const userForm = reactive({
            userName: '',
            userEmail: '',
            mobile: '',
            job: '',
            state: 1,
            roleList: [],
            deptId: null,
            sex: 0,
            remark: ''
        })

        const rules = reactive<FormRules>({
            userName: [{
                required: true,
                message: "请输入用户名称",
                trigger: "blur"
            }],
            userEmail: [
                { required: true, message: "请输入用户邮箱", trigger: "blur" }
            ],
            mobile: [
                {
                    pattern: /1[3-9]\d{9}/,
                    message: "请输入正确的手机号格式",
                    trigger: "blur",
                }
            ],
            roleList: [
                {
                    required: true,
                    message: "请选择用户所属角色",
                    trigger: "blur"
                }
            ],
            deptId: [
                {
                    required: true,
                    message: "请选择所属部门",
                    trigger: "blur"
                }
            ]
        })

        const queryForm = ref<FormInstance>()

        const userTitle = ref('用户新增')

        const userDrawerDialog = ref(false)

        const action = ref('add')

        const roleList = ref([])

        const deptList = ref([])

        const multipleTableRef = ref<InstanceType<typeof ElTable>>()
    
        const multipleSelection = ref<User []>([])

        const checkedUserIds = ref<string[]>([])
        
        onMounted(() => {
            query()
            getRoleAllList()
            getDeptList()
        })

        // 查询
        const query = async () => {
            const { pageSize, pageNum } = tableData
            const { userId, state, userName } = user
            const query: LooseObject = {}
            try {
                userId && (query.userId = userId)
                state && (query.state = state)
                userName && (query.userName = userName)
                query.pageSize = pageSize
                query.pageNum = pageNum
                const res = await $api.getUserList(query)
                if (res.code == 200) {
                    tableData.lists = res.data.lists
                    tableData.pageSize = res.data.pageSize
                    tableData.pageNum = res.data.pageNum
                    tableData.total = res.data.total
                    tableData.pageTotal = res.data.pageTotal
                }
            } catch (error: any) {
                throw new Error(error)
            }
        }

        // 重置
        const handleReset = (formEl: FormInstance | undefined) => {
            if (!formEl) return 
            formEl.resetFields()
            query()
        }

        // 新增
        const handleCreate = () => {
            userDrawerDialog.value = true
        }

        // 编辑
        const handleEdit = (rows: object) => {
            action.value = 'edit'
            userDrawerDialog.value = true
            nextTick(() => {
                Object.assign(userForm, rows)
            })
        }

        // 批量删除
        const handlePatchDel = () => {
            if (checkedUserIds.value.length == 0) {
                ElMessage({
                    message: '请选择要删除的用户',
                    type: 'error',
                })
                return
            }
            ElMessageBox.confirm('是否确认删除', {
                type: 'warning',
                icon: markRaw(Delete),
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(async () => { 
                const res = await $api.deleteUser({
                    userIds: checkedUserIds.value
                })
                if (res.code == 200) {
                    if(res.data.affectedRows > 0) {
                        ElMessage({
                            message: res.msg,
                            type: 'success',
                        })
                        query()
                    } else {
                        ElMessage({
                            message: '修改失败',
                            type: 'success',
                        })
                    }
                }
            }).catch((action: Action) => {
                console.log(action)
            })
        }

        // 删除
        const handleDel = (rows: any) => {
            const { userId } = rows
            ElMessageBox.confirm('是否需要删除这条记录', {
                type: 'warning',
                icon: markRaw(Delete),
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(async () => { 
                const res = await $api.deleteUser({
                    userIds: [userId]
                })
                if (res.code == 200) {
                    ElMessage({
                        message: res.msg,
                        type: 'success',
                    })
                    query()
                }
            }).catch((action: Action) => {
                console.log(action)
            })
        }

        const handleSelectionChange = (val: User[]) => {
            multipleSelection.value = val
            let arr: string[] = []
            val.map((item) => {
                arr.push(item.userId)
            })
            checkedUserIds.value = arr
        }

        const handleClose = async () => {
            action.value = 'add'
            userDrawerDialog.value = false
            userForm.userName = ''
            userForm.userEmail = ''
            userForm.mobile = ''
            userForm.job = ''
            userForm.state = 1
            userForm.roleList = []
            userForm.deptId = null
            userForm.sex = 0
            userForm.remark = ''
        }

        const handleSubmit = async (formData: any) => {
            try {
                let res
                let params = toRaw(formData)
                if (action.value === 'add') {
                    res = await $api.addUser(params)
                }
                if(action.value === 'edit') {
                    res = await $api.updateUser(params)
                }
                if (res.code == 200) {
                    ElMessage({
                        message: res.msg,
                        type: 'success',
                    })
                    handleClose()
                    query()
                }
            } catch(e: any) {
                throw new Error(e)
            }
        }

        /**
         * 翻页 页数
         */
        const handleCurrentChange = (val: number) => {
            tableData.pageNum = val
            query()
        }

        /**
         * 翻页 条数
         */
        const handleSizeChange = (val: number) => {
            tableData.pageNum = 1
            tableData.pageSize = val
            query()
        }

        /**
         * 角色列表
         */
        const getRoleAllList = async () => {
            const res = await $api.getRoleAllList()
            if (res.code == 200) {
                roleList.value = res.data
            }
        }

        /**
         * 部门列表
         */
        const getDeptList = async () => {
            const res = await $api.getDeptList()
            if (res.code == 200) {
                deptList.value = res.data
            }
        }

        return {
            user,
            queryForm,
            tableData,
            columns,
            userForm,
            rules,
            userTitle,
            action,
            userDrawerDialog,
            roleList,
            deptList,
            multipleTableRef,
            multipleSelection,
            checkedUserIds,
            query,
            handleReset,
            handleCreate,
            handlePatchDel,
            handleEdit,
            handleDel,
            handleSelectionChange,
            handleCurrentChange,
            handleSizeChange,
            handleClose,
            handleSubmit,
            getRoleAllList,
            getDeptList
        }
    }
})
</script>

<style lang="scss" scoped>
</style>