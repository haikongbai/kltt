<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ obj.title }}</span>
          <!-- 单图 -->
          <!-- <img v-if="obj.cover.type === 1" :src="obj.cover.images[0]" alt="" class="thumb"> -->
          <van-image v-if="obj.cover.type === 1" :src="obj.cover.images[0]" class="thumb">
            <template v-slot:error>图片走丢了。。</template>
          </van-image>
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="obj.cover.type > 1">
          <!-- <img v-for="(imagesUrl,index) in obj.cover.images " :key="index" :src="imagesUrl" alt="" class="thumb"> -->
          <van-image v-for="(imagesUrl,index) in obj.cover.images " :key="index" :src="imagesUrl" class="thumb">
            <template v-slot:error>图片走丢了。。</template>
          </van-image>
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>作者: {{ obj.aut_name }}</span>
            <span>{{ obj.comm_count }}评论</span>
            <span>{{ formatTime(obj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" get-container="body" :cancel-text="bottomText" @cancel="cancelFn" @closed="closeFn" />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  name: 'ArticleItem',
  props: {
    // 文章列表信息对象
    obj: Object,
    isShow: {
      type: Boolean,
      default: true // 首页文章列表不传，默认显示
    }
  },
  data() {
    return {
      show: false, // 控制反馈面板显示/隐藏
      actions: firstActions, // 反馈面板选项数组
      bottomText: '取消' // 底部按钮文字
    }
  },
  methods: {
    // 处理时间的方法
    formatTime: timeAgo, // 函数体是timeAgo
    // 控制反馈面板的方法
    onSelect(action, item) {
      // console.log(action) // 点击的选项对象
      // console.log(item) // 点击的选项的索引
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('dislike', this.obj.art_id)
        this.show = false
      } else {
        // 反馈面板二级选项
        this.$emit('reportEV', this.obj.art_id, action.value)
        this.show = false
      }
    },
    // 底部按钮事件
    cancelFn() {
      if (this.bottomText === '返回') {
        this.show = true // 强制让反馈面板在点击按钮后又显示
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 关闭面板且动画结束-触发事件
    closeFn() {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style lang="less" scoped>
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
