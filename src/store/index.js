import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20200215%2F17051a9740c448aa8569a88fcf76e525.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662000795&t=fdbba15cb9f49d9b3964fe88371821c4' // 头像图片默认地址
  },
  getters: {
  },
  mutations: {
    SET_USERPHOTO(state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
