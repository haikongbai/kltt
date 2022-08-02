<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="profileObj.photo" @click="imageClickFn" />
          <!-- file 选择框 -->
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="profileObj.name" @click="nameClickFn" />
      <van-cell title="生日" is-link :value="profileObj.birthday" @click="birthdayClickFn" />
    </van-cell-group>

    <!-- 姓名修改弹框 -->
    <van-dialog v-model="show" title="标题" show-cancel-button :before-close="beforeCloseFn">
      <input type="text" v-fofo v-model="nameText">
    </van-dialog>

    <!-- 日期选择弹出层 -->
    <van-popup v-model="dateShow" position="bottom" :style="{ height: '50%' }">

      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="dateCancelFn" @confirm="dateConfirmFn" />

    </van-popup>

  </div>
</template>

<script>
import { getUserProfileApi, updateUserPhotoApi, updateUserProfileApi } from '@/api/index'
import Notify from '@/ui/Notify'
import { formatTime } from '@/utils/date'
import { mapMutations } from 'vuex'
export default {
  name: 'UserEdit',
  data() {
    return {
      profileObj: {}, // 用户个人简介信息
      show: false, // 控制姓名修改弹窗的显示与隐藏
      nameText: '', // 输入的姓名
      minDate: new Date(1920, 0, 1), // 可选的最小时间
      maxDate: new Date(), // 可选的最大事件（默认为当前系统时间）
      currentDate: new Date(), // 当前选的时间
      dateShow: false // 控制弹出层显示/隐藏
    }
  },
  async created() {
    const { data: res } = await getUserProfileApi()
    // console.log(res)
    this.profileObj = res.data
    this.SET_USERNAME(res.data.name)
  },
  methods: {
    ...mapMutations(['SET_USERPHOTO', 'SET_USERNAME']),
    // 文件选择改变事件
    async onFileChange(e) {
      if (e.target.files.length === 0) return // 如果用户点击了头像，但没选图片，点击了取消，就要阻止发送
      // console.log(e.target.files[0]) // 用户选中文件对象
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const { data: res } = await updateUserPhotoApi(theFd)
      // console.log(res)
      this.profileObj.photo = res.data.photo
      this.SET_USERPHOTO(res.data.photo)
    },
    // 点击头像
    imageClickFn() {
      this.$refs.iptFile.click()
    },
    // 点击姓名触发此事件
    nameClickFn() {
      this.show = true
      this.nameText = this.profileObj.name
    },
    // 姓名弹框，弹框关闭前的回调函数
    async beforeCloseFn(action, done) {
      // console.log(action)
      if (action === 'confirm') {
        // 点击了确定
        const reg = /^[a-zA-Z0-9\u4E00-\u9FA5]{1,7}$/
        if (reg.test(this.nameText) === true) {
          // 通过了校验
          await updateUserProfileApi({
            name: this.nameText
          })
          // console.log(res)
          this.profileObj.name = this.nameText
          this.SET_USERNAME(this.nameText)
          done()
        } else {
          // 没通过校验，通知用户
          Notify({ type: 'warning', message: '用户名只能是1-7位中英数字组合' })
          done(false)
        }
      } else {
        // 点击了取消
        done()
      }
    },
    // 生日单元格点击事件
    birthdayClickFn() {
      this.dateShow = true
      this.currentDate = new Date(this.profileObj.birthday)
    },
    // 日期选择器取消事件
    dateCancelFn() {
      this.dateShow = false
    },
    // 日期选择器确定事件
    async dateConfirmFn() {
      // 需要把日期对象转化为 年-月-日格式
      await updateUserProfileApi({
        birthday: formatTime(this.currentDate)
      })
      this.dateShow = false
      this.profileObj.birthday = formatTime(this.currentDate)
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
/deep/ .van-dialog__content {
  text-align: center;
  input {
    padding: 0;
    outline: none;
    border: none;
    text-align: center;
  }
}
</style>
