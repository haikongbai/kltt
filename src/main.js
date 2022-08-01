import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 设置根标签的字体大小，做移动端的适配

import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Dialog, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, Tag, CellGroup, DatetimePicker } from 'vant'

Vue.use(DatetimePicker)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(VanImage)
Vue.use(Search)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)

// 封装中间件函数插件
const directiveObj = {
  // install 是固定方法
  install(Vue) {
    Vue.directive('fofo', {
      inserted(el) {
        // 因为此时这个自定义指令是用在一个组件上的，而组件的根标签是一个 div，input标签在里面，所以要用 el.querySelector('input') 获取,如果是绑定在标签上的就可以直接获取到需要的 Dom元素
        // const theInput = el.querySelector('input')
        // theInput.focus()
        // 可以使用 DOM.nodeName 获取标签名（它获取的是大写字符串）
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el 本身不是目标标签时，往里面获取
          const theInput = el.querySelector('input')
          const theTextarea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextarea) theTextarea.focus()
        }
      },
      update(el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el 本身不是目标标签时，往里面获取
          const theInput = el.querySelector('input')
          const theTextarea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextarea) theTextarea.focus()
        }
      }
    })
  }
}
// 执行目标对象里的 install 方法并传入 Vue 类
Vue.use(directiveObj)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
