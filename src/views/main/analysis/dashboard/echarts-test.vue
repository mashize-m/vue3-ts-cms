<template>
  <div class="dashboard">
    <div ref="divRef" :style="{ width: '500px', height: '400px' }"></div>
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
      // 1.初始化echarts的实例
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const echartInstance = echarts.init(divRef.value!)
      // 2.编写配置文件
      const option = {
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
      }
      // 3.设置配置，并且开始绘制
      echartInstance.setOption(option)
    })

    return { divRef }
  }
})
</script>

<style scoped></style>
