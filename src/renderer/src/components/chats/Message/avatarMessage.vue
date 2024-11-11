<template>
    <t-badge count="0" :offset="[5, 40]">
        <!-- 检查 user.profile_photo 和 user.profile_photo.minithumbnail 是否存在 -->
        <t-avatar
            v-if="!user.profile_photo || !user.profile_photo.minithumbnail || !user.profile_photo.minithumbnail.data"
            class="avatar">{{
                user.title.slice(0, 2).toUpperCase() }}</t-avatar>
        <img v-else-if="user.profile_photo.big.local.path && user.profile_photo.big.local.path.trim() !== ''"
            :src="'/@fs/' + user.profile_photo.big.local.path" alt="img" class="avatar"
            style="border-radius: 50%;"></img>
        <img v-else :src="'data:image/jpeg;base64,' + user.profile_photo.minithumbnail.data" alt="img" class="avatar"
            style="border-radius: 50%;">
    </t-badge>
</template>
<script setup>
import { defineProps, } from 'vue';

// 获取传递的参数
const props = defineProps({
    user: Object
});
</script>
<style scoped>
.avatar {
    width: 35px;
    height: 35px;
}
</style>