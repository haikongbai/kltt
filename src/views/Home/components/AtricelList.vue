<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50">

        <article-item v-for="item in articleList" :key="item.art_id" :obj="item" @dislike="dislikeFn" @reportEV="reportFn" @click.native="itemClickFn(item.art_id)"></article-item>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { getArticleList, dislikeArticleApi, reportArticleApi } from '@/api/index'
import { Notify } from 'vant'
export default {
  name: 'ArticleList',
  props: {
    channelId: Number
  },
  data() {
    return {
      articleList: [], // 文章列表
      loading: false, // 用于分页
      finished: false,
      theTiem: new Date().getTime(), // 当前系统时间戳
      isLoading: false // 顶部加载状态
    }
  },
  components: {
    ArticleItem
  },
  created() {
    this.getArticleListFn()
  },
  methods: {
    // 请求文章列表数据
    async getArticleListFn() {
      const { data: res } = await getArticleList({
        channel_id: this.channelId, // 默认请求推荐页面
        timestamp: this.theTiem
      })
      // console.log(res.data)
      this.theTiem = res.data.pre_timestamp
      this.articleList = [...this.articleList, ...res.data.results]

      this.loading = false // 上拉加载事件才用到
      if (res.data.pre_timestamp === null) {
        // 说明当前请求的是最后一页了
        this.finished = true
      }

      // 改变刷新状态（在下拉刷新时用到）
      this.isLoading = false
    },
    // 上拉加载事件
    onLoad() {
      if (this.articleList.length === 0) {
        this.loading = false
        return
      }
      this.getArticleListFn()
    },
    // 下拉刷新事件
    async onRefresh() {
      this.articleList = []
      this.theTiem = new Date().getTime()
      this.getArticleListFn()
    },
    // 反馈 - 不感兴趣文章
    async dislikeFn(artId) {
      await dislikeArticleApi(artId)
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 反馈 - 垃圾内容
    async reportFn(id, value) {
      await reportArticleApi({
        artId: id,
        type: value
      })
      Notify({ type: 'success', message: '举报成功' })
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

<style>
</style>
