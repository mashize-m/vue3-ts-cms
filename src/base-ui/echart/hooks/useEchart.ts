import * as echarts from 'echarts'

export default function (el: HTMLElement) {
  // 1.初始化echarts的实例
  const echartInstance = echarts.init(el)
  // 2.编写配置文件
  // 3.设置配置，并且开始绘制
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 当页面内容产生改变时，让Echarts图例也改变大小
  const updateResize = () => {
    echartInstance.resize()
  }

  // 当浏览器窗口发现改变时，让Echarts图例也改变大小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
