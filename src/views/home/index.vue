<template>
  <div>
  <van-nav-bar
  fixed
  title="头条"
  />
  <!-- 频道列表 -->
  <van-tabs animated v-model="activeIndex">
  <!-- 频道列表 右侧小图标 -->
  <van-icon slot="nav-right" name="wap-nav" class="nav-btn" @click="showChannelEdit=true"/>
  <van-tab v-for="item in channelList" :title="item.name" :key="item.id">
    <!-- 下拉加载更多组件 -->
    <van-pull-refresh v-model="currentChannel.pullLoading" @refresh="onRefresh" :success-text="successText">
      <!-- 文章列表, 不同标签页下有不同的列表 -->
    <van-list
        v-model="currentChannel.loading"
        :finished="currentChannel.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in currentChannel.articles"
          :key="item.art_id.toString()"
          :title="item.title"
        >
         <!--显示图片-->
        <div slot="label">
          <!-- grid 显示封面
            item.cover.type 0 没有图片 1 1张图片 3 3张图片
          -->
          <van-grid v-if="item.cover.type" :border="false" :column-num="3">
            <van-grid-item
            v-for="(img, index) in item.cover.images"
            :key="img + index"
            >
              <van-image height="80" :src="img">
                <template slot="loading">
                    <van-loading type="spinner" size="20px"/>
                </template>
                <!-- 加载失败时的提示内容 -->
                <template slot="error">加载失败</template>
              </van-image>
            </van-grid-item>
          </van-grid>
          <p>
            <span>{{item.aut_name}}</span>&nbsp;
            <span>{{item.comm_count}}评论</span>&nbsp;
            <span>{{item.pubdate | fmDate }}</span>&nbsp;
            <!-- 当点击当前按钮时把当前的文章对象传给子组件 -->
            <van-icon name="cross" class="close" @click="handleAction(item)"/>
          </p>
        </div>
        </van-cell>
    </van-list>
   </van-pull-refresh>
  </van-tab>
</van-tabs>
<!-- 弹出频道管理 -->
<channel-edit @activeChange="handleChange" :active="activeIndex" :channelList="channelList" v-model="showChannelEdit"></channel-edit>
<!-- 弹出文章更多的操作 -->
<!-- 如果currentArticle的值为null, 不显示此组件 -->
<more-action v-if="currentArticle"
:article="this.currentArticle"
v-model="showMoreAction"
@handleSuccess="handleSuccess"></more-action>
</div>
</template>

<script>
import { getDefaultOrUserChannels } from '../../api/channel'
import { getArticles } from '../../api/article'
// 加载改变频道的弹框组件
import ChannelEdit from './components/ChannelEdit'
// 加载文章更多的操作
import MoreAction from './components/MoreAction'
export default {
  data () {
    return {
      name: 'Home',
      channelList: [],
      list: [],
      loading: false,
      finished: false,
      activeIndex: 0,
      successText: '',
      showChannelEdit: false,
      showMoreAction:false,
      currentArticle:null
    }
  },
  // 注册组件
  components: {
    ChannelEdit,
    MoreAction
  },
  // 计算属性
  computed: {
    currentChannel () {
      // 返回当前频道对象
      return this.channelList[this.activeIndex]
    }
  },
  methods: {
    // 加载频道列表
    async loadChannels () {
      try {
        const data = await getDefaultOrUserChannels()
        // 给所以频道设置 时间戳和文章数组
        data.channels.forEach((channel) => {
          channel.timestamp = null
          channel.articles = []
          // 上拉加载
          channel.loading = false
          channel.finished = false
          // 下拉加载
          channel.pullLoading = false
        })
        this.channelList = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    async onLoad () {
      // 发送请求
      // 获取当前频道对象  --- 下面不需要写了，因为设置了一个当前频道的计算属性
      // const currentChannel = this.channels[this.activeIndex]
      //  当前频道对象 时间戳
      //  当前频道对象 文章数组
      const data = await getArticles({
        // 频道的id
        channel_id: this.currentChannel.id,
        // 时间戳
        timestamp: this.currentChannel.timestamp || Date.now(),
        // 是否包含置顶1，0不包含
        with_top: 1
      })
      // 记录文章列表，记录最后一条数据的时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      // console.log(data.results)
      this.currentChannel.articles.push(...data.results)
      // this.loading = false
      this.currentChannel.loading = false
      // 文章加载完毕
      // 如果某一个频道加载完毕，其它频道中的finished 也是加载完毕
      if (data.results.length === 0) {
        // this.finished = true
        this.currentChannel.finished = true
      }
    },
    // 下拉加载动作
    async onRefresh () {
      try {
        const data = await getArticles({
          // 频道的id
          channel_id: this.currentChannel.id,
          // 时间戳
          timestamp: Date.now(),
          // 是否包含置顶1，0不包含
          with_top: 1
        })
        this.currentChannel.pullLoading = false
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `加载了${data.results.length}条数据`
      } catch (err) {
        console.log(err)
      }
    },
    // 子组件穿过来的频道索引和父组件的频道索引相等,
    handleChange(index) {
      this.activeIndex = index
      this.showChannelEdit = false
    },
    // 将父组件上的文章的对象传到子组件
    handleAction(item) {
      this.showMoreAction = true
      this.currentArticle = item
    },
    // 子组件不感兴趣操作成功将结果传给父组件
    handleSuccess() {
      // 将文章更多操作弹出层关闭
      this.showMoreAction = false
      // 去掉文章的当前数据
      // 找到当前文章在数组中的索引
      // Findindex() 查找满足第一个条件的元素的索引
      const articles = this.currentArticle.articles
      const index = articles.findIndex((item) => {
        return item.art_id = this.currentArticle.art_id
      })
      articles.splice(index, 1)
    }
  },
  created () {
    this.loadChannels()
  }

}
</script>

<style lang="less" scoped>
  .van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 10px;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.nav-btn{
  position: fixed;
  right: 10px;
  line-height: 44px;
  font-size: 22px;
  background-color: #fff;
}
.close{
  float:right;
}
</style>
