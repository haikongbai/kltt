<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search placeholder="请输入搜索关键词" background="rgb(238, 10, 36)" shape="round" v-fofo v-model.trim="kw" @input="inputFn" @search="searchFn" />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div class="sugg-item" v-for="(str,index) in suggestList" :key="index" v-html="lightStr(str,kw)" @click="suggestClickFn(str)">
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(str,index) in history" :key="index" @click="historyFn(str)">{{ str }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListApi } from '@/api/index'
import { setStorage, getStorage } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖延时器变量
      suggestList: [], // 联想建议列表文字数组
      history: JSON.parse(getStorage('his')) || [] // 搜索历史
    }
  },
  methods: {
    // 输入框改变时
    inputFn() {
      // 防抖
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          const { data: res } = await suggestListApi({
            keywords: this.kw
          })
          // console.log(res)
          this.suggestList = res.data.options
        }, 300)
      }
    },
    // 专门处理字符串高亮关键字
    lightStr(originStr, target) {
      if (originStr?.length > 0) {
        // originStr 原来的字符串
        // target 目标字符
        // replace 只能匹配到第一个符合条件的
        // replaceAll 可以匹配所有符合条件的
        // replace 和 replaceAll 都不能忽略大小写
        // 所以最后只能用正则表达式
        // 如果要使用变量，作为正则表达式的匹配条件，就不能使用语法糖简化写法：/ /
        const reg = new RegExp(target, 'ig') // i 忽略大小写 ，g 匹配所有的
        // 不能用target直接替换，因为会把匹配到的，换成自己输入的关键字，改变了匹配到的字符
        const lightNewStr = originStr.replace(reg, metch => {
          // metch 就是匹配时原字符串中的字符
          return `<span style=" color:red; ">${metch}</span>`
        })
        return lightNewStr
      }
    },
    // 封装的搜索事件
    moveFn(theKw) {
      setTimeout(() => {
        this.$router.push({
          path: `/search_result/${theKw}`
        })
      }, 0)
    },
    // 输入框 - 搜索事件
    searchFn() {
      if (this.kw.length > 0) {
        this.history.push(this.kw)
        this.moveFn(this.kw)
      }
    },
    // 搜索建议列表 - 点击跳转到搜索结果页
    suggestClickFn(str) {
      this.history.push(str)
      this.moveFn(str)
    },
    // 历史列表 - 点击跳转到搜索结果页
    historyFn(str) {
      this.moveFn(str)
    },
    // 清空搜索历史纪录
    clearFn() {
      this.history = []
    }
  },
  watch: {
    history: {
      deep: true,
      handler() {
        // 在 ES6 中除了 Array,Object,新增了 Set ，Map
        // 使用 Set 去掉数值中重复的值，但是如果数组中的是对像比较的就是内存地址
        // Set： 无序不重复的value集合体
        const theSet = new Set(this.history)
        // 把它转换回Array
        const Arr = Array.from(theSet)
        // 本地不能存储数组，所以把它转为JSON字符串
        setStorage('his', JSON.stringify(Arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: rgb(238, 10, 36);
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
