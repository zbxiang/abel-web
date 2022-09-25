<template>
    <el-dialog
        ref="dialogRef"
        :title="innerTitle"
        v-model="dialogVisible"
        :close-on-click-modal="closeOnClickModal"
        :width="isMobileScreen ? '85%' : '45%'"
        draggable
        custom-class="popup-container"
    >
        <div class="dialog__content-wrapper">
            <slot name="content"></slot>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <slot name="footer-button"></slot>
                <el-button
                    v-if="showCancel"
                    size="small"
                    @click="dialogVisible = false"
                >取 消</el-button>
                <el-button
                    :loading="loading"
                    type="primary"
                    size="small"
                    @click="onConfirm"
                >确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useLayoutStore } from '@/admin/layout/hooks'

export default defineComponent({
    name: 'Dialog',
    props: {
        title: {
            type: String,
            default: '提示',
        },
        closeOnClickModal: {
            type: Boolean,
            default: false,
        },
        showCancel: {
            type: Boolean,
            default: true,
        }
    },
    setup(props, { expose }) {
        const innerTitle = computed(() => props.title || '提示')
        const dialogRef = ref()
        const dialogVisible = ref(false)
        const loading = ref(false)
        const store = useLayoutStore()
        const _callback = ref()
        const isMobileScreen = computed(() => {
            return store.state.device === 'mobile'
        })
        function show(callback: () => void) {
            dialogVisible.value = true
            loading.value = false
            nextTick(() => {
                const contentElement = document.querySelector(
                    '.dialog__content-wrapper'
                )
                contentElement?.scrollTo({ top: 0 })
            })
            _callback.value = callback
        }
        const close = () => {
            dialogVisible.value = false
            loading.value = false
        }
        const onConfirm = () => {
            if (_callback.value) {
                _callback.value(dialogRef.value)
            } else {
                close()
            }
        }
        const showLoading = () => {
            loading.value = true
        }
        const closeLoading = () => {
            loading.value = false
        }
        expose({
            show,
            close,
            showLoading,
            closeLoading,
        })
        return {
            dialogRef,
            dialogVisible,
            loading,
            isMobileScreen,
            innerTitle,
            onConfirm,
            close,
            show,
            showLoading,
            closeLoading
        }
    }
})
</script>

<style lang="scss">
.popup-container{
    .el-dialog__header{
        background: #f7f8f9;
        box-shadow: 0 1px 0 0 #ebeff1;
        padding: 9px 20px !important;
        position: relative;
        font-size: 16px;
        color: #262626;
        font-weight: 500;
        .el-dialog__headerbtn{
            top: 50%;
            transform: translateY(-50%);
            font-weight: 400;
        }
    }
}
.dialog__content-wrapper {
    height: 340px;
    overflow-y: auto;
    padding: 5px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    .base-form-container {
        .el-input--large .el-input__inner {
            height: 32px;
        }
    }
}
</style>
