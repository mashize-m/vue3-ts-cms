import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

// 全局引用
// import ElementPlus from 'element-plus'
// 全局引用样式
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
// 导入所有的el-icon图标
// import * as ElIconModules from '@element-plus/icons-vue'
// 导入转换图标名称的函数
// import { transElIconName } from './utils/utils'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store/index'
import { globalRegister } from './global'

const app = createApp(App)
// 统一注册el-icon图标
// for (const iconName in ElIconModules) {
//   app.component(transElIconName(iconName), ElIconModules[iconName])
// }
// for (const iconName in ElIconModules) {
//   app.component(
//     transElIconName(iconName),
//     ElIconModules[iconName as keyof typeof ElIconModules]
//   )
// }

// 注册全局自定义属性
app.use(globalRegister)

app.use(store)
setupStore()

app.use(router)
// 全局使用
// app.use(ElementPlus)

app.mount('#app')
// createApp(App).mount("#app");
