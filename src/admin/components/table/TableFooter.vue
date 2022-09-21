<template>
    <el-card
        :body-style="{ padding: 0, width: '100%' }"
        class="table-footer-container"
        id="tableFooterContainer"
        shadow="never"
    >
        <div class="flex align-center" :class="[placement]">
            <el-pagination
                :current-page="pageModel.pageNum"
                :page-sizes="pageSizes"
                :page-size="pageModel.pageSize"
                :layout="
                $isMobile
                    ? 'total, pager, jumper'
                    : 'total, sizes, prev, pager, next, jumper'
                "
                :total="pageModel.totalSize"
                @size-change="pageSizeChanged"
                @current-change="currentChanged"
            />
            <el-button
                v-if="showRefresh"
                style="margin-left: 15px; width: 30px; height: 30px"
                circle
                size="small"
                :icon="RefreshIcon"
                type="primary"
                @click="onRefresh"
            />
        </div>
    </el-card>
</template>

<script lang="ts">
import { Refresh as RefreshIcon } from '@element-plus/icons-vue'
import { computed, defineComponent, PropType, reactive, getCurrentInstance } from 'vue'

export default defineComponent({
    name: 'TableFooter',
    emits: ['pageChanged', 'refresh'],
    props: {
        pageSizes: {
            type: Array as PropType<Array<number>>,
            default: () => {
                return [10, 20, 30, 40];
            },
        },
        showRefresh: {
            type: Boolean,
            default: true,
        },
        position: {
            type: String as PropType<'left' | 'center' | 'right'>,
            default: 'center'
        },
    },
    setup(props, { emit }) {
        const $isMobile = getCurrentInstance()?.appContext.config.globalProperties.$isMobile
        const pageModel = reactive({
            pageNum: 1,
            pageSize: 10,
            pageTotal: 0,
            totalSize: 0
        })
        const pageSizeChanged = (pageSize: number) => {
            pageModel.pageSize = pageSize
            pageModel.pageNum = 1
            emit('pageChanged', pageModel)
        }
        const currentChanged = (currentPage: number) => {
            pageModel.pageNum = currentPage
            emit('pageChanged', pageModel)
        }
        const withPageInfoData = (otherParams = {}) => {
            return {
                ...otherParams,
                pageNum: pageModel. pageNum,
                pageSize: pageModel.pageSize,
            }
        }
        const setPageTotal = (pageTotal: number) => {
            pageModel.pageTotal = pageTotal
        }
        const setTotalSize = (totalSize: number) => {
            pageModel.totalSize = totalSize
        }
        const setPageSize = (pageSize: number) => {
            pageModel.pageSize = pageSize
        };
        const placement = computed(() => {
            switch (props.position) {
                case 'left':
                    return 'justify-start'
                case 'center':
                    return 'justify-center'
                case 'right':
                    return 'justify-end'
                default:
                    return ''
            }
        });
        const onRefresh = () => {
            emit('refresh')
        };
        return {
            $isMobile,
            pageModel,
            placement,
            pageSizeChanged,
            currentChanged,
            withPageInfoData,
            setPageTotal,
            setTotalSize,
            setPageSize,
            onRefresh,
            RefreshIcon
        }
    }
})
</script>
<style lang="scss" scoped>
.table-footer-container {
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: none;
}
</style>
