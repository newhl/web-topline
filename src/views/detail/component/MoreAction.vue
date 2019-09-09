<template>
  <div class="more-action">
    <van-button :icon="article.attitude === 1 ? 'like' : 'like-o'"
    round type="danger"
    :loading="false"
    @click="hanldLike">
    点赞
    </van-button>
    <van-button
    icon="delete"
    round
    type="danger"
    @click="handleDisLike">
    不喜欢
    </van-button>
  </div>
</template>

<script>
// 引入点赞 取消点赞方法  引入喜欢 不喜欢方法
import { likeAction, unLikeAction, unDislikeAction, dislikeArticle} from '../../../api/article'

export default {
    props:['article'],
    methods:{
        // 点赞和取消点赞
        async  hanldLike() {
            try{
            // 判断是否登录 没有登录不可以点赞

            // 判断是否已经点赞
            if(this.article.attitude === 1){
            // 如果已经登录了 执行取消点赞操作
                await unLikeAction(this.article.art_id)
                this.article.attitude = -1
            }else {
            // 如果没有点赞 执行点赞操作
                await likeAction(this.article.art_id)
                this.article.attitude = 1           
            }

            }catch (err) {
            this.$toast.fail('操作失败')
            }
        },
        // 喜欢 不喜欢
        async handleDisLike () {
           try{
            // 判断是否登录

            //判断是否已经是喜欢状态
            if(this.article.attitude === 0){
            // 如果是已不喜欢的状态 执行取消不喜欢操作
                await unDislikeAction(this.article.art_id)
            }else {
            // 如果已经是取消不喜欢状态 执行不喜欢操作
                await dislikeArticle(this.article.art_id)
            }
           }catch (err) {
            this.$toast.fail('操作失败')
           }
        }
    }
};
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>