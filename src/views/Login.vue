<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="标题" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-validate="'required|digits:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
        left-icon="phone-o"
        v-model="user.mobile"
        placeholder="请输入手机号"
      />

      <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        left-icon="star-o"
        v-model="user.code"
        placeholder="请输入验证码"
      >
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
import { login } from "../api/user";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      }
    };
  },
  created() {
    // 配置VeeValidate的自定义信息
    const dict = {
      custom: {
        mobile: {
          required: "请输入手机号码",
          digits: "手机号码必须是11位数字"
        },
        code: {
          required: "请输入验证码",
          digits: "验证码必须是6位数字"
        }
      }
    };
    this.$validator.localize("en", dict);
  },
  methods: {
    ...mapMutations(["setUser"]),
    // 点击按钮  处理登录
    async handleLogin() {
      try {
        // 表单验证
       const valid = await this.$validator.validate()
          // 验证失败
        if (!valid) {
              return
        }
        // data是接口返回中的数据 (因为在响应拦截器做了处理)
        let data = await login(this.user);
        // 登录成功之把token存放到 store 和本地 存储中
        // this.$store.commit('setUser', data)
        this.setUser(data);
        this.$toast.success("登录成功");
        this.$router.push("/");

      } catch (err) {
        this.$toast.fail("登录失败");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .btn {
    width: 100%;
  }
}
</style>
