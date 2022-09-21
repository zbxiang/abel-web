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
                            :icon="PlusIcon"
                            @click="onAddItem"
                        >
                          添加
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            :icon="DeleteIcon"
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
                        prop="userName"
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
                        prop="userEmail"
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
                                        ? srcPath('../../assets/icon_sex_man.png')
                                        : srcPath('../../assets/icon_sex_woman.png')
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
            <template #footer>
                <TableFooter
                    ref="tableFooter"
                    @refresh="doRefresh"
                    @pageChanged="doRefresh"
                />
            </template>
        </TableBody>
        <Dialog ref="dialogRef">
            <template #content>
                <el-form
                    class="base-form-container"
                    :model="userModel"
                    label-width="80px"
                    label-position="right"
                    size="large"
                >
                    <el-form-item
                        class="form-item__require"
                        label="用户名称"
                        prop="nickName"
                    >
                        <el-input
                            v-model="userModel.nickName"
                            placeholder="请输入用户名称"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item class="form-item__require" label="手机号码" prop="path">
                        <el-input
                            v-model="userModel.mobile"
                            placeholder="请输入手机号码"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item class="form-item__require" label="邮箱地址">
                        <el-input
                            v-model="userModel.email"
                            placeholder="请输入邮箱地址"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="userModel.gender">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="form-item__require" label="所属部门" prop="name">
                        <TreeSelector
                            v-model:value="userModel.departmentId"
                            placeholder="请选择所属部门"
                            :data="departmentList"
                            :dataFields="{
                                label: 'name',
                                value: 'id',
                            }"
                        />
                    </el-form-item>
                    <el-form-item class="form-item__require" label="所属角色" prop="path">
                        <el-select
                            placeholder="请选择角色"
                            v-model="userModel.roleId"
                            clearable
                        >
                            <el-option
                                v-for="roleItem of roleList"
                                :key="roleItem.id"
                                :value="roleItem.id"
                                :label="roleItem.name"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="path">
                        <el-input
                            v-model="userModel.password"
                            type="password"
                            placeholder="请输入登录密码"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="用户状态" prop="path">
                        <el-radio-group v-model="userModel.status">
                            <el-radio :label="1">正常</el-radio>
                            <el-radio :label="0">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts">
import { useDataTable } from '@/admin/hooks'
import type {
    UserModelType
} from '@/admin/entity/system'
import type {
    DialogType,
    TableFooter
} from '@/admin/components/types'
import {
  Plus as PlusIcon,
  Delete as DeleteIcon,
} from '@element-plus/icons-vue'
import {
    defineComponent,
    onMounted,
    getCurrentInstance,
    ref,
    toRaw,
    reactive
} from 'vue'

export default defineComponent({
    name: 'User',
    setup() {
        const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
        const tableFooter = ref<TableFooter>()
        const dialogRef = ref<DialogType>()
        const {
            dataList,
            tableLoading,
            tableConfig,
            handleSuccess,
            handleSelectionChange,
            selectRows,
            useHeight
        } = useDataTable<UserModelType>()
        const srcPath = (path: string) => {
            return new URL(path, import.meta.url).href
        }
        const userModel = reactive<UserModelType>({
            id: 0,
            nickName: '',
            mobile: '',
            email: '',
            gender: 1,
            departmentId: '',
            roleId: '',
            password: '',
            status: 1
        })
        const doRefresh = () => {
            $api.getUserList(tableFooter.value?.withPageInfoData())
                .then((res: any) => {
                    return handleSuccess(res.data)
                })
                .then((res: any) => {
                    tableFooter.value?.setTotalSize(res.totalSize)
                })
                .catch((error: any) => {
                    console.log(error)
                })
        }
        const onAddItem = () => {
            dialogRef.value?.show(() => {})
        }
        const onDeleteItems = () => { }
        const onUpdateItem = (item: any) => { }
        const onDeleteItem = (item: any) => { }
        const onEnableItem = (item: any) => { }
        onMounted(() => {
            doRefresh()
            useHeight()
        })
        return {
            PlusIcon,
            DeleteIcon,
            dialogRef,
            tableFooter,
            dataList,
            tableLoading,
            tableConfig,
            userModel,
            handleSuccess,
            handleSelectionChange,
            selectRows,
            useHeight,
            srcPath,
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