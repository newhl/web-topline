<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="标题" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field left-icon="phone-o" v-model="user.mobile" placeholder="请输入手机号" />
      <van-field left-icon="star-o" v-model="user.code" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button type="info" class="btn" @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>

import { login } from '../api/user'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 点击按钮  处理登录
    async handleLogin () {
      try {
        let data = await login(this.user)
        this.$toast.success('登录成功')
        this.$router.push('/')
        // 登录成功之把token存放到 store 和本地 存储中
        //   this.$store.commit('setUser', data)
        this.setUser(data)
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>
