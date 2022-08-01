<template>
  <div>
    <!-- 头部导航栏 -->
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff" @click="toSearch" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab标签栏 -->
    <div class="main">
      <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem">
        <van-tab v-for="item in userChannelsList" :key="item.id" :title=" item.name" :name="item.id">
          <article-list :channelId='channelId'></article-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 编辑频道图标 -->
    <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="showPopup" />
    <!-- 编辑频道弹出层 -->
    <van-popup class="channel_Pupup" v-model="show" get-container="body">

      <ChannelEdit :userList="userChannelsList" :unCheckList="unCheckChannelList" @addChannelEV="addChannelFn" @removeUserChannelEV="removeUserChannelFn" @closeEV="closeFn" ref="editRef" v-model="channelId">
      </ChannelEdit>

    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsApi, getAllChannelsApi, updateChannelsApi } from '@/api/index'
import ArticleList from './components/AtricelList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  name: 'HomeIndex',
  data() {
    return {
      channelId: 0, // 频道id，默认为0（一打开页面，推荐频道高亮，获取推荐频道文章列表数据）
      userChannelsList: [], // 用户选择频道列表
      allChannleList: [], // 所有频道列表
      show: false // 频道弹出层显示/隐藏
    }
  },
  async created() {
    // 频道列表
    const { data: res } = await getUserChannelsApi()
    // console.log(res)
    this.userChannelsList = res.data.channels

    // 所有频道列表
    const { data: res2 } = await getAllChannelsApi()
    this.allChannleList = res2.data.channels
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    // 点击＋号，触发事件
    showPopup() {
      this.show = true
    },
    // 更新用户频道
    async updateUserChannels() {
      // 因为推荐频道不能动，所以先把它筛选出去
      const newArr = this.userChannelsList.filter(item => item.id !== 0)
      // 因为后台接口不需要 name 属性，要 seq（频道序号） 属性
      const theNewArray = newArr.map((item, i) => {
        const newObj = { ...item } // 浅拷贝
        delete newObj.name
        newObj.seq = i
        return newObj
      })
      // 发给后台
      await updateChannelsApi({
        channels: theNewArray
      })
    },
    // 添加用户频道
    addChannelFn(obj) {
      this.userChannelsList.push(obj)
      this.updateUserChannels()
    },
    // 删除频道
    removeUserChannelFn(channelObj) {
      const index = this.userChannelsList.findIndex(item => item.id === channelObj.id)
      this.userChannelsList.splice(index, 1)
      this.updateUserChannels()
    },
    // 关闭频道弹出层，并且把弹出层的编辑状态重置
    closeFn() {
      this.show = false
      this.$refs.editRef.isEdit = false
    },
    // 点击首页右上角的搜索图标跳转到搜索页面
    toSearch() {
      this.$router.push('/search')
    }
  },
  computed: {
    // 计算未被用户选择的频道列表
    unCheckChannelList() {
      const newArr = this.allChannleList.filter(bigObj => {
        const index = this.userChannelsList.findIndex(smallObj => {
          return smallObj.id === bigObj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 120px;
  height: 45px;
}
.main {
  padding-top: 46px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
// 频道弹出层样式
.channel_Pupup {
  width: 100vw;
  height: 100vh;
}
</style>
