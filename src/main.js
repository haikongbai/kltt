import '@/utils/console'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 设置根标签的字体大小，做移动端的适配
import 'highlight.js/styles/default.css' // 代码高亮的样式
import directiveObj from './utils/directive'
import './Vuecomponent'
// 执行目标对象里的 install 方法并传入 Vue 类
Vue.use(directiveObj)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
