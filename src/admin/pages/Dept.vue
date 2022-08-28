<template>
    <div class="user-manage">
        <div class="query-form">
            <el-form ref="queryFormRef" :inline="true" :model="dept">
                <el-form-item label="部门名称">
                    <el-input
                        placeholder="请输入部门名称"
                        v-model="dept.deptName"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button @click="handleReset(queryFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
        <div class="action">
            <el-button type="primary" @click="handleOpen">创建</el-button>
        </div>
        <el-table
            :data="deptList"
            row-key="_id"
            :tree-props="{ children: 'children' }"
            stripe
        >
            <el-table-column
                v-for="item in columns"
                :key="item.prop"
                v-bind="item"
            ></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.row)">
                        编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.row._id)">
                        删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
    </div>

    <!-- 新增/编辑部门 -->
    <create-dept
        ref="drawerDeptRef"
        :title="deptTitle"
        :drawerDialog="deptDrawerDialog"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit" 
        :formData="deptForm" 
        :rules="rules"
        :action="action"
        :deptList="deptList"
        :userList="userList"
    ></create-dept>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref, getCurrentInstance, toRaw, nextTick, markRaw } from 'vue'
import { FormInstance, ElMessage, FormRules, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import utils from '../utils/utils'

/**
 * 查询 部门 列表
 */
const useQueryDeptEffect = (props?:any, ctx?:any) => {
    const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
    
    const dept = reactive({
        deptName: ''
    })

    const queryFormRef = ref<FormInstance>()

    const drawerDeptRef = ref()

    const deptTitle = ref('创建部门')

    const action = ref('add')

    const deptDrawerDialog = ref(false)

    const deptList = ref([])

    const userList = ref([])

    const columns = reactive([
        {
            label: "部门名称",
            prop: "deptName",
        },
        {
            label: "负责人",
            prop: "userName",
        },
        {
            label: "更新时间",
            prop: "updateTime",
        },
        {
            label: "创建时间",
            prop: "createTime",
        }
    ])

    const deptForm = reactive({
        parentId: [null],
        deptName: '',
        user: '',
        userEmail: ''
    })

    const rules = reactive({
        parentId: [{
            required: true,
            message: "请选择上级部门",
            trigger: "blur"
        }],
        deptName: [{
            required: true,
            message: "请输入部门名称",
            trigger: "blur"
        }],
        user: [{
            required: true,
            message: "请选择负责人",
            trigger: "blur"
        }]
    })

    interface LooseObject {
        [key: string]: any
    }
    
    // 查询
    const query = async () => {
        const { deptName } = dept
        const query:LooseObject = {}
        deptName && (query.deptName = deptName)
        try {
            const res = await $api.getDeptList(query)
            if (res.code == 200) {
                deptList.value = res.data
            }
        } catch (error) {}
    }

    // 重置
    const handleReset = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
        // 查询
        query()
    }

    const getAllUserList = async () => {
        const res = await $api.getAllUserList()
        if (res.code == 200) {
            userList.value = res.data
        }
    }

    // 创建
    const handleOpen = () => {
        action.value = 'add'
        deptDrawerDialog.value = true
    }

    // 编辑
    const handleEdit = () => {}

    // 删除
    const handleDel = () => {}

    // 关闭
    const handleClose = (formEl: FormInstance | undefined) => {
        action.value = 'add'
        deptDrawerDialog.value = false
        drawerDeptRef.value.resetForm(formEl)
    }

    // 提交
    const handleSubmit = async (formData: any, formEl: FormInstance | undefined) => {
        try {
            let res
            let params = toRaw(formData)
            if (action.value === 'add') {
                res = await $api.addDept(params)
            }
            if(action.value === 'edit') {
                res = await $api.updateDept(params)
            }
            if (res.code == 200) {
                ElMessage({
                    message: res.msg,
                    type: 'success',
                })
                handleClose(formEl)
                query()
            }
        } catch(e) {
            throw new Error(e)
        }
    }
    
    return {
        dept,
        queryFormRef,
        columns,
        deptTitle,
        deptDrawerDialog,
        drawerDeptRef,
        deptForm,
        rules,
        action,
        deptList,
        userList,
        query,
        handleReset,
        handleOpen,
        handleEdit,
        handleDel,
        handleClose,
        handleSubmit,
        getAllUserList
    }
}

export default defineComponent({
    name: 'Dept',
    components: {
        createDept: defineAsyncComponent(() => import('../components/dept/Create.vue')),
    },
    created() {
        // 查询部门列表
        this.query()
        // 用户列表
        this.getAllUserList()
    },
    setup(props, ctx) {
        return { ...useQueryDeptEffect(props, ctx) }
    }
})

</script>