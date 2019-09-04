<template>
  <div>
  <van-nav-bar
  title="头条"
  />
  <!-- 频道列表 -->
  <van-tabs animated>
  <van-tab v-for="(item,index) in channelList" :title="item.name" :key='index'>
    <!-- 列表 -->
    <van-list
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
    </van-list>
  </van-tab>
</van-tabs>
</div>
</template>

<script>
import { channel, articlesList } from '../../api/user'
export default {
  data () {
    return {
      channelList:[],
      list: [1,2],
      loading: false,
      finished: false,
      page:{
        page:1,
        per_page:10
      }
    }
  },

  methods: {
   
  },
 async created() {
    //获取频道列表
    let p = await channel();
    this.channelList = p.channels
    // 获取频道列表
    let w = await articlesList(this.page)
    console.log(w)
  }

}
</script>

<style>

</style>
