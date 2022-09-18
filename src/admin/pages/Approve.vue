<template>
    <div class="query-form">
        <el-form ref="form" :inline="true" :model="queryForm">
            <el-form-item label="审批状态" prop="applyState">
                <el-select v-model="queryForm.applyState">
                    <el-option value="" label="全部"></el-option>
                    <el-option :value="1" label="待审批"></el-option>
                    <el-option :value="2" label="审批中"></el-option>
                    <el-option :value="3" label="审批拒绝"></el-option>
                    <el-option :value="4" label="审批通过"></el-option>
                    <el-option :value="5" label="作废"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getApplyList">查询</el-button>
                <el-button @click="handleReset('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="base-table">
      <div class="action"></div>
        <el-table :data="applyList">
            <el-table-column
                v-for="item in columns"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :formatter="item.formatter"
            >
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="scope">
                    <el-button
                        size="mini"
                        @click="handleDetail(scope.row)"
                    v-if="
                        scope.row.curAuditUserName == userInfo.userName &&
                        [1, 2].includes(scope.row.applyState)
                    "
                    >审核</el-button
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
</template>