import { createApp } from 'vue'
import App from './App.vue'
import store from '@/libs/store'
import router from '@/router/index'
import config from '@/libs/config'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/assets/css/index.css'
import '@/assets/css/rewrite-element-plus.scss'

import 'animate.css/animate.min.css' //引入动画

// 创建vue实例
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

//分页等常量设定为全局变量
app.provide('$config', config)

app.use(store)
app.use(router)
// 挂载实例
app.mount('#app')
