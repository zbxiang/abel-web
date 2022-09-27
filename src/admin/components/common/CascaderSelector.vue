<template>
    <el-cascader v-model="selectValue" :options="options" clearable :placeholder="placeholder" filterable />
</template>

<script lang="ts" setup>
import { CascaderOption } from 'element-plus'
import {
    PropType,
    computed,
    ref,
    watch
} from 'vue'
const emitter = defineEmits(['update:value'])
const props = defineProps({
    value: {
        type: [String, Number],
        default: ''
    },
    data: {
        ype: Array as PropType<Array<any>>,
        default: () => []
    },
    placeholder: {
        type: String,
        default: '请选择',
    },
    dataFields: {
        type: Object,
        default: () => ({
            label: 'label',
            value: 'value',
            children: 'children'
        })
    }
})
const selectValue = ref(props.value)
watch(
  () => selectValue.value,
  (v) => emitter('update:value',v)
)
const options = computed(() => transformData(props.data))
const transformData = (data: Array<any>) => {
    const options: CascaderOption[] = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i]
        const item: CascaderOption = {
            label: element[props.dataFields.label || 'label'],
            value: element[props.dataFields.value || 'value']
        }
        const tempChildren = element[props.dataFields.children || 'children']
        if (tempChildren && tempChildren.length > 0) {
            item.children = transformData(tempChildren)
        }
        options.push(item)
    }
    return options
}
</script>