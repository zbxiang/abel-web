<template>
    <div class="vaw-tab-bar-container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'TabBar',
})
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.vaw-tab-bar-container {
    position: relative;
    height: $tabHeight;
    line-height: $tabHeight;
    box-sizing: border-box;
    white-space: nowrap;
    background-color: var(--el-color-white);
    box-shadow: 0px 5px 10px #dddddd;
    .contex-menu-wrapper {
        position: absolute;
        width: 130px;
        z-index: 999;
        list-style: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        background-color: white;
        padding-left: 0;
        & > li {
            width: 100%;
            line-height: 40px;
            padding-left: 15px;
            box-sizing: border-box;
        }
        & > li:hover {
            background-color: #f5f5f5;
        }
    }
    .humburger-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        :deep {
            .fold-wrapper {
            margin-top: calc(50% - 10px);
            }
        }
    }
    .tab-humburger-wrapper {
        margin-left: 40px;
        transition: margin-left $transitionTime;
    }
    .tab-no-humburger-wrapper {
        margin-left: 0;
        transition: margin-left $transitionTime;
    }
}
:deep {
    .el-tabs--card > .el-tabs__header {
        border: none;
        margin: 0;
        padding: 0 10px;
        .el-tabs__nav {
            border: none !important;
        }
        .el-tabs__item {
            height: calc(#{$tabHeight} - 12px);
            line-height: calc(#{$tabHeight} - 14px);
            border-radius: 2px;
            font-size: 12px;
            border: 1px solid var(--el-border-color-light);
            background-color: var(--el-color-white);
            padding: 0 10px !important;
            font-weight: normal;
        }
        .el-tabs__item.is-active {
            color: var(--el-color-white);
            border: 1px solid var(--el-color-primary) !important;
            background-color: var(--el-color-primary);
        }
        // .el-tabs__item.is-active::before {
        //   content: "";
        //   width: 7px;
        //   height: 7px;
        //   display: inline-block;
        //   background-color: var(--el-color-white);
        //   border: 1px solid var(--el-color-primary-light-6);
        //   border-radius: 50%;
        //   margin-right: 5px;
        // }
        .el-tabs__item:hover {
            border: 1px solid var(--el-color-primary) !important;
        }
    }

    .el-tabs__item + .el-tabs__item {
        margin-left: 10px;
    }
}
</style>