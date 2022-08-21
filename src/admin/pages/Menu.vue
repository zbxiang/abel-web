<template>
    <div class="user-manage">
        <div class="query-form">
            <el-form ref="form" :inline="true" :model="queryForm">
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input @keyup.enter="query" v-model="queryForm.menuName" placeholder="请输入菜单名称" />
                </el-form-item>
                <el-form-item label="菜单状态" prop="menuState">
                    <el-select v-model="queryForm.menuState">
                        <el-option :value="1" label="正常"></el-option>
                        <el-option :value="2" label="停用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button
                    type="primary"
                    @click="handleAdd(1)"
                >新增</el-button>
            </div>
            <el-table :data="tableData.lists" row-key="_id" :tree-props="{ children: 'children'}">
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                >
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="handleAdd(2, scope.row)"
                        >新增</el-button>
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            @click="handleDelete(scope.row._id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <span class="total">&lt; {{tableData.total}} &gt;</span>
                <el-pagination
                    v-model:currentPage="tableData.current"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    small
                    background
                    layout="prev, pager, next, sizes"
                    :total="tableData.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
        </div>
    </div>
    <!-- 新增菜单 -->
    <establish
        ref="drawerMenuRef"
        :title="MenuTitle"
        :drawerDialog="MenuDrawerDialog"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit" 
        :formData="menuForm" 
        :rules="rules"
    ></establish>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, reactive, getCurrentInstance, markRaw } from 'vue'
import { FormInstance, ElMessage, FormRules, ElMessageBox } from 'element-plus'
import { nextTick } from 'process'
import type { Action } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import utils from "../utils/utils";

/**
 * 查询 菜单 列表
 */
const useQueryMenuEffect = () => {
    const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
    
    const queryForm = reactive({
        menuName: '',
        menuState: 1,
    })

    const columns = reactive([
        {
            label: '菜单名称',
            prop: 'menuName',
            width: 150
        },
        {
            label: '图标',
            prop: 'icon',
        },
        {
            label: '菜单类型',
            prop: 'menuType',
            formatter(row: string, column: string, value: number) {
                return {
                    1: '菜单',
                    2: '按钮'
                }[value];
            },
        },
        {
            label: '权限标识',
            prop: 'menuCode',
        },
        {
            label: '路由地址',
            prop: 'url',
        },
        {
            label: '组件路径',
            prop: 'component',
        },
        {
            label: '菜单状态',
            prop: 'menuState',
            width: 90,
            formatter(row: string, column: string, value: number) {
                return {
                    1: '正常',
                    2: '停用'
                }[value];
            },
        },
        {
            label: '创建时间',
            prop: 'createTime',
            formatter(row: string, column: string, value: Date) {
                return utils.formateDate(new Date(value))
            },
        },
        {
            label: '更新时间',
            prop: 'updateTime',
            formatter(row: string, column: string, value: Date) {
                return utils.formateDate(new Date(value))
            },
        }
    ])

    const tableData = reactive({
        lists: [],
        pageSize: 10,
        pageNum: 1,
        current: ref(1),
        total: null,
        pageTotal: null,
    })

    interface LooseObject {
        [key: string]: any
    }
    
    const menuForm = reactive({
        parentId: [null],
        menuType: 1,
        menuName: '',
        icon: '',
        url: '',
        menuCode: '',
        component: '',
        menuState: 1,
        sort: null
    })

    const rules = reactive<FormRules>({
        menuName: [
            { 
                required: true, 
                message: '请输入菜单名称', 
                trigger: 'blur'
            },
            { 
                min: 2,
                max: 10,
                message: '长度在2-8个字符', 
                trigger: 'blur'
            },
        ],
    })

    const drawerMenuRef = ref<FormInstance>()

    let action = 'add'

    const MenuTitle = ref('新增菜单')

    const MenuDrawerDialog = ref(false)

    /**
     * 查询
     */
    const query = async () => {
        try {
            const query: LooseObject = {}
            const { pageSize, pageNum } = tableData
            const { menuName, menuState } = queryForm
            menuName && (query.menuName = menuName)
            menuState && (query.menuState = menuState)
            query.pageSize = pageSize
            query.pageNum = pageNum
            const res = await $api.getMenuList(query)
            if (res.code == 200) {
                tableData.lists = res.data.lists
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
     * 新增
     */
    const handleAdd = async (type?: number, rows?: any) => {
        MenuDrawerDialog.value = true
        action = 'add'
        if (type == 2) {
            menuForm.parentId = [...rows.parentId, rows._id].filter((item) => item)
        }
    }

    /**
     * 编辑
     */
    const handleEdit = (rows?: any) => {
        MenuDrawerDialog.value = true
        action = 'edit'
        nextTick(() => {
            Object.assign(menuForm, rows)
            console.log(menuForm)
        })
    }

    /**
     * 删除
     */
    const handleDelete = (_id?: any) => {
        ElMessageBox.confirm('是否需要删除这条记录', {
            type: 'warning',
            icon: markRaw(Delete),
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        }).then(async () => { 
            const res = await $api.menuDelete({ _id })
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
     * 关闭
     */
    const handleClose = (formEl: FormInstance | undefined) => {
        MenuDrawerDialog.value = false
        MenuTitle.value = '新增菜单'
        drawerMenuRef.value._resetForm(formEl)
    }

    /**
     * 提交
     */
    const handleSubmit = async (options: any, formEl: FormInstance | undefined) => {
        try {
            let res
            if (action === 'add') {
                res = await $api.menuAdd(options)
            }
            if(action === 'edit') {
                res = await $api.menuUpdate(options)
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
        queryForm,
        columns,
        tableData,
        MenuTitle,
        MenuDrawerDialog,
        drawerMenuRef,
        menuForm,
        rules,
        query,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCurrentChange,
        handleSizeChange,
        handleClose,
        handleSubmit
    }
} 

export default defineComponent({
    name: 'menu',
    components: {
        Establish: defineAsyncComponent(() => import('@Admin/components/menu/Establist.vue'))
    },  
    created() {
        // 查询菜单列表 
        this.query()
    },
    setup() {
       return { ...useQueryMenuEffect() }
    }
})
</script>

<style lang="scss">
</style>
