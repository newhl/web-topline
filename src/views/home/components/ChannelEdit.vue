<template>
  <van-popup :value="value"
  @input="$emit('input', $event)"
  position="bottom"
  :style="{ height: '90%' }">
    <van-cell icon="cross" @click="$emit('input', false)"/>
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button
        v-show="!isEdit"
        @click="isEdit = true"
        round
        type="danger"
        size="mini">
        编辑
      </van-button>
      <van-button
       v-show="isEdit"
       @click="isEdit = false"
        round
        type="danger"
        size="mini">
        完成
      </van-button>
    </van-cell>
    <!-- 我的频道列表 -->
    <van-grid>
      <van-grid-item
        v-for="(channel,index) in channelList"
        :key="channel.id"
        @click="handleMyChannelItem(index, channel.id)"
      >
      <div slot="text" class="van-grid-item__text" :class="{active : active === index}">{{ channel.name }}</div>
        <van-icon
          v-show="isEdit && index !== 0" 
          slot="icon"
          class="close-icon"
          name="close"
        />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item
        @click="handleChannelItem(item)"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
      />
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteChannel, addChannel } from '../../../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/localStorage'
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传过来的 我的频道
    channelList:{
        type:Array,
        required:true
    },
    active:{
        type:Number,
        required:true
    }
  },
  computed:{
      ...mapState(['user']),
      // 推荐频道
    recommendChannels () { 
     // 1. 获取我的频道中 所有频道的id组成的数组
     // map() 数组遍历, 返回一个新的数组,新数组中的元素由回调函数中的返回的元素组成
     const ids = this.channelList.map( (item) => {
            return item.id
    })
    // 2. 过于获取到的所有的频道, 把频道中有 ids 的项去掉
    // filter 把数组中满足条件item 返回, 返回一个新的数组
    return this.allChannels.filter( (item) => {
        // includes() 判断数组中是否包含某一项
        return !ids.includes(item.id)
    })
  }
  },
  data () {
    return {
        isEdit:false,
        allChannels: []
    }
  },
  methods:{
    // 加载所有频道列表
   async loadAllChannels () {
      try{
        const data = await getAllChannels()
        this.allChannels = data.channels
      }catch(err){
        console.log(err)
      }
    },
    // 点击子组件中的我的频道  把当前点击的index传给父组件
   async handleMyChannelItem(index, channelId) {
        // 在完成状态下 把当前频道的索引传到父元素
        if( !this.isEdit ){
            this.$emit('activeChange', index)
            return
        }
        // 2. 把点击的频道从我的频道列表中删除
        this.channelList.splice(index, 1)
        // 2.2 判断是否登录了
        if(this.user){
            try{
              await deleteChannel(channelId)
            }catch ( err ){
              this.$toast.fail('操作失败')
            }
            return
        }
        // 没有登录,把频道列表记录到本地存储中
        setItem('channels', this.channelList)

    },
    // 点击推荐频道的时候
   async handleChannelItem(item) {
     // 给channels(我的频道列表)动态添加的成员也是响应式的用 this.$set这个方法
      this.$set(item, 'timestamp', null)
      this.$set(item, 'articles', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'pullLoading', false)
      // channel.timestamp = null
      // channel.articles = []
      // // 上拉加载
      // channel.loading = false
      // channel.finished = false
      // // 下拉加载
      // channel.pullLoading = false
     // 把点击的推荐频道添加到我的频道列表中
     this.channelList.push(item)
     // 2.判断是否登录
     if(this.user){
        //2.1 用户登录
        try{
           await addChannel(item.id, this.channelList.length)
        }catch (err) {
            this.$toast.fail('操作失败')
        }

        return
     }
     //2.2 没有登录, 把我的频道存储到本都存储
     setItem('channels', this.channelList)
    }
  },
  created() {
      // 加载所有频道列表
      this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
    .close-icon{
        position: absolute;
        right: 0;
        top: 0;
    }
    .active{
        color: red;
    }
</style>
