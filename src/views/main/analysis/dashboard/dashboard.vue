<template>
  <div class="dashboard">
    <div ref="divRef"></div>
    <h2>dashboard</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const echartInstance = echarts.init(divRef.value!)
      echartInstance.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    })

    return { divRef }
  }
})
</script>

<style scoped></style>
