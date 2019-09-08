<template>
  <div>
    <van-nav-bar
    title="搜索结果"
    left-text="返回"
    fixed
    left-arrow
    @click-left="$router.back()"
    />
    <!-- 数据展示列表 -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
    <van-cell
        v-for="item in list"
        :key="item.art_id.toString()"
        :title="item.title">
    <div slot="label">
        <!-- grid图片显示 -->
        <van-grid v-if="item.cover.type" :border="false" :column-num="3">
        <van-grid-item
            v-for="(img, index) in item.cover.images"
            :key="img + index"
        >
        <van-image height="80" :src="img" >
            <!-- 图片的加载提示 -->
            <template v-slot:loading>
                <van-loading type="spinner" size="20" />
            </template>
            <!-- 自定义加载失败提示 -->
            <template v-slot:error>加载失败</template>
        </van-image>
        </van-grid-item>
        </van-grid>
         <p>
            <span>{{ item.aut_name }}</span>&nbsp;
            <span>{{ item.comm_count }}评论</span>&nbsp;
            <span>{{ item.pubdate | fmDate }}</span>&nbsp;
          </p>
    </div>
    
    </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '../api/search'
export default {
    name:'SearchResult',
    props:['q'],
      data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:10
    };
  },

  methods: {
   async onLoad() {
      this.loading = true
      try{
        // 发送文章的搜索结果
        const data = await getSearchResult({
            page:this.page,
            per_page:this.per_page,
            q:this.q
        })
        this.list.push(...data.results)
        this.page++
        this.loading = false
        if(data.results.length === 0){
            this.finished = true;
        }
      }catch (err) {
          this.$toast.fail('获取文章失败')
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
    .van-list{
        margin-top: 46px;
    }
</style>