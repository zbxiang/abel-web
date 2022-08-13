<template>
    <div class="role-manage">
        <div class="query-form">
            <el-form ref="formRef" :inline="true" :model="queryForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input @keyup.enter="query" v-model="queryForm.roleName" placeholder="请输入角色名称" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button @click="handleReset(formRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary" @click="handleAdd">创建</el-button>
            </div>
            <el-table :data="tableData.lists">
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :formatter="item.formatter"
                >
                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleOpenPermission(scope.row)"
                        >设置权限</el-button
                        >
                        <el-button
                            type="danger"
                            size="mini"
                            @click="handleDel(scope.row._id)"
                        >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination"
                v-model:currentPage="tableData.current"
                :page-sizes="[10, 20, 30, 40, 50]"
                small
                background
                layout="prev, pager, next, sizes"
                :total="tableData.total"
                :page-size="tableData.pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
    <!-- 创建角色 -->
    <establish ref="drawerRoleRef" :title="roleTitle" :drawerDialog="roleDrawerDialog" @handleClose="handleClose" @handleSubmit="handleSubmit" :roleForm="roleForm" :rules="rules"></establish>
    <!-- 权限 -->
    <permission :drawerDialog="permissionDrawerDialog" :curRoleName="curRoleName" :menuList="menuList" @handleClose="handlePerClose" @handleSubmit="handlePerSubmit"></permission>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref, getCurrentInstance, nextTick, markRaw } from 'vue'
import { FormInstance, ElMessage, FormRules, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import utils from '../utils/utils'

/**
 * 查询 角色 列表
 */ 
const useQueryRoleEffect = (props?:any, ctx?:any) => {
    const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
    const formRef = ref<FormInstance>()
    const drawerRoleRef = ref<any>()
    const queryForm = reactive({roleName: ''})
    const roleDrawerDialog = ref(false)
    const permissionDrawerDialog = ref(false)
    const curRoleName = ref()
    const roleTitle = ref()
    const menuList = ref()
    const roleForm = reactive({_id: '', roleName: '', remark: ''})
    let action:string = ''
    const rules = reactive<FormRules>({
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    })
    const columns = [
        {label: '角色名称', prop: 'roleName'},
        {label: '备注', prop: 'remark'},
        {label: '权限列表', prop: 'permissionList', width: 200},
        {label: '更新时间', prop: 'updateTime', formatter(row?:any, column?:any, value?:any) {
            return utils.formateDate(new Date(value))
        }},
        {label: '创建时间', prop: 'createTime', formatter(row?:any, column?:any, value?:any) {
            return utils.formateDate(new Date(value))
        }}
    ]
    const tableData = reactive({
        lists: [],
        pageSize: 10,
        pageNum: 1,
        current: ref(1),
        total: 0,
        pageTotal: 0
    })

    // 重置
    const handleReset = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
        // 查询
        query()
    }

    // 查询
    const query = async () => {
        try {
            const { pageSize, pageNum } = tableData
            const {roleName} = queryForm
            interface LooseObject {
                [key: string]: any
            }
            const query: LooseObject = {}
            query.pageSize = pageSize
            query.pageNum = pageNum
            roleName && (query.roleName = roleName)
            const res = await $api.getRoleList(query)
            if (res.code == 200) {
                tableData.lists= res.data.lists
                tableData.pageSize = res.data.pageSize
                tableData.pageNum = res.data.pageNum
                tableData.total = res.data.total
                tableData.pageTotal = res.data.pageTotal
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    /**
     * 创建
     */
    const handleAdd = () => {
        roleDrawerDialog.value = true
        action = 'create'
        roleTitle.value = '新增角色'
    }
    
    /**
     * 编辑
     */
    const handleEdit = (rows?: any) => {
        roleDrawerDialog.value = true
        action = 'edit'
        roleTitle.value = '编辑角色'
        nextTick(() => {
            roleForm._id = rows._id
            roleForm.roleName = rows.roleName
            roleForm.remark = rows.remark
        })
    }

    /**
     * 删除
     */
    const handleDel = (_id?: any) => {
        ElMessageBox.confirm('是否需要删除这条记录', {
            type: 'warning',
            icon: markRaw(Delete),
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        }).then(async () => { 
            const res = await $api.roleDelete({ _id })
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
    
    /**
     * 设置权限
     */
    const handleOpenPermission = (rows?: any) => {
        curRoleName.value = rows.roleName
        permissionDrawerDialog.value = true
    }
    
    /**
     * 关闭
     */
    const handleClose = (formEl: FormInstance | undefined) => {
        roleDrawerDialog.value = false
        roleTitle.value = '新增角色'
        drawerRoleRef.value._resetForm(formEl)
    }

    /**
     * 提交
     */
    const handleSubmit = async (options?: any, formEl: FormInstance | undefined) => {
        try {
            let res = null
            if (action === 'create') {
                res = await $api.roleAdd(options)
            } else if (action === 'edit') {
                res = await $api.roleUpdate(options)
            } else {
                res = await $api.roleDelete(options)
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
     * 权限 关闭
     */
    const handlePerClose = () => {
        permissionDrawerDialog.value = false
    }

    /**
     * 权限 提交
     */
    const handlePerSubmit = () => {}

    return { queryForm, formRef, roleTitle, columns, tableData, curRoleName, menuList, handleReset, query, handleEdit, handleOpenPermission, handleDel, roleDrawerDialog, permissionDrawerDialog, drawerRoleRef, roleForm, rules, handleAdd, handleSubmit, handleClose, handleCurrentChange, handleSizeChange, handlePerClose, handlePerSubmit}
}

export default defineComponent({
    name: 'Role',
    components: {
        Establish: defineAsyncComponent(() => import('../components/role/Establish.vue')),
        Permission: defineAsyncComponent(() => import('../components/role/Permission.vue')),
    },
    created() {
        // 查询角色列表
        this.query()
    },
    setup(props, ctx) {
        return { ...useQueryRoleEffect(props, ctx) }
    }
})
</script>

<style lang="scss">
</style>
