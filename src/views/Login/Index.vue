<template>
  <div>
    <van-nav-bar title="快乐头条-登录" />
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" required name="mobile" label="手机号" placeholder="请输入11位手机号" :rules="[{ required: true, message: '请填写正确的手机号',pattern:/^1[3-9]\d{9}$/ }]" />
      <van-field v-model="user.code" required type="password" name="code" label="密码" placeholder="请输入6位密码" :rules="[{ required: true, message: '请填写6位密码',pattern:/^\d{6}$/ }]" />
      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit" :loading="isLoading" :disabled="isLoading" loading-text="请不要离开，在拼命登录中...">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token.js'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '18888888888', // 手机号
        code: '246810' // 验证码（无验证码接口，填成密码，必须是246810字符串）
      },
      isLoading: false // 登录按钮的状态
    }
  },
  methods: {
    // 登录
    async onSubmit(values) {
      // console.log('submit', values)
      this.isLoading = true // 把状态改为加载和禁用状态
      // try {} catch () {} 捕获同步代码的错误
      try {
        const { data: res } = await loginApi(values)
        // console.log(res)
        // 成功通知
        Notify({ type: 'success', message: '登录成功！' })
        setToken(res.data.token)
        // 跳转到首页
        this.$router.replace({ path: '/layout/home' })
      } catch (err) {
        // 失败通知
        Notify({ type: 'warning', message: '手机号或密码错误' })
      }
      this.isLoading = false // 无论成功与否都把状态改回来
    }
  }
}
</script>

<style lang="less" scoped>
</style>
