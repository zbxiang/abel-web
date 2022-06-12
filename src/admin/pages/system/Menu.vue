<template>
    <div class="user-manage">
        <div class="query-form">
            <el-form ref="form" :inline="true" :model="queryForm">
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
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
                    @click="addHandle(1)"
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
                    <el-button type="primary" size="mini">新增</el-button>
                    <el-button size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <span class="total">&lt; {{tableData.total}} &gt;</span>
                <el-pagination
                    v-model:currentPage="tableData.current"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :small="small"
                    :background="background"
                    layout="prev, pager, next, sizes"
                    :total="tableData.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
        </div>
        <add-menu-drawer
            title="用户新增"
            :showModal="showModal"
            @handleClose="handleClose"
            @handleSubmit="handleSubmit"
        ></add-menu-drawer>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, reactive, getCurrentInstance } from 'vue'
import { FormInstance, ElMessage } from 'element-plus'

export default defineComponent({
    name: 'menu',
    components: {
        AddMenuDrawer: defineAsyncComponent(() => import('@admin/components/addMenuDrawer.vue'))
    },  
    mounted() { 
        this.getMenuList()
    },
    setup() {
        const $services = getCurrentInstance()?.appContext.config.globalProperties.$services
        const form = ref<FormInstance>()
        const queryForm = reactive({
            menuName: '',
            menuState: 1,
        })
        const columns = [
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
                prop: 'path',
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
                formatter(row: string, column: string, value: number) {
                    return {
                        1: '正常',
                        2: '停用'
                    }[value];
                },
            }
        ]
        const tableData = ref({
            lists: [],
            pageSize: 10,
            pageNum: 1,
            current: 1,
            total: null,
            pageTotal: null,
        })
        // const title = '用户新增'
        const showModal = ref(false)
        const small = ref(false)
        const background = ref(false)
        let action = ''
        // 菜单列表初始化
        const getMenuList = async () => {
            try {
                const { pageSize, pageNum } = tableData.value
                const res = await $services.systemModule.getMenuList({...queryForm, pageSize, pageNum})
                tableData.value.lists = res.lists
                tableData.value.pageSize = res.pageSize
                tableData.value.pageNum = res.pageNum
                tableData.value.total = res.total
                tableData.value.pageTotal = res.pageTotal
            } catch (e) {
                throw new Error(e)
            }
        }
        // 新增菜单
        const addHandle = (type:number) => { 
            showModal.value = true
            action = 'add'
        }
        const handleClose = () => {
            showModal.value = false
        }
        const handleSubmit = async (menuForm: FormInstance | undefined) => {
            let params = { ...menuForm, action }
            let res = await $services.systemModule.addMenu(params)
            showModal.value = false
            ElMessage.success('操作成功')
        }
        const handleSizeChange = (val: number) => {
            tableData.value.pageSize = val
            getMenuList()
        }
        const handleCurrentChange = (val: number) => {
            tableData.value.pageNum = val
            getMenuList()
        }
        // 查询
        const query = () => {

            
        }
        return {
            form,
            queryForm,
            columns,
            tableData,
            showModal,
            action,
            small,
            background,
            getMenuList,
            addHandle,
            handleClose,
            handleSubmit,
            handleSizeChange,
            handleCurrentChange,
            query
        }
    }
})
</script>

<style lang="scss">
</style>
