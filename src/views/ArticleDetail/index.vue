<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章加载中效果 -->
    <van-loading color="rgb(238, 10, 36)" v-if="Object.keys(artObj).length === 0">文章加载中...</van-loading>

    <div v-else>
      <!-- 文章信息区域 -->
      <div class="article-container">
        <!-- 文章标题 -->
        <h1 class="art-title">{{ artObj.title }}</h1>

        <!-- 用户信息 -->
        <van-cell center :title="artObj.aut_name" :label="format(artObj.pubdate)">
          <template #icon>
            <img :src="artObj.aut_photo" alt="" class="avatar">
          </template>
          <template #default>
            <div>
              <van-button type="info" size="mini" v-if="artObj.is_followed === true" @click="followedFn(true)">已关注</van-button>
              <van-button icon="plus" type="info" size="mini" plain v-else @click="followedFn(false)">关注</van-button>
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 -->
        <div class="art-content" v-html="artObj.content"></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>

        <!-- 点赞 -->
        <div class="like-box">
          <!-- -1无态度, 0未点赞, 1点赞 -->
          <van-button icon="good-job" type="danger" size="small" v-if="artObj.attitude === 1" @click="loveFn(true)">已点赞</van-button>
          <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="loveFn(false)">点赞</van-button>
        </div>
      </div>

      <!-- 文章评论列表 -->
      <div>
        <CommentList></CommentList>
      </div>
    </div>
  </div>
</template>

<script>
import { detailApi, userFollowedApi, userUnFollowedApi, likeArticleApi, unLikeArticleApi } from '@/api/index'
import { timeAgo } from '@/utils/date'
import CommentList from './CommentList.vue'
export default {
  name: 'ArticleDetailIndex',
  components: {
    CommentList
  },
  data() {
    return {
      artObj: {} // 文章详情对象
    }
  },
  async created() {
    const { data: res } = await detailApi({
      art_id: this.$route.query.art_id
    })
    // console.log(res)
    this.artObj = res.data
  },
  methods: {
    // 处理时间
    format: timeAgo,
    // 点击关注/取关作者
    async followedFn(bool) {
      if (bool === true) {
        // 点的是已关注,想要取关
        this.artObj.is_followed = false
        // 调取关接口
        await userUnFollowedApi({
          aut_id: this.artObj.aut_id
        })
      } else {
        // 点的是关注，想要关注
        this.artObj.is_followed = true
        // 调关注接口
        await userFollowedApi({
          aut_id: this.artObj.aut_id
        })
      }
    },
    // 点赞/取消点赞 -> 文章
    async loveFn(bool) {
      if (bool === true) {
        // 用户点击的是 “ 已点赞 ”，想要取消点赞
        // 取消点赞
        this.artObj.attitude = 0 // -1无态度, 0未点赞, 1点赞
        await unLikeArticleApi({
          art_id: this.artObj.art_id
        })
      } else {
        // 用户点击的是 “ 点赞 ”，想要点赞
        // 点赞
        this.artObj.attitude = 1
        await likeArticleApi({
          art_id: this.artObj.art_id
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}

// 文章加载中效果样式
.van-loading {
  text-align: center;
  padding-top: 46px;
}
</style>
