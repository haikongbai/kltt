<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 搜索结果文章列表 -->
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">

        <ArticleItem v-for="obj in articleList" :key="obj.art_id" :obj="obj" :isShow="false" @click.native="itemClickFn(obj.art_id)"></ArticleItem>

      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultApi } from '@/api/index'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  data() {
    return {
      page: 1, // 页码
      articleList: [], // 文章列表
      loading: false, // 加载状态
      finished: false // 是否全部加载完成
    }
  },
  async created() {
    const { data: res } = await searchResultApi({
      page: this.page,
      q: this.$route.params.kw
    })
    // console.log(res)
    this.articleList = res.data.results
  },
  methods: {
    // 上拉加载
    async onLoad() {
      if (this.articleList.length > 0) {
        this.page++
        const { data: res } = await searchResultApi({
          page: this.page,
          q: this.$route.params.kw
        })
        // console.log(res)
        if (res.data.results.length === 0) {
          this.finished = true
          return
        }
        this.articleList = [...this.articleList, ...res.data.results]
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 点击文章单元格-跳转到文章详情页
    itemClickFn(id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
