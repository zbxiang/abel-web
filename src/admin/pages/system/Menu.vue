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
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary">新增</el-button>
            </div>
            <el-table
                :data="menuList"
                row-key="_id"
                :tree-props="{ children: 'children'}">
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                ></el-table-column>    
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

export default defineComponent({
    setup() {
        const form = ref<FormInstance>()
        const queryForm = reactive({
            menuName: '',
            menuState: '',
        })
        const columns = ref([
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
            },
            {
                label: '权限标识',
                prop: 'menuCode',
            },
            {
                label: '路由地址',
                prop: 'path',
            }
        ])
        const menuList = ref([])
        return {
            form,
            queryForm,
            columns,
            menuList
        }
    }
})
</script>

<style lang="scss">
</style>
