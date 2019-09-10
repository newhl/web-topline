<template>
    <van-popup
    :value="value"
    @input="$store.commit('setShowReplyList', $event)"
    position="bottom"
    :style="{ height: '80%' }"
    >
    123
    </van-popup>
</template>

<script>
export default {
    name: 'ReplyList',
    props:['value']
}
</script>

<style>

</style>