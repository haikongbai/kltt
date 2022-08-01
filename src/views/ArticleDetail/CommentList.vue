<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="{'art-cmt-container-1':isShowCmtBox,'art-cmt-container-2':!isShowCmtBox}">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="obj in commentsList" :key="obj.com_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo" alt="" class="avatar">
              <span class="uname">{{ obj.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon name="like" size="16" color="red" v-if="obj.is_liking === true " @click="likeFn(true,obj)" />
              <van-icon name="like-o" size="16" color="gray" v-else @click="likeFn(false,obj)" />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{ obj.content }}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ format(obj.pubdate) }}</div>
        </div>
      </van-list>
    </div>
    <!-- 发表评论区 -->
    <div>
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="isShowCmtBox === true">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="switchShowFn">发表评论</div>
        <div class="icon-box">
          <van-badge :content="totalCount=== 0 ? '':totalCount" max="99">
            <van-icon name="comment-o" size="0.53333334rem" @click="moveFn" />
          </van-badge>
          <van-icon name="star-o" size="0.53333334rem" />
          <van-icon name="share-o" size="0.53333334rem" />
        </div>
      </div>

      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea placeholder="友善评论、理性发言、阳光心灵" v-fofo @blur="blurFn" v-model.trim="comText"></textarea>
        <van-button type="default" :disabled="comText.length === 0" @click="sendMessageFn">发布</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { commentsList, commentLikingApi, commentUnlikingApi, commentSendApi } from '@/api/index'
import { timeAgo } from '@/utils/date'
export default {
  name: 'CommentList',
  data() {
    return {
      offset: null, // 偏移量id（评论id）告诉后台从此id往后返回数据给前端, 做加载更多效果
      commentsList: [], // 评论列表数据
      isShowCmtBox: true, // 是否显示底部添加评论区域 - 1
      totalCount: 0, // 评论总数
      comText: '', // 发布的评论内容信息
      loading: false, // 加载状态
      finished: false, // 是否所有的都加载完毕
      lastId: null // 最后一个评论的id,用来分页
    }
  },
  async created() {
    const { data: res } = await commentsList({
      id: this.$route.query.art_id // 文章ID
    })
    // console.log(res)
    this.commentsList = res.data.results
    this.totalCount = res.data.total_count
    this.lastId = res.data.last_id
    // 当一进入文章详情页，如果没有评论，直接让文章评论列表显示加载完成效果
    if (res.data.results.length === 0) {
      this.finished = true
    }
  },
  methods: {
    // 处理时间的方法
    format: timeAgo,
    // 点击显示“红心”/“灰心”
    async likeFn(bool, commentObj) {
      if (bool === true) {
        // 点击的是 “红心”
        // 要显示“灰心”
        commentObj.is_liking = false
        await commentUnlikingApi({
          com_id: commentObj.com_id
        })
      } else {
        // 点击的是“灰心”
        // 要显示“红心”
        commentObj.is_liking = true
        await commentLikingApi({
          com_id: commentObj.com_id
        })
      }
    },
    // 点击切换成底部添加评论区---2
    switchShowFn() {
      this.isShowCmtBox = false
    },
    // 点击底部添加评论区的评论图标触发滚动事件，把第一条评论滚动到页面最上方
    // commentClickFn() {
    // 使用这个方法没有动画效果
    //   // JS是在 html + css 都渲染完毕之后，在真实的 DOM 中执行的，所以可以用 document.querySelector('.article-container') 获取父组件的文章信息区域的 DOM
    //   const articleHight = document.querySelector('.article-container').scrollHeight
    //   window.scrollTo(0, articleHight)
    // }

    // 评论滑动
    async moveFn() {
      // 真实 DOM都在document(所以不在一个vue文件内), 也是可以获取的
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 点击发布评论
    async sendMessageFn() {
      // console.log(this.comText)
      const { data: res } = await commentSendApi({
        id: this.$route.query.art_id,
        content: this.comText
      })
      // console.log(res)
      this.commentsList.unshift(res.data.new_obj)
      this.totalCount++
      this.comText = ''
      this.moveFn()
    },
    // 评论输入框失去焦点事件
    blurFn() {
      // 把此事件变成异步事件，避免在失去焦点的瞬间，底部评论区--2被移除，导致发布事件无法执行
      setTimeout(() => {
        this.isShowCmtBox = true
      }, 0)
    },
    // 上拉加载更多评论
    async onLoad() {
      if (this.commentsList.length > 0) {
        const { data: res } = await commentsList({
          id: this.$route.query.art_id, // 文章ID
          offset: this.lastId
        })
        this.commentsList = [...this.commentsList, ...res.data.results]
        this.totalCount = res.data.total_count
        this.lastId = res.data.last_id
        // console.log(res)
        if (res.data.last_id === null) {
          this.finished = true
        }
        this.loading = false
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
