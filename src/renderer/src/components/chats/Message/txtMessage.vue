<template>
    <div class="txt_message">
        <!-- 名称 -->
        <div v-if="my == true" class="name"> Test Test </div>
        <!-- 回复 -->
        <div v-if="false" class="reply"></div>
        <!-- 媒体 -->
        <div v-if="false" class="media">
            <img src="" alt="">
            <video src=""></video>
        </div>
        <!-- 文件 -->
        <div v-if="false" class="file"></div>
        <!-- 音频 -->
        <div v-if="false" class="audio"></div>
        <!-- 语音 -->
        <div v-if="false" class="voice"></div>
        <!-- 文本消息内容 -->
        <div class="message">{{ text }}</div>
        <!-- 链接预览 -->
        <div v-if="false" class="link_preview"></div>
        <!-- 时间&表情回应 -->
        <div class="time_emoji">
            <!-- 表情回应 -->
            <div class="emoji"></div>
            <!-- 时间 -->
            <p class="time">{{ formatTime(timedata) }}</p>
        </div>
    </div>
</template>
<script setup>
import { toRefs } from 'vue';
import { defineProps } from 'vue';

// 获取传递的参数
const props = defineProps({
    my: Boolean,
    text: String,
    timedata: Number
});

const { my } = toRefs(props);

// 定义 formatTime 函数
function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${ampm} ${hours}:${minutesStr}`;
}
</script>
<style scoped>
.txt_message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ffffff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
    padding: 5PX 10px;
    border-radius: 10px;
    gap: 3px;

}

.name {
    font-size: 15px;
    color: #ff7b5b;
}

.message {
    font-size: 16px;
    color: #000000;
}


.time_emoji {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.time {
    font-size: 12px;
    color: #999999;
    margin: 0;
    padding: 0;
}
</style>