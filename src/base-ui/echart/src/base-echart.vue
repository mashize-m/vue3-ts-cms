<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义props
// 此时定义的类型是JavaScript类型
// defineProps({
//   width: String,
//   height: String
// })

// 定义props---TS类型
// withDefaults  --->  设置默认值
// defineProps  --->  定义props
// defineProps<>()  --->  泛型的方式定义TS类型
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

// 1.初始化echarts的实例
onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { setOptions } = useEchart(echartDivRef.value!)

  // 监听options数据的改变
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped></style>
