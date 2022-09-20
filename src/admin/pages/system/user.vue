<template>
    <div class="main-container">
        <TableBody>
            <template #tableConfig>
                <TableConfig
                    v-model:border="tableConfig.border"
                    v-model:stripe="tableConfig.stripe"
                    @refresh="doRefresh"
                >
                    <template #actions>
                        <el-button
                            type="primary"
                            size="small"
                            icon="PlusIcon"
                            @click="onAddItem"
                        >
                          添加
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            icon="DeleteIcon"
                            :disabled="selectRows!.length === 0"
                            @click="onDeleteItems"
                        >
                          删除
                        </el-button>
                    </template>
                </TableConfig>
            </template>
            <template #default>
                <el-table
                    ref="tableRef"
                    v-loading="tableLoading"
                    :data="dataList"
                    :header-cell-style="tableConfig.headerCellStyle"
                    :size="tableConfig.size"
                    :stripe="tableConfig.stripe"
                    :border="tableConfig.border"
                    :height="tableConfig.height"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="45" fixed="left" />
                    <el-table-column
                        align="center"
                        label="名称"
                        prop="nickName"
                        width="100"
                    />
                    <el-table-column
                        align="center"
                        label="手机号"
                        prop="mobile"
                        width="150"
                    />
                    <el-table-column
                        align="center"
                        label="邮箱"
                        prop="email"
                        width="150"
                    />
                    <el-table-column align="center" label="头像">
                        <template #default="scope">
                            <el-avatar>{{ scope.row.nickName.substring(0, 1) }}</el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="性别" prop="gender">
                        <template #default="scope">
                            <div class="gender-container flex justify-center align-center">
                                <img
                                class="gender-icon"
                                :src="
                                    scope.row.gender === 0
                                    ? require('@Admin/assets/icon_sex_man.png')
                                    : require('@Admin/assets/icon_sex_woman.png')
                                "
                                />
                                <span>{{ scope.row.gender === 0 ? "男" : "女" }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="所属部门"
                        prop="departmentName"
                    />
                    <el-table-column
                        align="center"
                        label="所属角色"
                        prop="roleName"
                    />
                    <el-table-column
                        align="center"
                        label="上次登录时间"
                        prop="lastLoginTime"
                        width="160px"
                    />
                    <el-table-column
                        align="center"
                        label="上次登录IP"
                        prop="lastLoginIp"
                        width="130px"
                    />
                    <el-table-column align="center" label="状态">
                        <template #default="scope">
                            <el-tag
                                size="small"
                                :type="scope.row.status === 1 ? 'success' : 'danger'"
                            >
                                {{ scope.row.status === 1 ? "正常" : "禁用" }}
                            </el-tag>
                            </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作"
                        fixed="right"
                        width="220"
                    >
                        <template #default="scope">
                            <el-button
                                type="primary"
                                size="small"
                                plain
                                @click="onUpdateItem(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                size="small"
                                plain
                                @click="onDeleteItem(scope.row)"
                                >删除</el-button
                            >
                            <el-button
                                :type="scope.row.status === 1 ? 'warning' : 'success'"
                                size="small"
                                plain
                                @click="onEnableItem(scope.row)"
                                >{{ scope.row.status === 1 ? "禁用" : "启用" }}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </TableBody>
    </div>
</template>

<script lang="ts">
import { useDataTable } from '../../hooks'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'User',
    setup() {
        const {
            dataList,
            tableLoading,
            tableConfig,
            handleSuccess,
            handleSelectionChange,
            selectRows,
            useHeight
        } = useDataTable<UserModelType>()
        const doRefresh = () => { }
        const onAddItem = () => { }
        const onDeleteItems = () => { }
        const onUpdateItem = (item: any) => { }
        const onDeleteItem = (item: any) => { }
        const onEnableItem = (item: any) => { }
        return {
            dataList,
            tableLoading,
            tableConfig,
            handleSuccess,
            handleSelectionChange,
            selectRows,
            useHeight,
            doRefresh,
            onAddItem,
            onDeleteItems,
            onUpdateItem,
            onDeleteItem,
            onEnableItem
        }
    }
})
</script>

<style lang="scss" scoped>
.gender-container {
    .gender-icon {
        width: 20px;
    }
}
</style>