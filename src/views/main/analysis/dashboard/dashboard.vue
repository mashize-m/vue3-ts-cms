<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <msz-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </msz-card>
      </el-col>
      <el-col :span="10">
        <msz-card title="不同城市商品销量"></msz-card>
      </el-col>
      <el-col :span="7">
        <msz-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </msz-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <msz-card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </msz-card>
      </el-col>
      <el-col :span="12">
        <msz-card title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </msz-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import MszCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    MszCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    const categoryGoodsCount = computed(() => {
      // 获取的数据格式，不是预期的格式时，通过map函数进行转换
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    // 获取折线图数据
    const categoryGoodsSale = computed(() => {
      const xLables: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale

      for (const item of categoryGoodsSale) {
        xLables.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLables, values }
    })

    // 获取柱状图数据
    const categoryGoodsFavor = computed(() => {
      const xLables: string[] = []
      const values: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor

      for (const item of categoryGoodsFavor) {
        xLables.push(item.name)
        values.push(item.goodsFavor)
      }

      return { xLables, values }
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
