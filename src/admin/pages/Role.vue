<template>
    <div class="role-manage">
        <div class="query-form">
            <el-form ref="formRef" :inline="true" :model="queryForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getRoleList">查询</el-button>
                    <el-button @click="handleReset(formRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary" @click="handleAdd">创建</el-button>
            </div>
            <!-- <el-table :data="roleList">
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
                    <el-button size="mini" @click="handleEdit(scope.row)"
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
                background
                layout="prev, pager, next"
                :total="pager.total"
                :page-size="pager.pageSize"
                @current-change="handleCurrentChange"
            /> -->
        </div>
    </div>
    <!-- 创建角色 -->
    <establish :drawerDialog="roleDrawerDialog" @handleClose="handleClose"></establish>
    <!-- 权限 -->
    <permission :drawerDialog="permissionDrawerDialog"></permission>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

/**
 * 查询 角色
 */ 
const useQueryRoleEffect = () => {
    const formRef = ref<FormInstance>()
    const queryForm = reactive({roleName: ''})
    const handleReset = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
    const getRoleList = () => {
    }
    return { queryForm, formRef, handleReset, getRoleList }
}

/**
 * 创建 角色
 */ 
const useEstablishRoleEffect = () => {
    const roleDrawerDialog = ref(false)
    const handleAdd = () => {
        roleDrawerDialog.value = true
    }
    const handleClose = () => {
        roleDrawerDialog.value = false
    }
    return { roleDrawerDialog, handleAdd, handleClose }
}

const usePermissionEffect = () => {
    const permissionDrawerDialog = ref(false)
    return { permissionDrawerDialog }
}

export default defineComponent({
    name: 'Role',
    components: {
        Establish: defineAsyncComponent(() => import('../components/role/Establish.vue')),
        Permission: defineAsyncComponent(() => import('../components/role/Permission.vue')),
    },
    setup() {
        // const { queryForm, formRef, handleReset, getRoleList } = useQueryRoleEffect()
        // const { handleAdd } = useEstablishRoleEffect()
        // return { queryForm, formRef, handleReset, getRoleList, handleAdd }
        const queryRoleData = useQueryRoleEffect()
        const establishRoleData = useEstablishRoleEffect()
        const permissionData = usePermissionEffect()
        return {...queryRoleData, ...establishRoleData, ...permissionData}
    }
})
</script>

<style lang="scss">
</style>
