import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

// 全局引用
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store/index'

const app = createApp(App)
app.use(router)
app.use(store)
setupStore()
// 全局使用
// app.use(ElementPlus)
app.mount('#app')
// createApp(App).mount("#app");
