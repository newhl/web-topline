<template>
    <van-popup
    :value="value"
    @input="$store.commit('setShowReplyList', $event)"
    position="bottom"
    :style="{ height: '80%' }"
    v-if="currentComment"
    >
    <!-- 导航头 -->
    <van-nav-bar
    :title="currentComment.reply_count + '标题'"
    />
    <!-- 被评论的评论列表 -->
     <van-cell>
    <div slot="icon">
        <img class="avatar" :src="currentComment.aut_photo" alt="">
    </div>
    <div slot="title">
        <span>{{currentComment.aut_name}}</span>&nbsp;
        <van-tag>楼主</van-tag>
    </div>
    <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
    </div>
    <div slot="label">
        <p>{{currentComment.content}}</p>
        <p>
            <span>{{currentComment.pubdate | fmDate}}</span>&nbsp;
            <span>回复{{currentComment.reply_count}}</span>
        </p>
    </div>
    </van-cell>
    <h3>回复列表</h3>
    <!-- 评论回复的列表 -->
    <comment-list :isArticle='false' :id="currentComment.com_id.toString()"></comment-list>
    <!-- 发布评论组件 -->
    <send-comment :isArticle='false' :target="currentComment.com_id.toString()" :art_id="art_id" ></send-comment>
    </van-popup>
</template>

<script>
import { mapState } from 'vuex';
// 加载评论回复列表的组件
import CommentList from './CommentList'
// 加载发布评论的列表
import SendComment from './SendComment'
// 加载eventHub
import eventHub from '../../../utils/eventHub'
export default {
    name: 'ReplyList',
    props:['value', 'art_id'],
    computed:{
        ...mapState(['currentComment'])
    },
    components:{
        CommentList,
        SendComment
    },
    created() {
        eventHub.$on('sendSuccess', (obj) => {
            if(!obj.isArticle){
             this.currentComment.reply_count++
            }
           
           
        })
    }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
  }
</style>