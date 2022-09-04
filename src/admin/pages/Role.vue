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
                            size="small"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button
                        >
                        <el-button
                            size="small"
                            type="primary"
                            @click="handleOpenPermission(scope.row)"
                        >设置权限</el-button
                        >
                        <el-button
                            type="danger"
                            size="small"
                            @click="handleDel(scope.row._id)"
                        >删除</el-button
                        >
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
    <!-- 创建角色 -->
    <create-role
        :title="roleTitle"
        :drawerDialog="roleDrawerDialog"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit"
        :roleForm="roleForm"
        :rules="rules"
    ></create-role>
    <!-- 权限 -->
    <permission
        ref="permissionRef"
        :drawerDialog="permissionDrawerDialog"
        :curRoleName="curRoleName"
        :menuList="menuList"
        @handleClose="handlePermissionClose"
        @handleSubmit="handlePermissionSubmit">
    </permission>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref, getCurrentInstance, nextTick, markRaw } from 'vue'
import { FormInstance, ElMessage, FormRules, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import utils from '../utils/utils'

interface LooseObject {
    [key: string]: any
}

export default defineComponent({
    name: 'Role',
    components: {
        createRole: defineAsyncComponent(() => import('../components/role/Create.vue')),
        Permission: defineAsyncComponent(() => import('../components/role/Permission.vue')),
    },
    created() {
        // 查询角色列表
        this.query()
        // 菜单列表初始化
        this.getMenuList()
    },
    setup(props: any, ctx: any) {
        const $api = getCurrentInstance()?.appContext.config.globalProperties.$api

        const queryForm = reactive({roleName: ''})

        const roleForm = reactive({
            _id: '', 
            roleName: '', 
            remark: ''
        })

        const rules = reactive<FormRules>({
            roleName: [
                { 
                    required: true, 
                    message: '请输入角色名称', 
                    trigger: 'blur'
                }
            ]
        })

        const columns = [
            {
                label: '角色名称', 
                prop: 'roleName'
            },
            {
                label: '备注', 
                prop: 'remark'
            },
            {
                label: '权限列表',
                prop: 'permissionList', 
                width: 200,
                formatter(row?:any, column?:any, value?:any) {
                    let names: any[] = [];
                    let list = value.halfCheckedKeys || [];
                    list.map((key: string|number) => {
                        console.log('sdgksjdgkjsdjgdsZBxiangs082790')
                        console.log(actionMap.value)
                        // let name = actionMap.value[key];
                        // if (key && name) names.push(name);
                    });
                    return names.join(",");
                },
            },
            {
                label: '更新时间',
                prop: 'updateTime', 
                formatter(row?:any, column?:any, value?:any) {
                    return utils.formateDate(new Date(value))
                }
            },
            {
                label: '创建时间',
                prop: 'createTime',
                formatter(row?:any, column?:any, value?:any) {
                    return utils.formateDate(new Date(value))
                }
            }
        ]

        const tableData = reactive({
            lists: [],
            pageSizes: [10, 30, 50],
            pageSize: 10,
            pageNum: 1,
            current: 1,
            total: 0,
            pageTotal: 0
        })

        const formRef = ref<FormInstance>()

        const roleDrawerDialog = ref(false)

        const permissionDrawerDialog = ref(false)

        const curRoleId = ref()
        
        const curRoleName = ref()

        const permissionRef = ref()
        
        const roleTitle = ref('新增角色')
        
        const menuList = ref([])
        
        const actionMap = ref({})

        const action = ref('add')

        // 查询
        const query = async () => {
            try {
                const { pageSize, pageNum } = tableData
                const {roleName} = queryForm
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
            } catch (e: any) {
                throw new Error(e)
            }
        }

        // 重置
        const handleReset = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
            // 查询
            query()
        }

        // 创建
        const handleAdd = () => {
            roleDrawerDialog.value = true
            action.value = 'add'
            roleTitle.value = '新增角色'
        }

        // 编辑
        const handleEdit = (rows?: any) => {
            roleDrawerDialog.value = true
            action.value = 'edit'
            roleTitle.value = '编辑角色'
            nextTick(() => {
                roleForm._id = rows._id
                roleForm.roleName = rows.roleName
                roleForm.remark = rows.remark
            })
        }

        // 删除
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

        // 关闭
        const handleClose = (formEl: FormInstance | undefined) => {
            roleDrawerDialog.value = true
            action.value = 'add'
            roleTitle.value = '新增角色'
        }

        // 提交
        const handleSubmit = async (options?: any, formEl: FormInstance | undefined) => {
            try {
                let res = null
                if (action.value === 'add') {
                    res = await $api.roleAdd(options)
                } else if (action.value === 'edit') {
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
            } catch(e: any) {
                throw new Error(e)
            }
        }

        // 设置权限
        const handleOpenPermission = (rows?: any) => {
            curRoleId.value = rows._id
            curRoleName.value = rows.roleName
            permissionDrawerDialog.value = true
            if (rows.permissionList) {
                let { checkedKeys } = rows.permissionList
                setTimeout(() => {
                    permissionRef.value.setCheckedKeys(checkedKeys)
                })
            }
        }

        // 权限 关闭
        const handlePermissionClose = () => {
            permissionDrawerDialog.value = false
            setTimeout(() => {
                permissionRef.value.setCheckedKeys([])
            })
        }

        // 权限 提交
        const handlePermissionSubmit = async () => {
            let nodes = permissionRef.value.getCheckedNodes()
            let halfKeys = permissionRef.value.getHalfCheckedKeys()
            let checkedKeys: any[] = []
            let parentKeys: any[] = []
            nodes.map((node: { children: any; _id: any }) => {
                if (!node.children) {
                    checkedKeys.push(node._id)
                } else {
                    parentKeys.push(node._id)
                }
            })
            let params = {
                _id: curRoleId.value,
                permissionList: {
                    checkedKeys,
                    halfCheckedKeys: parentKeys.concat(halfKeys)
                }
            }
            const res = await $api.updatePermission(params)
            if (res.code == 200) {
                permissionDrawerDialog.value = false
                ElMessage({
                    message: res.msg,
                    type: 'success',
                })
                query()
            }
        }

        // 菜单列表初始化
        const getMenuList = async () => {
            try {
                const res = await $api.getMenuList()
                if (res.code == 200) {
                    menuList.value = res.data
                    getActionMap(res.data)
                }
            } catch (e: any) {
                throw new Error(e)
            }
        }

        const getActionMap = (list: any) => {
            let actionMap = {}
            const deep = (arr: any[]) => {
                while (arr.length) {
                    let item = arr.pop()
                    if (item.children && item.action) {
                        actionMap[item._id] = item.menuName
                    }
                    if (item.children && !item.action) {
                        deep(item.children)
                    }
                }
            }
            deep(JSON.parse(JSON.stringify(list)))
            actionMap.value = actionMap
        }

        // 翻页 页数
        const handleCurrentChange = (val: number) => {
            tableData.pageNum = val
            query()
        }

        // 翻页 条数
        const handleSizeChange = (val: number) => {
            tableData.pageNum = 1
            tableData.pageSize = val
            query()
        }

        return {
            queryForm,
            formRef,
            roleTitle,
            columns,
            tableData,
            curRoleId,
            curRoleName,
            menuList,
            actionMap,
            getActionMap,
            handleReset,
            query,
            handleEdit,
            handleOpenPermission,
            handleDel,
            roleDrawerDialog,
            permissionDrawerDialog,
            roleForm, 
            rules,
            permissionRef,
            getMenuList,
            handleAdd, 
            handleSubmit, 
            handleClose, 
            handlePermissionClose, 
            handlePermissionSubmit,
            handleCurrentChange,
            handleSizeChange
        }
    }
})
</script>

<style lang="scss">
</style>
