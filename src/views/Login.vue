<template>
  <div>
      <!-- 导航头 -->
        <van-nav-bar
        title="标题"
        />
        <!-- 输入框 -->
        <van-cell-group>
          <van-field left-icon="phone-o" placeholder="请输入用户名" />
          <van-field left-icon="star-o" placeholder="请输入用户名">
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
        </van-cell-group>
        <!-- 登录按钮 -->
        <div class="login-btn">
            <van-button type="info" class="btn">信息按钮</van-button>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .login-btn{
        padding: 20px;
        .btn{
            width: 100%;
        }
    }
</style>