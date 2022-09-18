<template>
    <div class="action-items-wrapper">
        <span
            v-if="state.actionItem.showSearch"
            class="action-item"
            @click="onShowSearch"
            >
            <el-icon :size="18">
                <Search />
            </el-icon>
        </span>
        <el-popover
            v-if="state.actionItem.showMessage"
            trigger="click"
            :width="300"
        >
            <template #reference>
                <el-badge
                    :value="12"
                    class="badge-action-item"
                >
                    <span>
                        <el-icon :size="18">
                            <bell />
                        </el-icon>
                    </span>
                </el-badge>
            </template>
            <PopoverMessageContent />
        </el-popover>
        <span
            v-if="state.actionItem.showRefresh"
            class="action-item"
            @click="onRefrehRoute"
        >
            <el-icon :size="18">
                <Refresh />
            </el-icon>
        </span>
        <span
            v-if="state.actionItem.showFullScreen && state.device !== 'mobile'"
            class="action-item"
            @click="onScreenFull"
        >
            <el-icon :size="18">
                <FullScreen />
            </el-icon>
        </span>
        <span
            v-if="state.device !== 'mobile'"
            class="action-item"
            @click="onShowSetting"
        >
            <el-icon :size="18">
                <SettingIcon />
            </el-icon>
        </span>
    </div>
</template>

<script lang="ts">
import screenfull from 'screenfull'
import { defineComponent, ref } from 'vue'
import store from '../store'
import {
  Search,
  Bell,
  Refresh,
  FullScreen,
  Setting as SettingIcon
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import useEmit from '../../hooks/Emit'

export default defineComponent({
    name: 'ActionItems',
    components: {
        Search,
        Bell,
        Refresh,
        FullScreen,
        SettingIcon,
    },
    setup() {
        const showSearchContent = ref(false)
        const searchContent = ref('')
        const state = store.state;
        const router = useRouter()
        const route = useRoute()
        const emit = useEmit()
        const onShowSearch = () => {
            showSearchContent.value = !showSearchContent.value
            searchContent.value = ''
        }
        const onChange = (content: string) => {
            if (!content) {
                return
            }
            window.open("https://www.baidu.com/s?wd=" + content)
        }
        const onScreenFull = () => {
            if (!screenfull.isEnabled) {
                ElMessage.error("当前浏览器不支持全屏操作")
                return false
            }
            screenfull.toggle()
        }
        const onRefrehRoute = () => {
            router.replace({ path: '/redirect' + route.path })
        }
        const onShowSetting = () => {
            emit?.emit('show_setting')
        }
        return {
            showSearchContent,
            searchContent,
            state,
            onShowSearch,
            onShowSetting,
            onRefrehRoute,
            onScreenFull,
            onChange
        }
    }
})
</script>

<style lang="scss" scoped>
.action-items-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    color: currentColor;
    z-index: 9999;
    .action-item {
    min-width: 40px;
    }
    .action-item:hover {
    color: var(--el-color-primary);
    }
    .badge-action-item {
    margin-right: 30px;
    }
    .input-wrapper {
    position: absolute;
    top: 6px;
    bottom: 3px;
    left: 0;
    width: 0;
    z-index: -1;
    transform: translateX(0);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &.is-active {
        width: 100%;
        transform: translateX(-100%);
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    }
}
</style>
<style lang="scss" scoped>
:deep(.el-input) {
    border: none;
    border-bottom: 1px solid currentColor;
}
:deep(.el-input__inner) {
    border: none !important;
    height: 35px;
    line-height: 35px;
    color: currentColor !important;
    background-color: transparent !important;
}
</style>