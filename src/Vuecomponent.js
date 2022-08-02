// 从Vant 组件库引入的组件，及注册
import Vue from 'vue'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Dialog, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, Tag, CellGroup, DatetimePicker, Loading, Lazyload } from 'vant'

Vue.use(Lazyload, {
  preLoad: 0.8, // 屏幕高度的范围百分比0-1，预加载范围
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F8%2F27%2F0ed4d9aa-f04e-4d94-aa3e-af7b2c9e39e0.jpg&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662019324&t=98d75bfb72319f76228622bffab6f6f2' // 找不到图片时显示此图片
})
Vue.use(Loading)
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
