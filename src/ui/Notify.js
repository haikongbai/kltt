// 基于 vant 进行二次封装,这样可以在内部统一修改
// 封装通知的"方法"
// import { Notify } from 'vant'
// export default Notify

import { Toast } from 'vant'
export default ({ type, message }) => {
  if (type === 'warning') {
    type = 'fail'
  }
  Toast({
    type,
    message
  })
}
