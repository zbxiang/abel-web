<template>
    <div class="main-container">
        主控制
    </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue'

export default defineComponent({
    name: 'Home'
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
    .item-wrapper {
        margin-bottom: 5px;
    }
    .map-margin-tb {
        margin: 5px 0;
    }
}
.light {
    .chart-item {
        background-color: #fff;
    }
}
.stack-avatar-wrapper {
    position: absolute;
    right: -2%;
    top: 10%;
}
</style>