<template>
  <div>
    <!-- 搜索框 -->
    <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    clearable
    @input="handleInput"
    @search="onSearch(value)"
    @cancel="onCancel"
    background="#3e9df8"
  />
  <!-- 搜索提示 -->
  <van-cell-group v-show="value">
  <van-cell :title="item" icon="search" v-for="item in suggestionList" :key="item"/>
  </van-cell-group>

  <!-- 搜索历史 -->
  <van-cell-group v-show="!value">
  <van-cell title="历史记录">
      <div style="display:inline-block;" v-show="isEdit">
          <span>全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>&nbsp;
      </div>
       <van-icon name="delete" style="font-size:18px" v-show="!isEdit" @click="isEdit = true"/>
  </van-cell>
  <van-cell :title="item" v-for="(item,index) in histories" :key="index" >
      <van-icon name="close" style="font-size:18px" v-show="isEdit" @click="handleDelete(index)"/>
  </van-cell>
  </van-cell-group> 

  </div>
</template>

<script>
import { getSuggestion, gethistoricalRecords } from '../api/search'
import * as storageTools from '../utils/localStorage'
import { mapState } from 'vuex'
export default {
    name:"search",
    data() {
        return{
             value:'',
             suggestionList: [],
             // 历史记录编辑模式    
             isEdit:false,
             // 历史记录
             histories:[]
        }
       
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        // 确定搜索
        onSearch(item) {

        // 判断历史记录中存在输入的内容
        if(this.histories.includes(item)){
            return
        }
        // 将搜索的内容放到历史记录中
        this.histories.push(item)
        // 2.判断用户是否登录, 如果登录将信息记录到自己的账户中,如果没有登录将信息存储到本地
        if(this.user){
            // 发送请求, 将历史记录放到自己的账号中
            return
        }
        // 没有登录,将历史记录放到本地存储 当中
        storageTools.setItem('history', this.histories)
        },

        // 取消搜索 
        onCancel() {},
        // 在文本框中输入内容过程中的消息提示
        async handleInput() {
            if(this.value.length === 0) {
                return
            }
            try{
                const data = await getSuggestion(this.value)
                this.suggestionList = data.options
            }catch (err) {
                console.log(err)
            }

        },
        // 删除历史记录
        handleDelete(index) {
            this.histories.splice(index, 1)
            storageTools.setItem('history', this.histories)
        }
    },
   async created() {
        // 加载历史记录 如果登录了 加载自己账户 的历史记录, 如果没有登录在本地存储加载
        if(this.user){
            //登录了 从自己的账户中获取历史记录
            const data = await gethistoricalRecords()
            this.histories = data.keywords
            return
        }
        // 没有登录 本地存储中获取历史记录
       this.histories = storageTools.getItem('history') || []

    }
}
</script>

<style>

</style>