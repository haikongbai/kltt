// 对自定义全局指令的封装
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
export default directiveObj
