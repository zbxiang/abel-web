import { ElInput } from 'element-plus'
import { Ref, VNode } from 'vue'
import {
    FormItem
} from '@/admin/types'
type RenderProps = {
    render: (formItem: FormItem) => VNode
    formItem: FormItem
    [key: string]: any
}

export type FormRenderItem = FormItem & {
    render?: (formItem: FormItem) => VNode
}

export default function FormRender(props: RenderProps) {
    return props.render(props.formItem || props['form-item'])
}