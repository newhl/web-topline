<template>
   <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <van-icon
        v-if="!isArticle"
        name="star-o"></van-icon>
      <van-button
        @click="handleSend"
        size="small">发布</van-button>
    </div>
  </div>
</template>

<script>
import { sendComment } from '../../../api/comment'
export default {
    props:['isArticle','target'],
    data() {
        return {
            content:''
        }
    },
    methods:{
        async handleSend() {
          // 判断是否登录
          if(!this.$checkLogin()){
              return
          }
          if(this.content.length === 0 ) {
              this.$toast('请输入内容')
              return
          }
          try{
            const data = await sendComment({
                target:this.target,
                content:this.content
            })
            this.content = ''
          }catch (err) {
            console.log(err)
          }
        }
    }

}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 15px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}

</style>