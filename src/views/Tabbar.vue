<template>
  <div>
      <router-view></router-view>
     <van-tabbar route>
        <van-tabbar-item icon="home-o" to="/" >首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
        <van-tabbar-item icon="cashier-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/user">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
