<template>
    <el-drawer
        ref="drawerRef"
        v-model="visibleDrawer"
        :title="title"
        :size="size"
        :direction="direction"
        custom-class="drawerDialog"
        @close="handleClose"
    >
        <slot></slot>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    name: 'Drawer',
    emits: ['handleClose'],
    props: {
        drawerDialog: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        title: {
            type: String,
            default: () => {
                return ''
            }
        },
        size: [String, Number],
        direction: {
            type: String,
            default: () => {
                return 'rtl'
            }
        }
    },
    setup(props, { emit }) {
        const visibleDrawer = ref(false)
        watch(() => props.drawerDialog, (val)=> {
            visibleDrawer.value = val
        },{immediate: true, deep: true})
        const handleClose = () => {
            emit('handleClose')
        }
        return { visibleDrawer, handleClose }
    }
})
</script>