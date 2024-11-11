<template>
    <!-- 输入框 -->
    <div @dragstart.prevent style="user-select: none;" class="chat_input">
        <div class="chat_input_input_box">
            <!-- <div>
                <t-avatar size="35px" :image="avatar" alt="头像" />
            </div> -->
            <div class="icon">
                <WinkIcon size="26px" />
            </div>
            <t-textarea v-model="input" :autosize="{ minRows: 1, maxRows: 4 }" name="Chat input box"
                placeholder="输入消息..." autofocus style="border:none;" />
            <div class="icon">
                <AddCircleIcon size="26px" />
            </div>
            <div v-if="input" class="send">
                <SendIcon size="20px" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { AddCircleIcon, WinkIcon, SendIcon } from 'tdesign-icons-vue-next';
import avatar from '@/assets/img/server-icon.png';

const input = ref('');
</script>
<style scoped>
.chat_input {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    /* background: #000; */
    bottom: 0;
    left: 0;
    padding: auto;

}

.chat_input_input_box {
    display: flex;
    align-items: flex-end;
    margin: 0 10px 10px 10px;
    background: #ffffff;
    padding: 10px;
    border-radius: 20px;
    gap: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat_input_input_box img {
    width: 30px;
    height: 30px;
}


.send {
    padding: 5px;
    border-radius: 50%;
    background: rgb(51, 144, 236);
    color: #fff;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.icon {
    padding: 4px;
}

.icon:hover {
    background-color: #dcdcdc;
    border-radius: 10px;
}
</style>