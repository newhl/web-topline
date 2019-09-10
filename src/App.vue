<template>
  <div id="app">
    <!-- 使用keep-alive包裹缓存动态切换的组件 -->
    <!-- exclude不缓存的页面  -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">

</style>
