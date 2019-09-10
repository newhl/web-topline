export default {
    install(Vue){
        Vue.prototype.$checkLogin = function() {
            // this 是Vue的实例 
            // 判断是否登录
            if(!this.$store.state.user) {
                // 如果没有登录, 提示用户登录
                this.$dialog.confirm({
                    title:'登录提示',
                    message:'是否要跳转到登录界面'
                }).then(() => {
                    // 点击确认按钮 跳转到登录界面
                    console.log(this.$route)
                    this.$router.push({
                        path:'/login',
                        // params// 动态路由参数
                        // query // 查询字符串
                        query:{
                            redirect:this.$route.fullPath
                        }
                    })
                }).catch(() => {
                    // on cancel 点击取消按钮执行
                })
                return false
            }
            return true
        }
    }
}