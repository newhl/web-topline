<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad">
    <van-cell
    v-for="item in list"
    :key="item.com_id.toString()">
    <div slot="icon">
        <img class="avatar" :src="item.aut_photo" alt="">
    </div>
    <div slot="title">
        <span>{{item.aut_name}}</span>
    </div>
    <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
    </div>
    <div slot="label">
        <p>{{item.content}}</p>
        <p>
            <span>{{item.pubdate | fmDate}}</span>&nbsp;
            <span @click="handleShowReplyList">回复{{item.reply_count}}</span>
        </p>
    </div>
    </van-cell>
  </van-list>
</template>

<script>
import { getComments } from '../../../api/comment'
export default {
  name:'Commentlist',
  //isARticle 是否是文章
  // 如果是文章 id 就是文章的id  如果不是文章id就是评论的id
  props:['isArticle', 'id'],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset:null,
      limit:10
    };
  },
   methods: {
  async onLoad() {
      try{
        const data = await getComments({
            isArticle:this.isArticle,
            source:this.id,
            offset:this.offset,
            limit:this.limit
        })
        // 下一页offset的参数
        this.offset = data.last_id
        this.list.push(...data.results)
        this.loading = false
        if( data.results.length === 0) {
            this.finished = true
        }
        
      }catch (err) {
        this.$toast.fail('获取文章评论失败')
      }
      
    },
    // 控制评论回复弹层的显示
    handleShowReplyList() {
      this.$store.commit('setShowReplyList', true)
    }
  },
};
</script>

<style lang='less' scoped>
.avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}
.van-list {
  margin-bottom: 64px;
}
</style>