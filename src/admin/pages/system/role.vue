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
                            @click="onAddItem">添加
                        </el-button>
                    </template>
                </TableConfig>
            </template>
            <template #default>
                <el-table
                    v-loading="tableLoading"
                    :data="dataList"
                    :header-cell-style="tableConfig.headerCellStyle"
                    :size="tableConfig.size"
                    :stripe="tableConfig.stripe"
                    :border="tableConfig.border">
                    <el-table-column
                        align="center"
                        label="序号"
                        fixed="left"
                        width="80"
                    >
                        <template #default="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="角色名称"
                        prop="name"
                    />
                    <el-table-column
                        align="center"
                        label="角色编号"
                        prop="roleCode"
                    />
                    <el-table-column
                        align="center"
                        label="角色描述"
                        prop="description"
                    />
                    <el-table-column
                        align="center"
                        label="创建时间"
                        prop="createTime"
                    />
                    <el-table-column
                        align="center"
                        label="操作"
                        width="300px"
                    >
                        <template #default="scope">
                            <el-button
                                :disabled="scope.row.roleCode === 'ROLE_admin'"
                                plain 
                                type="primary"
                                size="small"
                                @click="onUpdateItem(scope.row)"
                            >编辑</el-button>
                            <el-button
                                :disabled="scope.row.roleCode === 'ROLE_admin'"
                                plain
                                type="danger"
                                size="small"
                                @click="onDeleteItem(scope.row)"
                            >删除</el-button>
                            <el-button
                                plain
                                type="warning"
                                size="small"
                                @click="showMenu(scope.row)"
                            >菜单权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </TableBody>
        <Dialog ref="dialogRef">
            <template #content>
                <BaseForm
                    class="padding-left padding-right"
                    ref="baseFormRef"
                    :form-items="formItems"
                />
            </template>
        </Dialog>
        <Dialog
            ref="menuDialogRef"
            title="菜单权限">
            <template #content>
                <el-tree
                    ref="tree"
                    :data="allMenuList"
                    show-checkbox
                    :check-strictly="true"
                    node-key="menuUrl"
                    :default-expanded-keys="defaultExpandedKeys"
                    :props="defaultProps"
                />
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts">
import type { DialogType } from '@/admin/components/types'
import { defineComponent, nextTick, onMounted, reactive, ref, getCurrentInstance } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDataTable } from '@/admin/hooks'
import { Plus } from'@element-plus/icons-vue'
import { IDataTable } from '@/admin/hooks/DataTable'
import { RoleModelType } from '@/admin/entity/system'
import { FormItem } from '@/admin/types'
const ROLE_CODE_FLAG = 'ROLE_'

export default defineComponent({
    name: 'Role',
    setup() {
        const $api = getCurrentInstance()?.appContext.config.globalProperties.$api
        const roleModel = reactive({
            id: 0,
            name: '',
            roleCode: '',
            description: '',
            createTime: ''
        })
        const defaultProps = {
            children: 'children',
            label: 'menuName'
        }
        const defaultCheckedKeys = ref<string[]>([])
        const defaultExpandedKeys = ref<string[]>([])
        const formItems = reactive([
            {
                label: '角色名称',
                type: 'input',
                name: 'name',
                value: '',
                maxLength: 50,
                inputType: 'text',
                placeholder: '请输入角色名称',
                validator: (item: any) => {
                    if (!item.value) {
                        ElMessage.error(item.placeholder)
                        return false
                    }
                    return true
                },
                reset() {
                    this.value = ''
                }
            },
            {
                label: '角色编号',
                type: 'input',
                name: 'code',
                value: '',
                maxLength: 20,
                inputType: 'text',
                placeholder: '请输入角色编号',
                validator: (item: any) => {
                    if (!item.value) {
                        ElMessage.error(item.placeholder)
                        return false
                    }
                    return true
                },
                reset() {
                    this.value = ''
                },
            },
            {
                label: '角色描述',
                type: 'input',
                name: 'desc',
                value: '',
                maxLength: 50,
                inputType: 'text',
                placeholder: '请输入角色描述',
                validator: (item: any) => {
                    if (!item.value) {
                        ElMessage.error(item.placeholder)
                        return false
                    }
                    return true
                },
                reset() {
                    this.value = ''
                }
            }
        ])
        const menuDialogRef = ref<DialogType>()
        const dialogRef = ref<DialogType>()
        const baseFormRef = ref()
        const tree = ref()
        const {
            handleSuccess,
            dataList,
            tableLoading,
            tableConfig,
        }: IDataTable<RoleModelType> = useDataTable()
        const allMenuList = ref<Array<any>>([])
        const doRefresh = () => {
            // post<Array<RoleModelType>>({
            //     url: getRoleList,
            //     data: {},
            // })
            //     .then((res) => {
            //         handleSuccess(res);
            //     })
            //     .catch(console.log);
        }
        const getAllMenuList = () => {
            // post<Array<any>>({
            //     url: getAllMenuByRoleId,
            // }).then((res) => {
            //     allMenuList.value = res.data;
            // });
        }
        const showMenu = (item: RoleModel) => {
            // defaultCheckedKeys.value = [];
            // defaultExpandedKeys.value = [];
            // post<Array<any>>({
            //     url: getMenuListByRoleId,
            //     data: {
            //         roleId: item.id,
            //     },
            // })
            //     .then((res) => {
            //         handleRoleMenusSelected(res.data);
            //         menuDialogRef.value?.show(() => {
            //             ElMessage.success(
            //                 "模拟菜单修改成功，数据为：" +
            //                 JSON.stringify(tree.value.getCheckedKeys())
            //             );
            //             menuDialogRef.value?.close();
            //         });
            //         nextTick(() => {
            //             tree.value.setCheckedKeys(defaultCheckedKeys.value);
            //         });
            //     })
            //     .catch(console.log);
        }
        const onAddItem = () => {
            formItems.forEach(
                (it: FormItem) => it.reset && it.reset()
            )
            dialogRef.value?.show(() => {
                const formParams = baseFormRef.value?.generatorParams()
                formParams.code = ROLE_CODE_FLAG + formParams.code
                $api.roleAdd(formParams)
                    .then((res: any) => {
                        ElMessage({
                            message: res.msg,
                            type: 'success'
                        })
                        dialogRef.value?.close()
                        doRefresh()
                    })
                    .catch((error: any) => {
                        console.log(error)
                    })
            })
        }
        const onUpdateItem = (item: RoleModel) => {
            // formItems.forEach((it: FormItem) => {
            //     const typeName = it.name;
            //     if (typeName) {
            //         const typeValue = item[typeName];
            //         if (typeValue) {
            //             it.value = item[typeName];
            //         }
            //     }
            // });
            // dialogRef.value?.show(() => {
            //     ElMessageBox.confirm(
            //         "角色模拟修改成功，参数为：" +
            //         JSON.stringify(baseFormRef.value?.generatorParams())
            //     );
            //     dialogRef.value?.close();
            // });
        }
        const onDeleteItem = (item: RoleModel) => {
            // ElMessageBox.confirm("是否要删除此信息，删除后不可恢复？", "提示").then(
            //     () => {
            //         ElMessageBox.confirm(
            //             "角色模拟删除成功，参数为：" +
            //             JSON.stringify({
            //                 id: item.id,
            //             })
            //         );
            //     }
            // );
        }
        const handleRoleMenusSelected = (menus: Array<any>) => {
            menus.forEach((it: any) => {
                defaultCheckedKeys.value.push(it.menuUrl);
                if (it.children) {
                    defaultExpandedKeys.value.push(it.menuUrl);
                    handleRoleMenusSelected(it.children);
                }
            })
        }
        onMounted(async () => {
            await getAllMenuList()
            doRefresh()
        })
        return {
            roleModel,
            defaultProps,
            defaultCheckedKeys,
            defaultExpandedKeys,
            formItems,
            menuDialogRef,
            dialogRef,
            baseFormRef,
            tree,
            handleSuccess,
            dataList,
            tableLoading,
            tableConfig,
            doRefresh,
            allMenuList,
            getAllMenuList,
            showMenu,
            onAddItem,
            onUpdateItem,
            onDeleteItem,
            handleRoleMenusSelected
        }
    }
})
</script>