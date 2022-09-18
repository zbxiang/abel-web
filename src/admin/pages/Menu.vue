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
            <el-table :data="menuList" row-key="_id" :tree-props="{ children: 'children'}">
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :formatter="item.formatter"
                >
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template #default="scope">
                        <el-button
                            :disabled="scope.row.menuType == 2"
                            type="primary"
                            @click="handleAdd(2, scope.row)"
                        >新增</el-button>
                        <el-button
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            @click="handleDelete(scope.row._id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <!-- 新增菜单 -->
    <create-menu
        :title="MenuTitle"
        :drawerDialog="MenuDrawerDialog"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit" 
        :formData="menuForm" 
        :rules="rules"
        :menuList="menuList"
    ></create-menu>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, reactive, toRaw, getCurrentInstance, markRaw, onMounted, nextTick } from 'vue'
import { FormInstance, ElMessage, FormRules, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import utils from "../utils/utils"

interface LooseObject {
    [key: string]: any
}

export default defineComponent({
    name: 'Menu',
    components: {
        createMenu: defineAsyncComponent(() => import('@Admin/components/menu/Create.vue'))
    },  
    setup() {
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
                formatter(row: string, column: string, cellValue: number, index: number) {
                    return {
                        1: '菜单',
                        2: '按钮'
                    }[cellValue];
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
                formatter(row: string, column: string, cellValue: number, index: number) {
                    return {
                        1: '正常',
                        2: '停用'
                    }[cellValue];
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

        const menuForm = reactive({
            _id: null,
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

        const action = ref('add')

        const MenuTitle = ref('新增菜单')

        const MenuDrawerDialog = ref(false)

        const menuList = ref([])

        onMounted(() => {
            // 查询菜单列表
            query()
        })

        // 查询菜单列表
        const query = async () => {
            try {
                const query: LooseObject = {}
                const { menuName, menuState } = queryForm
                menuName && (query.menuName = menuName)
                menuState && (query.menuState = menuState)
                const res = await $api.getMenuList(query)
                if (res.code == 200) {
                    menuList.value = res.data
                }
            } catch (e: any) {
                throw new Error(e)
            }
        }

        // 菜单新增
        const handleAdd = async (type: number, rows?: any) => {
            MenuDrawerDialog.value = true
            action.value = 'add'
            MenuTitle.value = '新增菜单'
            if (type == 2) {
                menuForm.parentId = [...rows.parentId, rows._id].filter((item) => item)
            }
        }

        // 编辑菜单
        const handleEdit = (rows: any) => {
            MenuDrawerDialog.value = true
            action.value = 'edit'
            MenuTitle.value = '编辑菜单'
            nextTick(() => {
                Object.assign(menuForm, rows)
            })
        }

        // 删除菜单
        const handleDelete = (_id: number) => {}

        // 提交
        const handleSubmit = async (options: any ) => {
            try {
                let res
                let params = toRaw(options)
                if (action.value === 'add') {
                    res = await $api.addMenu(params)
                }
                if(action.value === 'edit') {
                    res = await $api.updateMenu(params)
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

        // 关闭
        const handleClose = () => {
            MenuDrawerDialog.value = false
            menuForm._id = null
            menuForm.parentId = [null]
            menuForm.menuType = 1
            menuForm.menuName =  ''
            menuForm.icon = ''
            menuForm.url = ''
            menuForm.menuCode = ''
            menuForm.component = ''
            menuForm.menuState = 1
            menuForm.sort = null
            action.value = 'add'
            MenuTitle.value = '新增菜单'
        }
        
        return {
            queryForm,
            columns,
            menuForm,
            rules,
            MenuTitle,
            MenuDrawerDialog,
            menuList,
            query,
            handleAdd,
            handleEdit,
            handleDelete,
            handleSubmit,
            handleClose
        }
    }
})
</script>

<style lang="scss">
</style>
