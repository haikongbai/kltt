<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小思同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(obj,index) in list " :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name !== 'me'">
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{ obj.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ obj.msg }}</div>
          <van-image fit="cover" round :src="$store.state.userPhoto" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model.trim="word">
        <template #button>
          <span style="font-size:12px;color:#999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import { getToken } from '@/utils/token'
export default {
  name: 'ChatIndex',
  data() {
    return {
      word: '', // 输入框的内容
      // 所有的聊天消息
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是编程小王子' }
      ],
      socket: null // websocket 实例对象
    }
  },
  created() {
    // 创建客户端 websocket 的实例,建立与服务器的socket链接
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })
    // 测试是否链接成功
    this.socket.on('connect', () => {
      console.log('链接建立成功')
    })
    // 接收后台传回的消息
    this.socket.on('message', obj => {
      this.list.push({
        name: 'xs',
        msg: obj.msg
      })
      // 实现收到消息后自动把最后一条消息滚动上来
      // Dom 更新是异步的，所以要加上$nextTick
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        // console.log(theDiv)
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },
  methods: {
    // 点击发送信息
    sendFn() {
      if (this.word.length === 0) return
      // 发送信息给后台
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date().getTime()
      })
      // 在前台渲染发送的信息
      this.list.push({
        name: 'me',
        msg: this.word
      })
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
      // 清空输入框
      this.word = ''
    }
  },
  destroyed() {
    // 在销毁组件时，关闭链接
    this.socket.close()
    // 清空websocket实例对象
    this.socket = null
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
